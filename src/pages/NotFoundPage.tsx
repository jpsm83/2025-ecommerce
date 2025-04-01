import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">404 Not Found</h1>
      <Link to="/">Home</Link>{" "}
      {/* client side routing without refresh the page */}
      {/* <a href="/">Home</a> html tag that refresh the page, not a SPA */}
    </div>
  );
};

export default NotFoundPage;
