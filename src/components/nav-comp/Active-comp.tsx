"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";

export function ActiveLink({
  href,
  children,
  mobile = false,
}: {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const classes = `p-2 font-semibold ${
    isActive ? "text-black font-extrabold text-lg underline" : "text-gray-500"
  } ${mobile ? "block w-full text-lg" : "text-lg"}`;

  const link = (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );

  // For mobile (inside Sheet) we need to auto-close
  return mobile ? <SheetClose asChild>{link}</SheetClose> : link;
}
