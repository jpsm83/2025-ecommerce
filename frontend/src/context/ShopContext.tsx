import { IProduct } from "@/lib/interfaces/IProduct";
import { createContext, useState, ReactNode } from "react";
import { toast } from "react-toastify";

// Define types for cart items
interface CartItem {
  product: IProduct;
  sizes: Record<string, number>; // Size -> Quantity mapping
}

// Define the shape of the context
interface IShopContextType {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: CartItem[];
  addToCart: (product: IProduct, size: string | null) => void;
  removeFromCart: (productId: number, size: string) => void;
  updateProductQuantity: (
    productId: number,
    size: string,
    quantity: number
  ) => void;
  getCardCount: () => number;
  totalPriceProducts: () => void;
  deliveryFee: number
}

// Create the context with an initial null value (to be provided in the provider)
export const ShopContext = createContext<IShopContextType | null>(null);

// Define the provider component
const ShopContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const deliveryFee = 5;

  const addToCart = (product: IProduct, size: string | null): void => {
    setCartItems((prevCartItems) => {
      const selectedSize = size || "default";
      const existingItemIndex = prevCartItems.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Update existing item
        const updatedCartItems = [...prevCartItems];
        const existingItem = updatedCartItems[existingItemIndex];
        updatedCartItems[existingItemIndex] = {
          ...existingItem,
          sizes: {
            ...existingItem.sizes,
            [selectedSize]: (existingItem.sizes[selectedSize] || 0) + 1,
          },
        };
        return updatedCartItems;
      }

      // Add new item
      return [...prevCartItems, { product, sizes: { [selectedSize]: 1 } }];
    });

    toast.success("Product added to cart");
  };

  const removeFromCart = (productId: number, size: string): void => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) => {
          if (item.product.id === productId) {
            const updatedSizes = { ...item.sizes };
            delete updatedSizes[size];

            if (Object.keys(updatedSizes).length > 0) {
              return { ...item, sizes: updatedSizes };
            }
            return null; // Mark for removal if no sizes remain
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null) // Remove null entries
    );

    toast.error("Product size removed from cart");
  };

  const totalPriceProducts = (): number => {
    return cartItems.reduce((fullPrice, item) => {
      const itemTotal = Object.entries(item.sizes).reduce(
        (sizeTotal, [, qty]) => sizeTotal + qty * item.product.price,
        0
      );
      return fullPrice + itemTotal;
    }, 0);
  };

  const updateProductQuantity = (
    productId: number,
    size: string,
    quantity: number
  ): void => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.map((item) => {
        if (item.product.id === productId) {
          const updatedSizes = { ...item.sizes };

          if (quantity > 0) {
            updatedSizes[size] = quantity;
          } else {
            delete updatedSizes[size];
          }

          if (Object.keys(updatedSizes).length > 0) {
            return { ...item, sizes: updatedSizes };
          }
          return null; // Mark for removal if no sizes remain
        }
        return item;
      });

      return updatedCartItems.filter((item): item is CartItem => item !== null); // Remove null entries with type guard
    });

    toast.info("Product quantity updated");
  };

  const getCardCount = (): number => {
    return cartItems.reduce((total, cartItem) => {
      return (
        total +
        Object.values(cartItem.sizes).reduce(
          (sizeTotal, count) => sizeTotal + count,
          0
        )
      );
    }, 0);
  };

  const values: IShopContextType = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    removeFromCart,
    updateProductQuantity,
    getCardCount,
    totalPriceProducts,
    deliveryFee
  };

  return <ShopContext.Provider value={values}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
