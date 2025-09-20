"use client";
import React from "react";
import Link from "next/link";
import { ShoppingBag, Heart, Menu } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useCart } from "@/app/context/CartContext";
import { useWish } from "@/app/context/WishContext";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";

/* Helper: Auto-close sheet when link is clicked */
function SheetCloseLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <SheetClose asChild>
      <Link href={href} className="block w-full">
        {children}
      </Link>
    </SheetClose>
  );
}

export default function Navbar() {
  const { data: session, status } = useSession();
  const { cartDetails } = useCart();
  const { wishList } = useWish();

  return (
    
      <div className="container mx-auto flex items-center justify-between py-6 my-10 max-w-9/10 h-max ">
                <Image src= "/Yellow and Black Online Shop Business Logo.png"  alt= "shop"   width= {70} height={70} className="rounded-3xl me-3" />
        
        <Link href="/" className="text-3xl font-bold">
          E-Shop
        </Link>

        {/* Desktop NavigationMenu */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <Link href="/" className="p-2 text-2xl font-bold">
                  Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/products" className="p-2 text-2xl font-bold">
                  Products
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/cart" className="p-2 text-2xl font-bold">
                  Cart
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/wishlist" className="p-2 text-2xl font-bold">
                  Wish-List
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/category" className="p-2 text-2xl font-bold">
                  Category
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions + Mobile Sheet */}
        <div className="flex items-center gap-4">
          {status === "loading" && <p>Loading...</p>}
      {session ? (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-2 text-lg font-bold hidden md:block cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <div className="hidden md:flex gap-4">
              <Link href="/login" className="p-2 text-2xl font-bold">
                Login
              </Link>
              <Link href="/register" className="p-2 text-2xl font-bold">
                Register
              </Link>
            </div>
          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="bg-indigo-400 rounded-3xl px-4 py-2 flex items-center gap-2"
          >
            <ShoppingBag size={24} />
            <span className="text-xl font-bold">
              {cartDetails?.numOfCartItems ?? 0}
            </span>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="bg-indigo-400 rounded-3xl px-4 py-2 flex items-center gap-2"
          >
            <Heart size={24} />
            <span className="text-xl font-bold">{wishList?.count ?? 0}</span>
          </Link>

          {/* Mobile Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden p-2">
                <Menu size={28} />
              </button>
            </SheetTrigger>
            <SheetContent side="top" className="w-screen">
              <nav className="flex flex-col gap-6 p-6 text-lg font-bold">
                <SheetCloseLink href="/">Home</SheetCloseLink>
                <SheetCloseLink href="/products">Products</SheetCloseLink>
                <SheetCloseLink href="/cart">Cart</SheetCloseLink>
                <SheetCloseLink href="/wishlist">Wish-List</SheetCloseLink>
                <SheetCloseLink href="/category">Category</SheetCloseLink>
<div className=" border-3 border-gray-500 p-3">
                {status === "loading" && <p>Loading...</p>}
      {session ? (
                  <SheetClose asChild>
                    <button
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="text-left cursor-pointer"
                    >
                      Logout
                    </button>
                  </SheetClose>
                ) : (
                  <>
                    <SheetCloseLink href="/login">Login</SheetCloseLink>
                    <SheetCloseLink href="/register">Register</SheetCloseLink>
                  </>
                )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    
  );
}
