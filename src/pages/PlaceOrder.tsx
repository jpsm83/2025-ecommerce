import CardTotal from "@/components/CardTotal";
import Title from "@/components/Title";
import StripeLogo from "../assets/stripe.png";
import PaypalLogo from "../assets/paypal.png";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* LEFT SIDE */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="First name"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Last name"
          />
        </div>
        <input
          type="email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Email address"
        />
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Street"
        />
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="City"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Zip code"
          />
          <input
            type="text"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Country"
          />
        </div>
        <input
          type="text"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          placeholder="Phone number"
        />
      </div>
      {/* RIGHT SIDE */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CardTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row flex-wrap">
            <div
              onClick={() => setPaymentMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "stripe" && "bg-green-600"
                }`}
              ></p>
              <img
                loading="lazy"
                src={StripeLogo}
                alt="Stripe logo"
                className="h-10 mx-4"
              />
            </div>
            <div
              onClick={() => setPaymentMethod("paypal")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "paypal" && "bg-green-600"
                }`}
              ></p>
              <img
                loading="lazy"
                src={PaypalLogo}
                alt="Stripe logo"
                className="h-10 mx-4"
              />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  paymentMethod === "cod" && "bg-green-600"
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-mediun mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <Button
              onClick={() => navigate("/orders")}
              className="px-16 py-3 text-sm"
            >
              PLACE ORDER
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
