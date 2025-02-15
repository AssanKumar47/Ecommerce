import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 

// Fetch all products (already exists)
export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/products`);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch products by category and/or price
export const searchProducts = async (category, minPrice, maxPrice) => {
  try {
    const queryParams = new URLSearchParams();

    if (category) queryParams.append("category", category);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);

    const { data } = await axios.get(`${BASE_URL}/products/search?${queryParams}`);
    return data;
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};
