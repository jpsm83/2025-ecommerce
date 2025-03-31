import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, User, ShoppingBasket, Menu, ChevronDown } from "lucide-react";
import { useContext, useState } from "react";
import logoImage from "../assets/shopify-log.png";
import { ShopContext } from "@/context/ShopContext";

export const Navbar = () => {
  const [menuBurgerVisible, setMenuBurgerVisible] = useState<boolean>(false);

  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { setShowSearch, setSearch, getCardCount } = shopContext;

  return (
    <div className="flex justify-between items-center pr-10">
      <Link to="/">
        <img
          loading="lazy"
          src={logoImage}
          alt="Zara"
          className="h-[40px] m-2"
        />
      </Link>
      <ul className="gap-2 hidden md:flex">
        <NavLink to="./" className="flex flex-col gap-1 items-center">
          <Button variant={"ghost"}>Home</Button>
          <hr className="w-2/4 border-none h-[1.5px]" />
        </NavLink>
        <NavLink to="./collection" className="flex flex-col gap-1 items-center">
          <Button variant={"ghost"}>Collection</Button>
          <hr className="w-2/4 border-none h-[1.5px]" />
        </NavLink>
        <NavLink to="./about" className="flex flex-col gap-1 items-center">
          <Button variant={"ghost"}>About</Button>
          <hr className="w-2/4 border-none h-[1.5px]" />
        </NavLink>
        <NavLink to="./contact" className="flex flex-col gap-1 items-center">
          <Button variant={"ghost"}>Contact</Button>
          <hr className="w-2/4 border-none h-[1.5px]" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <Search
          size={20}
          className="text-gray-700 cursor-pointer"
          onClick={() => {
            setShowSearch(true);
            setSearch("");
          }}
        />
        <div className="group relative">
          <User size={20} className="text-gray-700 cursor-pointer" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>
        <Link to="./cart" className="relative">
          <ShoppingBasket size={20} />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCardCount()}
          </p>
        </Link>
        <Menu
          size={20}
          onClick={() => setMenuBurgerVisible(true)}
          className="cursor-pointer flex md:hidden"
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          menuBurgerVisible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setMenuBurgerVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <ChevronDown size={20} className="h4 rotate-180" />
            <p>Close</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setMenuBurgerVisible(false)}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setMenuBurgerVisible(false)}
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setMenuBurgerVisible(false)}
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setMenuBurgerVisible(false)}
            to="/Contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
};
