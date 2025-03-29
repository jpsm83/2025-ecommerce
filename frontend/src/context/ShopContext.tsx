import { createContext, useState, ReactNode } from "react";

// Define the shape of the context
interface IShopContextType {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context with an initial null value (it will be provided in the provider)
export const ShopContext = createContext<IShopContextType | null>(null);

// Define the provider component
const ShopContextProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<string>("");
    const [showSearch, setShowSearch] = useState<boolean>(false);

    const values: IShopContextType = { search, setSearch, showSearch, setShowSearch };

    return (
        <ShopContext.Provider value={values}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
