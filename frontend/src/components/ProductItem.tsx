import { IProduct } from "@/lib/interfaces/IProduct";
import { Star } from "lucide-react";
import { Suspense, use, useState, useMemo, useEffect, useContext } from "react";
import { categories, clothesSizes } from "@/lib/enuns";
import { Button } from "./ui/button";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import RelatedProducts from "./RelatedProducts";
import { ErrorBoundary } from "react-error-boundary";
import BarLoader from "react-spinners/BarLoader";
import getProductsByCategorySlug from "@/api/getProductsByCategorySlug";
import { ShopContext } from "@/context/ShopContext";

const ProductItem = ({
  productPromise,
}: // selectedSize,
{
  productPromise: Promise<IProduct>;
  // selectedSize: string;
}) => {
  const [image, setImage] = useState<string | null>(null);

  // product
  const product = use(productPromise);
  
  // context
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not available. Ensure it is provided.");
  }
  const { addToCart } = shopContext;
  
// search params and navigate - only for clothes where sizes can be selected
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const selectedSize = searchParams.get("size");

  useEffect(() => {
    setImage(product.images[0]);
    const params = new URLSearchParams({ ...Object.fromEntries(searchParams) });

    if (
      !searchParams.get("size") &&
      !categories.includes(product.category.slug)
    ) {
      params.set("size", "M");
    }

    navigate(`?${params.toString()}`, { replace: true });
  }, [
    searchParams,
    navigate,
    selectedSize,
    product.category.slug,
    product.images,
  ]);

  const getRelatedProducts = useMemo(
    () => getProductsByCategorySlug(product.category.slug, 5, 0),
    [product.category.slug]
  );

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 px-4 md:px-20">
      {/* PRODUCT DATA */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* PRODUCT IMAGE */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.images.map((item, index) => (
              <img
                key={index}
                src={item}
                alt={`Image ${index}`}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img
              src={image || product.images[0]}
              alt="Selected Product"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{product.title}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, index) => (
              <Star
                key={index}
                size={12}
                strokeWidth={3}
                className="text-yellow-600"
              />
            ))}
            <Star size={12} strokeWidth={2} className="text-gray-400" />
            <p className="pl-2">(132)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">€{product.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{product.description}</p>

          {!categories.includes(product.category.slug) && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {clothesSizes.map((size) => (
                  <Link
                    key={size}
                    to={`?${new URLSearchParams({ size })}`}
                    className={`bg-gray-100 px-4 py-1 rounded-full border-2 ${
                      selectedSize === size
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  >
                    {size.toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <Button
            className="mt-4"
            onClick={() => {
              if (product) {
                addToCart(product, selectedSize ?? null);
              } else {
                console.error("Product is not resolved yet.");
              }
            }}
          >
            ADD TO CART
          </Button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <b className="border px-5 py-3 text-sm">Reviews (132)</b>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            earum suscipit blanditiis, mollitia hic quisquam magnam perspiciatis
            vero sunt corporis esse laudantium molestiae at vitae deleniti
            accusamus labore commodi porro.
          </p>
        </div>
      </div>
      {/* RELATED PRODUCTS */}

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
          <RelatedProducts getRelatedProducts={getRelatedProducts} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default ProductItem;
