import { createContext, useContext, useEffect, useState } from "react";
import { getUserWish } from "../action/wish.action";
import { WishResponse } from "../types/wish.model";


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
   const [wishList, setWishList]= useState(null);

async function fetchWishList() {
    const response = await getUserWish();
    setWishList(response?.data || null );

}

   useEffect(() => {  
    fetchWishList();    
     }, [])
   

    return <WishContext.Provider value={{wishList , fetchWishList, setWishList}}>
        {children}
    </WishContext.Provider>
};


export function useWish(){
    const myContext = useContext(WishContext);
    return myContext;
}