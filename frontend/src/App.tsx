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
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
