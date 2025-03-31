import getProductById from "@/api/getProductById";
import ProductItem from "@/components/ProductItem";
import { IProduct } from "@/lib/interfaces/IProduct";
import { Suspense, useEffect, useState, JSX } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import BarLoader from "react-spinners/BarLoader";

function Product() {
  const [dataJsx, setDataJsx] = useState<JSX.Element | null>(null);

  const { productId } = useParams();

  useEffect(() => {
    const productPromise: Promise<IProduct> = getProductById(Number(productId));

    setDataJsx(<ProductItem productPromise={productPromise} />);
  }, [productId]);

  return (
    <ErrorBoundary
        fallbackRender={({ error }) => (
          <div className="text-lg text-red-600 text-center m:10 sm:m-20">
            <p>{error.message}</p>
            <p className="font-extrabold">--- Contact Support ---</p>
          </div>
        )}
      >
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-full">
              <BarLoader
                color="gray"
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
        >
        {dataJsx}
      </Suspense>
    </ErrorBoundary>
  );
}

export default Product;
