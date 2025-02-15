import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  productname: String,
  price: Number,
  category: String, 
});

const Product = mongoose.model("Product", productSchema, "price");

// ✅ Updated Products API
app.get("/api/products", async (req, res) => {
  const searchQuery = req.query.search || "";
  const categoryQuery = req.query.category || ""; // Get category from query params
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const skip = (page - 1) * limit;

  try {
    let filter = {};

    if (searchQuery) {
      filter.productname = { $regex: searchQuery, $options: "i" };
    }

    if (categoryQuery) {
      filter.category = categoryQuery;
    }

    let products;
    if (Object.keys(filter).length > 0) {
      // If category or search query is provided, fetch filtered results
      products = await Product.find(filter).sort({ price: 1 }).skip(skip).limit(limit);
    } else {
      // Fetch random products when no category is selected
      products = await Product.aggregate([{ $sample: { size: 102 } }]).skip(skip).limit(limit);
    }

    const formattedProducts = products.map((product) => ({
      id: product._id.toString(),
      productname: product.productname,
      price: product.price,
      category: product.category || "Uncategorized",
    }));

    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// ✅ Chatbot API (Handles Cart & Product Queries)
// ✅ Chatbot API (Handles Cart & Product Queries)
const Cart = []; // Temporary cart (consider using database in production)

app.post("/api/chatbot", async (req, res) => {
  const { message, context } = req.body;

  try {
    if (context === "cart") {
      if (message.toLowerCase().includes("show")) {
        return res.json({
          reply: `Your cart contains: ${
            Cart.length ? Cart.map((item) => `${item.productname} (Qty: ${item.quantity})`).join(", ") : "Nothing"
          }`,
        });
      }
      if (message.toLowerCase().includes("add")) {
        const productName = message.split("add ")[1]?.trim();
        if (!productName) return res.json({ reply: "Please specify a product to add." });

        const existingItem = Cart.find((item) => item.productname.toLowerCase() === productName.toLowerCase());
        if (existingItem) {
          existingItem.quantity++;
        } else {
          Cart.push({ productname: productName, quantity: 1 });
        }
        return res.json({ reply: `${productName} added to cart.` });
      }
      if (message.toLowerCase().includes("remove")) {
        const productName = message.split("remove ")[1]?.trim();
        if (!productName) return res.json({ reply: "Please specify a product to remove." });

        const productIndex = Cart.findIndex((item) => item.productname.toLowerCase() === productName.toLowerCase());

        if (productIndex !== -1) {
          Cart.splice(productIndex, 1);
          return res.json({ reply: `${productName} removed from cart.` });
        } else {
          return res.json({ reply: `${productName} is not in your cart.` });
        }
      }
    } 
    
    else if (context === "product") {
      const categoryMatch = message.match(/products in (.+)/i);
      if (categoryMatch) {
        const category = categoryMatch[1].trim();

        // Fetch 3 random products from the given category
        const products = await Product.aggregate([
          { $match: { category: { $regex: category, $options: "i" } } },
          { $sample: { size: 3 } },
        ]);

        if (products.length > 0) {
          return res.json({
            reply: `Here are 3 random products from ${category}: ` +
              products.map((p) => `${p.productname} ($${p.price})`).join(", "),
          });
        } else {
          return res.json({ reply: `No products found in ${category}.` });
        }
      }
    }

    res.json({ reply: "I didn't understand. Try again!" });
  } catch (error) {
    res.status(500).json({ reply: "Error processing request", error });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
