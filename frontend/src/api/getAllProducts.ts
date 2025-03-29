const getAllProducts = async (
  productId?: number,
  categorySlug?: string,
  limit?: number,
  offset?: number,
  title?: string
): Promise<any> => {
  if (productId && categorySlug)
    throw new Error(
      "Product ID and category slug cannot be at the URL at the same time!"
    );

  // https://fakeapi.platzi.com/
  // https://api.escuelajs.co/api/v1/products/?limit=10&offset=0
  let fetchUrl = `https://api.escuelajs.co/api/v1/products/`;

  if (productId) {
    fetchUrl = `${fetchUrl}${productId}`;
  } else {
    fetchUrl = `${fetchUrl}?limit=${limit}&offset=${offset}`;
  }

  if (categorySlug && categorySlug !== "any") {
    fetchUrl = `${fetchUrl}&categorySlug=${categorySlug}`;
  }

  if (title) {
    fetchUrl = `${fetchUrl}&title=${encodeURIComponent(title)}`;
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
