import { Suspense, useEffect, useState, JSX, useContext } from "react";
import { ErrorBoundary } from "react-error-boundary";

// api calls
import getProductsByFilter from "@/api/getProductsByFilter";

import { ChevronDown } from "lucide-react";
import Title from "@/components/Title";
import { categories } from "@/lib/enuns";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { ShopContext } from "@/context/ShopContext";
import BarLoader from "react-spinners/BarLoader";
import LatestProducts from "@/components/LatestProducts";
import { toast } from "react-toastify";

const Collection = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [dataJsx, setDataJsx] = useState<JSX.Element | null>(null);

  // context
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }
  const { search } = shopContext;

  // search params and navigation
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // get initial values
  const selectedCategory = searchParams.get("category") || "any";
  const selectedSorted = searchParams.get("sorted") || "relevant";
  const selectedTitle = search.trim() !== "" ? search : "";

  useEffect(() => {
    const params = new URLSearchParams({ ...Object.fromEntries(searchParams) });

    params.set("category", selectedCategory);
    params.set("sorted", selectedSorted);

    if (selectedTitle) {
      params.set("title", selectedTitle);
    } else {
      params.delete("title"); // Remove "title" when search is empty
    }

    navigate(`?${params.toString()}`, { replace: true });
  }, [
    searchParams,
    navigate,
    search,
    selectedCategory,
    selectedSorted,
    selectedTitle,
  ]);

  // Fetch products based on category and sorting
  useEffect(() => {
    const productsPromiseByCategory = getProductsByFilter(
      selectedCategory,
      20,
      0,
      selectedTitle
    );

    setDataJsx(
      <LatestProducts
        productsPromise={productsPromiseByCategory}
        sort={selectedSorted}
      />
    );
  }, [selectedCategory, selectedSorted, selectedTitle]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10">
      {/* FILTER OPTIONS */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <ChevronDown
            size={16}
            className={`sm:hidden ${showFilter ? "rotate-270" : ""}`}
          />
        </p>
        {/* CATEGORY FILTER */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((category) => (
              <Link
                to={`?${new URLSearchParams({
                  category,
                  sorted: selectedSorted,
                })}`}
                key={category}
                className="flex gap-2"
                onClick={() =>
                  toast.info(
                    "State has only one source of true that is the URL (no state managed on front), filter will call the API with the proper query (no filters on front), we fetch only the first 20 responses (or less), browser wont be overload with data, pagination is under development"
                  )
                }
              >
                <input
                  type="radio"
                  name="category"
                  className="w-3"
                  value={category}
                  checked={category === selectedCategory}
                  onChange={(e) => selectedCategory === e.target.value}
                />
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title
            text1={
              selectedCategory === "any"
                ? "ALL"
                : selectedCategory.toUpperCase()
            }
            text2="PRODUCTS"
          />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={selectedSorted}
            onChange={(e) => {
              const params = new URLSearchParams({
                ...Object.fromEntries(searchParams),
              });
              params.set("sorted", e.target.value);
              navigate(`?${params.toString()}`, { replace: true });
            }}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="lowToHigh">Sort by: Low to High</option>
            <option value="highToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* MAP PRODUCTS */}
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
      </div>
    </div>
  );
};

export default Collection;
