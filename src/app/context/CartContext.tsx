
import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../action/cart.action";
import { Cart } from "../types/cart.model";


interface CartContextType {
    cartDetails: Cart | null;
    getCartDetails: () => Promise<void>;
    setCartDetails:(cart:Cart | null) => void;
}

const CartContext = createContext<CartContextType>({
    cartDetails: null,
    getCartDetails: async () => { },
    setCartDetails: () => {}
});


export default function CartContextProvider({children}: {children: React.ReactNode}) {

const [cartDetails, setCartDetails] = useState(null);

async function getCartDetails() {

const response = await getCart()
console.log(response , "cart response");
setCartDetails( response?.data || null);
}
useEffect(() => {
getCartDetails();
}, [] )

    return <CartContext.Provider value={{cartDetails, getCartDetails, setCartDetails}}>
        {children}
    </CartContext.Provider>
}

export function useCart(){
    const myContext = useContext(CartContext);
    return myContext;
}
