import Hero from "@/components/Hero";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import BarLoader from "react-spinners/BarLoader";

// api calls

// components
import LatestCollection from "@/components/LatestCollection";
import OurPolicy from "@/components/OurPolicy";
import NewsletterBox from "@/components/NewsletterBox";
import Title from "@/components/Title";
import getAllProducts from "@/api/getAllProducts";

const Home = () => {
  const productsPromise = getAllProducts(20, 0);

  return (
    <>
      <Hero />
      <div className="text-center py-8 text-3xl mt-10">
        <Title text1="BEST" text2="OFFERS" />
        <p className="w-3/4 m-auto text-xs sm:text:sm md:text-base text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nostrum
          sunt neque reiciendis suscipit, animi commodi eveniet corrupti odio
          eius obcaecati harum iure aperiam quam quia, debitis numquam possimus
          quis!
        </p>
      </div>

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
          <LatestCollection productsPromise={productsPromise} />
        </Suspense>
      </ErrorBoundary>
      <OurPolicy />
      <NewsletterBox />
    </>
  );
};

export default Home;
