import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 w-full z-50 bg-white border-b">
        <Navbar />
      </div>

      {/* Main content container */}
      <div
        className="flex flex-col flex-1"
        style={{ paddingTop: "var(--navbar-height)" }}
      >
        <div className="flex-1">
          <SearchBar />
          <div className="mx-6 sm:mx-12 md:mx-20">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
