import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/shopify-log.png";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="ml-4 sm:ml-10 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <img
            loading="lazy"
            src={logoImage}
            alt="Zara"
            className="sm:h-[60px] mb-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ea
            maxime sequi? Enim dignissimos voluptatum!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About us</Link>
            </li>
            <li></li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+34 615 055 703</li>
            <li>jpsm83@hotmail.com</li>
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.linkedin.com/in/joaopsmachado/"
                target="_blank"
              >
                <FaLinkedin className="size-8 text-gray-400 hover:scale-110" />
              </a>
              <a
                href="https://github.com/jpsm83/2025-ecommerce-frontend"
                target="_blank"
              >
                <FaGithub className="size-8 text-gray-400 hover:scale-110" />
              </a>
            </div>
          </ul>
        </div>
      </div>

      <>
        <hr />
        <p className="py-5 text-sm text-center bg-gray-100">
          Copyright 2025@ - Joao Ecommerce Project - All Rights Reserved
        </p>
      </>
    </>
  );
};

export default Footer;
