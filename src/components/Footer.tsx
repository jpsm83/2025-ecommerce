import logoImage from "../assets/shopify-log.png";

const Footer = () => {
  return (
    <>
      <div className="ml-4 sm:ml-10 flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
        <div>
          <img
            loading="lazy"
            src={logoImage}
            alt="Zara"
            className="sm:h-[60px] mb-5"
          />
          <p className="w-full md:w-2/3 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere ea
            maxime sequi? Enim dignissimos voluptatum!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+34 615 055 703</li>
            <li>jpsm83@hotmail.com</li>
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
