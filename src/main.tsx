import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// imported pages
import App from "./App.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import About from "./pages/About.tsx";
import Cart from "./pages/Cart.tsx";
import Collection from "./pages/Collection.tsx";
import Contact from "./pages/Contact.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Orders from "./pages/Orders.tsx";
import PlaceOrder from "./pages/PlaceOrder.tsx";
import Product from "./pages/Product.tsx";
import ShopContextProvider from "./context/ShopContext.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App will serve as the layout
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <Home /> }, // Default child ("/" renders Home)
      { path: "about", element: <About /> },
      { path: "cart", element: <Cart /> },
      { path: "collection", element: <Collection /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "orders", element: <Orders /> },
      { path: "place-order", element: <PlaceOrder /> },
      { path: "product/:productId", element: <Product /> },
      { path: "no-found", element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <ShopContextProvider>
      <RouterProvider router={router} />
    </ShopContextProvider>
  </StrictMode>
);
