import { Suspense, useEffect, useState, JSX } from "react";
import { ErrorBoundary } from "react-error-boundary";

// api calls
import getAllProducts from "@/api/getAllProducts";

import { ChevronDown } from "lucide-react";
import Title from "@/components/Title";
import LatestCollection from "@/components/LatestCollection";
import { categories } from "@/lib/enuns";
import { Link, useSearchParams, useNavigate } from "react-router-dom";

const Collection = () => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [dataJsx, setDataJsx] = useState<JSX.Element | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const selectedCategory = (searchParams.get("category") as string) || "any";
  const selectedSorted = (searchParams.get("sorted") as string) || "relevant";

  // Update the URL if "category" or "sorted" params are missing or invalid
  useEffect(() => {
    if (!searchParams.get("category") || !searchParams.get("sorted")) {
      const params = new URLSearchParams(searchParams);
      if (!params.get("category")) params.set("category", "any");
      if (!params.get("sorted")) params.set("sorted", "relevant");

      navigate(`?${params.toString()}`, { replace: true });
    }
  }, [searchParams, navigate]);

  // Fetch products based on category and sorting
  useEffect(() => {
    const productsPromiseByCategory = getAllProducts(
      0,
      selectedCategory,
      20,
      0
    );

    setDataJsx(
      <LatestCollection
        productsPromise={productsPromiseByCategory}
        sort={selectedSorted}
      />
    );
  }, [selectedCategory, selectedSorted]);

  // Handle category and sorting change
  const handleFilterChange = (newCategory: string, newSorted: string) => {
    const params = new URLSearchParams({
      category: newCategory,
      sorted: newSorted,
    });
    navigate(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t px-4 md:px-10">
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
              >
                <input
                  type="radio"
                  name="category"
                  className="w-3"
                  value={category}
                  checked={category === selectedCategory}
                  onChange={() => handleFilterChange(category, selectedSorted)} // Call the consolidated handler
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
            onChange={(e) =>
              handleFilterChange(selectedCategory, e.target.value)
            } // Call the consolidated handler
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="lowToHigh">Sort by: Low to High</option>
            <option value="highToLow">Sort by: High to Low</option>
          </select>
        </div>

        {/* MAP PRODUCTS */}
        <ErrorBoundary
          fallbackRender={({ error }) => <div>{error.message}</div>}
        >
          <Suspense fallback={<div>Loading...</div>}>{dataJsx}</Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default Collection;
