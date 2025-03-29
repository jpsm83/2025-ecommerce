import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow">
        <Navbar />
        <SearchBar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
