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
import { ActiveLink } from "./Active-comp";

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
    <div className="bg-gray-100">
    <div className="container mx-auto flex items-center xl:max-w-[90%] justify-between py-6 h-max overflow-hidden">
      <div className="flex flex-row items-center gap-2 ">
      <Image
        src="/Yellow and Black Online Shop Business Logo.png"
        alt="shop"
        width={70}
        height={70}
        className="rounded-3xl"
      />

      <Link href="/" className="text-3xl font-bold">
        E-Shop
      </Link>
</div>
      {/* Desktop NavigationMenu */}
      <div className="hidden lg:flex flex-1 justify-center">
        {session ? (
        <NavigationMenu>
          <NavigationMenuList className="flex gap-2">
            <NavigationMenuItem>
              <ActiveLink href="/" >
                Home
              </ActiveLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ActiveLink href="/products" >
                Products
              </ActiveLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ActiveLink href="/cart" >
                Cart
              </ActiveLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ActiveLink href="/wishlist" >
                Wish-List
              </ActiveLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ActiveLink href="/category" >
                Category
              </ActiveLink>
            </NavigationMenuItem>
             <NavigationMenuItem>
              <ActiveLink href="/brands" >
                Brands
              </ActiveLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        ): (null)}
        </div>

      {/* Actions + Mobile Sheet */}
      <div className="flex items-center gap-4">
        {status === "loading" && <p>Loading...</p>}
        {session ? (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="p-2 text-lg font-bold hidden lg:block cursor-pointer"
          >
            Logout
          </button>
        ) : (
          <div className="hidden lg:flex gap-4">
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
          className="hidden lg:flex bg-indigo-400 rounded-3xl px-4 py-2 items-center gap-2"
        >
          <ShoppingBag size={24} />
          <span className="text-xl font-bold">
            {cartDetails?.numOfCartItems ?? 0}
          </span>
        </Link>

        {/* Wishlist */}
        <Link
          href="/wishlist"
          className="hidden lg:flex bg-indigo-400 rounded-3xl px-4 py-2 items-center gap-2"
        >
          <Heart size={24} />
          <span className="text-xl font-bold">{wishList?.count ?? 0}</span>
        </Link>

        {/* Mobile Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <button className="lg:hidden p-2">
              <Menu size={28} />
            </button>
          </SheetTrigger>
          <SheetContent side="top" className="w-screen">
            <nav className="flex flex-col gap-6 p-6 text-lg font-bold">
               {session ? (<>
              <ActiveLink text-lg font-bold href="/" mobile>Home</ActiveLink>
              <ActiveLink href="/products" mobile>Products</ActiveLink>
              <ActiveLink href="/cart" mobile>Cart</ActiveLink>
              <ActiveLink href="/wishlist" mobile>Wish-List</ActiveLink>
              <ActiveLink href="/category" mobile>Category</ActiveLink>
               <ActiveLink href="/brands" mobile>Brands</ActiveLink>
               </>):(null)}
              <div className="border-3 border-gray-500 p-3">
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

              {/* Cart and Wishlist in Mobile Menu */}
              <div className="flex flex-row gap-4">
                <SheetCloseLink href="/cart">
                  <div className=" bg-indigo-400 rounded-3xl px-4 py-2 flex items-center w-25 gap-2">
                    <ShoppingBag size={24} />
                    <span className="text-xl font-bold">
                      {cartDetails?.numOfCartItems ?? 0}
                    </span>
                  </div>
                </SheetCloseLink>
                <SheetCloseLink href="/wishlist">
                  <div className="bg-indigo-400 rounded-3xl px-4 py-2 w-25 flex items-center gap-2">
                    <Heart size={24} />
                    <span className="text-xl font-bold">
                      {wishList?.count ?? 0}
                    </span>
                  </div>
                </SheetCloseLink>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
    </div>
  );
}