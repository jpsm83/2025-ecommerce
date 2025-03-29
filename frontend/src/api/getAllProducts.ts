const getAllProducts = async (
  productId: number,
  categorySlug: string,
  limit: number,
  offset: number
): Promise<any> => {
  if (productId && categorySlug)
    throw new Error(
      "Product ID and category slug cannot be at the URL at the same time!"
    );
  if (limit == null || offset == null) // Changed condition to explicitly check for null or undefined
    throw new Error("If provided, limit and offset have to have a value!");

    // https://api.escuelajs.co/api/v1/products/?limit=10&offset=0
  let fetchUrl = "https://api.escuelajs.co/api/v1/products";

  if (categorySlug && categorySlug !== "any") {
    fetchUrl = `${fetchUrl}/?categorySlug=${categorySlug}`;
    if (limit) fetchUrl = `${fetchUrl}&limit=${limit}&offset=${offset}`;
  }

  if (!categorySlug && limit) {
    fetchUrl = `${fetchUrl}/?limit=${limit}&offset=${offset}`;
  }

  console.log(fetchUrl);

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

export default getAllProducts;