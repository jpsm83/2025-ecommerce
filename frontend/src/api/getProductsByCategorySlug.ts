import { IProduct } from "@/lib/interfaces/IProduct";

const getProductsByCategorySlug = async (
  categorySlug?: string,
  limit?: number,
  offset?: number
): Promise<IProduct[]> => {
  // https://fakeapi.platzi.com/
  // https://api.escuelajs.co/api/v1/products/?limit=10&offset=0
  const fetchUrl = `https://api.escuelajs.co/api/v1/products/?limit=${limit}&offset=${offset}&categorySlug=${categorySlug}`;

  try {
    const response = await fetch(fetchUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default getProductsByCategorySlug;
