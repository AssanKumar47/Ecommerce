import axios from "axios";

export const fetchProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/products");
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
