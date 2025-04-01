import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import Title from "./Title";

const CardTotal = () => {
  // context
  const shopContext = useContext(ShopContext);
  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }
  const { totalPriceProducts, deliveryFee } = shopContext;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>€ {(totalPriceProducts() ?? 0).toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>€ {deliveryFee.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Total</p>
          <p>€ {((totalPriceProducts() ?? 0) + deliveryFee).toFixed(2)}</p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default CardTotal;
