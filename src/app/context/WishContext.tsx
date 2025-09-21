import { createContext, useContext, useEffect, useState } from "react";
import { getUserWish } from "../action/wish.action";
import { WishResponse } from "../types/wish.model";
import { useSession } from "next-auth/react";


interface WishContextType {
    wishList:WishResponse | null;
     fetchWishList: () => Promise<void>;
    setWishList:(wish:WishResponse | null) => void;
    
}

const WishContext = createContext<WishContextType>({
    wishList: null,
     fetchWishList: async () => { },
    setWishList: () => {}
});


export default function WishContextProvider({children}: {children: React.ReactNode}) {
const { data: session } = useSession(); // Listen to session changes
  const [wishList, setWishList] = useState<WishResponse | null>(null);

  async function fetchWishList() {
    const response = await getUserWish();
    setWishList(response?.data || null);
  }

  useEffect(() => {
    if (session) {
      fetchWishList(); // Refetch wishlist after login
    }
  }, [session]);

  return (
    <WishContext.Provider value={{ wishList, fetchWishList, setWishList }}>
      {children}
    </WishContext.Provider>
  );
};


export function useWish(){
    const myContext = useContext(WishContext);
    return myContext;
}