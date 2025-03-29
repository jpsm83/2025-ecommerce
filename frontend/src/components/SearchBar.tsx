import { ShopContext } from "@/context/ShopContext";
import { Search, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { search, setSearch, showSearch, setShowSearch } = shopContext;

  const navigate = useNavigate();
  const location = useLocation();
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  // Synchronize debouncedSearch with search from context
  useEffect(() => {
    setDebouncedSearch(search);
  }, [search]);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(debouncedSearch);
      if (debouncedSearch) {
        navigate("/collection?category=any&sorted=relevant", { replace: true });
      }
    }, 1000); // 1 second

    return () => clearTimeout(handler); // Cleanup on unmount or new input
  }, [debouncedSearch, setSearch, navigate]);

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setShowSearch(true);
    } else {
      setSearch("");
      setShowSearch(false);
    }
  }, [location, setShowSearch, setSearch]);

  return showSearch ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          value={debouncedSearch}
          onChange={(e) => setDebouncedSearch(e.target.value)}
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <Search size={20} />
      </div>
      <X
        size={20}
        onClick={() => {
          setShowSearch(false);
          setSearch("");
          setDebouncedSearch("");
        }}
        className="inline cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
