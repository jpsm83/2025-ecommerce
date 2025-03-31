import CardTotal from "@/components/CardTotal";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { ShopContext } from "@/context/ShopContext";
import { Trash2 } from "lucide-react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const shopContext = useContext(ShopContext);
  const navigate = useNavigate();

  if (!shopContext) {
    throw new Error("ShopContext is not provided");
  }

  const { removeFromCart, cartItems, updateProductQuantity } = shopContext;

  useEffect(() => {
    if(cartItems.length === 0){
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>
      <div>
        {cartItems.map((item) => {
          const { title, images, id, price } = item.product;
          return (
            <div
              key={id}
              className="py-4 border-t border-b text-gray-700 flex justify-between items-center gap-4"
            >
              <div className="flex items-center justify-between w-full">
                <Link to={`/product/${id}`}>
                  <div className="flex gap-6 items-center">
                    <img
                      src={images[0]}
                      alt="Product image"
                      className="w-16 sm:w-20"
                    />
                    <div>
                      <p className="text-xs md:text-lg font-medium">{title}</p>
                      <div className="flex items-centergap-5 mt-2">
                        <p>€{price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
                <div>
                  {Object.entries(item.sizes).map(([size, quantity]) => (
                    <div
                      key={size}
                      className="flex justify-between items-center my-2"
                    >
                      {size === "default" ? null : (
                        <p className="font-extrabold mr-6 text-center p-2 w-10 rounded-sm bg-gray-200">
                          {size}
                        </p>
                      )}
                      <div className="flex gap-20">
                        <input
                          className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                          type="number"
                          min={0}
                          defaultValue={quantity}
                          onChange={(e) => {
                            const newValue = parseInt(e.target.value);
                            if (!isNaN(newValue) && newValue >= 0) {
                              updateProductQuantity(id, size, newValue);
                            } else {
                              toast.error("Please enter a valid number");
                            }
                          }}
                        />
                        <Trash2
                          onClick={() => removeFromCart(id, size)}
                          className="w-10 text-red-600 cursor-pointer"
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CardTotal />
          <div className="w-full text-end">
              <Button onClick={() => navigate("/place-order")} className="my-8 py-3">PROCEED TO CHECKOUT</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
