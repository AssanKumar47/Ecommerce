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
});

const Product = mongoose.model("Product", productSchema, "price");

app.get("/api/products", async (req, res) => {
  const searchQuery = req.query.search || "";
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 50; // Default to 50 products per page
  const skip = (page - 1) * limit; // Skip the products already shown on previous pages

  try {
    let products;

    if (searchQuery) {
      // If there is a search query, filter products by productname and sort by price
      products = await Product.find({
        productname: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
      })
        .sort({ price: 1 }) // Sort by price (ascending)
        .skip(skip)
        .limit(limit);
    } else {
      // If no search query, return random products (using $sample)
      products = await Product.aggregate([{ $sample: { size: 102 } }]) // Fetch 102 random products
        .skip(skip)
        .limit(limit); // Pagination logic
    }

    // Format the products to include an id field (renaming _id to id)
    const formattedProducts = products.map((product) => ({
      id: product._id.toString(), // Use the string representation of _id
      productname: product.productname,
      price: product.price,
    }));

    // Send the formatted products
    res.json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
