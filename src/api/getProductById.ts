import { IProduct } from "@/lib/interfaces/IProduct";

const getProductById = async (productId: number): Promise<IProduct> => {
  // https://fakeapi.platzi.com/
  // https://api.escuelajs.co/api/v1/products/?limit=10&offset=0
  const fetchUrl = `https://api.escuelajs.co/api/v1/products/${productId}`;

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("An error occurred while fetching the product.");
  }
};

export default getProductById;
