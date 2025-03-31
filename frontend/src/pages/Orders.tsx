import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { ShopContext } from "@/context/ShopContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Orders = () => {
  const shopContext = useContext(ShopContext);

  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { cartItems } = shopContext;

  return (
    <div className="pt-16">
      <div className="text-2xl">
        <Title text1="MY" text2="ORDERS" />
      </div>
      <div>
        {cartItems.map((item) => {
          const { title, images, id, price } = item.product;
          return (
            <div
              key={id}
              className="py-4 border-t border-b text-gray-700 flex justify-between items-center flex-wrap"
            >
              <div className="flex gap-6 items-start text-sm">
                <Link to={`/product/${id}`}>
                  <img
                    src={images[0]}
                    alt="Product image"
                    className="w-16 sm:w-20"
                  />
                </Link>
                <div>
                  <p className="sm:text-base font-medium">{title}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg font-extrabold">€{price}</p>
                    <div className="flex flex-col gap-6">
                      {Object.entries(item.sizes).map(([size, quantity]) => (
                        <div
                          key={size}
                          className="flex justify-between items-center gap-4"
                        >
                          {size === "default" ? null : (
                            <p className="font-extrabold text-center p-2 w-10 rounded-sm bg-gray-200">
                              {size}
                            </p>
                          )}
                          <p>Quanity = {quantity}</p>
                          <p>Total = {(price * quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2">
                    Date: <span className="text-gray-400">8 April 1983</span>
                  </p>
                </div>
              </div>

              <div className="w-full md:w-70 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className="min-w-2 h-2 rounded-full bg-green-600"></p>
                  <p className="text-sm md:text-base">Ready to ship</p>
                </div>
                <Button className="border px-4 py-2 text-sm font-medium rounded-sm bg-gray-500">
                  Track Order
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
