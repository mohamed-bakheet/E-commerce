"use client";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartContext";

import { Toaster } from "react-hot-toast";
import WishContextProvider from "./WishContext";


export function AuthProvider({children}: {children: React.ReactNode}) {
    return <SessionProvider>
        <CartContextProvider>
            <WishContextProvider>
        {children}
        </WishContextProvider>
        </CartContextProvider>
        <Toaster
  position="top-right"
  reverseOrder={false}
/>
    </SessionProvider>
}