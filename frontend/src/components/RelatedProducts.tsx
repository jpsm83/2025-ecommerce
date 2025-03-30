import { IProduct } from "@/lib/interfaces/IProduct";
import Title from "./Title";
import ProductCard from "./ProductCard";
import noFound from "../assets/no-found.webp";
import { use } from "react";

const RelatedProducts = ({
  getRelatedProducts,
}: {
  getRelatedProducts: Promise<IProduct[]>;
}) => {
  const relatedProducts = use(getRelatedProducts);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1="RELATED" text2="PRODUCTS" />
        {relatedProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {relatedProducts.map((product: IProduct) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <img
              loading="lazy"
              className="w-full md:w-1/2 object-contain"
              src={noFound}
              alt="no-found"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;
