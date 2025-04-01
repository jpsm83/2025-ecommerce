import Hero from "@/components/Hero";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import BarLoader from "react-spinners/BarLoader";

// api calls

// components
import OurPolicy from "@/components/OurPolicy";
import NewsletterBox from "@/components/NewsletterBox";
import Title from "@/components/Title";
import getAllProducts from "@/api/getAllProducts";
import LatestProducts from "@/components/LatestProducts";

const Home = () => {
  const productsPromise = getAllProducts();

  return (
    <>
      <Hero />
      <div className="text-center py-8 text-3xl mt-10">
        <Title text1="BEST" text2="OFFERS" />
        <p className="w-3/4 m-auto text-xs sm:text:sm md:text-base text-gray-600">
          This is a Frontend personal project focus in how an ecommerce would be display. Data been catch from an external API <a href="https://fakeapi.platzi.com" className="font-extrabold text-lg">https://fakeapi.platzi.com</a> and display in a neet simple and clear way for the user. (Pagination feture is under development)
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
          <LatestProducts productsPromise={productsPromise} />
        </Suspense>
      </ErrorBoundary>
      <OurPolicy />
      <NewsletterBox />
    </>
  );
};

export default Home;
