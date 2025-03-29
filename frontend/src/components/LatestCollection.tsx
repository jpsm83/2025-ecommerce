import { use } from "react";
import { IProduct } from "@/lib/interfaces/IProduct";
import ProductItem from "./ProductItem";

// Server-side component that calls `getProducts`
const LatestCollection = ({
  productsPromise,
  sort,
}: {
  productsPromise: Promise<IProduct[]>;
  sort?: string;
}) => {
  const products = use(productsPromise);

  // Apply sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "lowToHigh") return a.price - b.price;
    if (sort === "highToLow") return b.price - a.price;
    return 0; // No sorting
  });

  return (
    <div className="m-10 mx-4">
      {/* RENDERING PRODUCTS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {sortedProducts.map((product: IProduct) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
