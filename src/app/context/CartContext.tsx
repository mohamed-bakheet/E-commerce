
import { createContext, useContext, useEffect, useState } from "react";
import { getCart } from "../action/cart.action";
import { Cart } from "../types/cart.model";
import { useSession } from "next-auth/react";



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

const { data: session } = useSession(); // Listen to session changes
  const [cartDetails, setCartDetails] = useState<Cart | null>(null);

  async function getCartDetails() {
    const response = await getCart();
    console.log(response, "cart response");
    setCartDetails(response?.data || null);
  }

  useEffect(() => {
    if (session) {
      getCartDetails(); // Refetch cart details after login
    }
  }, [session]);

  return (
    <CartContext.Provider value={{ cartDetails, getCartDetails, setCartDetails }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(){
    const myContext = useContext(CartContext);
    return myContext;
}
