"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { useCart } from "@/app/context/CartContext";
import { deleteFromCart, updateCart } from "@/app/action/cart.action";
import toast from "react-hot-toast";
import Link from "next/link";

export default function CompCart() {
  const { cartDetails, getCartDetails } = useCart();
  
  async function handleRemoveFromCart(productId: string) {
    const response = await deleteFromCart(productId);
    console.log(response, "remove from cart response");
    toast.success("Product removed from cart");
    await getCartDetails();
  }
  async function handleUpdateCart(productId: string, count: number) {
    const response = await updateCart(productId, count);
    console.log(response, "remove from cart response");
    toast.success("Product updated succesfully");
    await getCartDetails();
  }

  return (
    <>
      {cartDetails ? (
        <div className="w-3/4 mx-auto my-10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-6 text-center">Products</TableHead>
                <TableHead className="p-6 text-center">Price</TableHead>
                <TableHead className="p-6 text-center">Quantity</TableHead>
                <TableHead className="p-6 text-center">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cartDetails?.data?.products.map((product) => (
                <TableRow key={product.product._id}>
                  <TableCell className="font-medium p-3">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <Badge
                          onClick={() =>
                            handleRemoveFromCart(product.product._id)
                          }
                          className="absolute top-[-10] left-[-10px] cursor-pointer"
                        >
                          X
                        </Badge>
                        <Image
                          src={product.product.imageCover || "/placeholder.png"} // Fallback to a placeholder image
                          alt={product.product.title || "Product image"} // Fallback for alt text
                          width={100}
                          height={100}
                          className="me-5"
                        />
                      </div>
                      <p>
                        {product.product.title
                          ?.split(" ")
                          .slice(0, 2)
                          .join(" ")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {product.price} EGP
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 items-center justify-center">
                      <div
                        onClick={() =>
                          handleUpdateCart(
                            product.product._id,
                            product.count + 1
                          )
                        }
                        className="border-1 border-slate-400 px-2 py-1 cursor-pointer "
                      >
                        +
                      </div>
                      <p>{product.count}</p>
                      <div
                        onClick={() =>
                          handleUpdateCart(
                            product.product._id,
                            product.count - 1
                          )
                        }
                        className="border-1 border-slate-400 px-2 py-1 cursor-pointer "
                      >
                        -
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="p-6 text-center">
                    {product.price * product.count} EGP
                  </TableCell>
                </TableRow>
              ))}

              <TableRow className="bg-slate-200">
                <TableCell className="font-medium text-center p-3">
                  total price{" "}
                </TableCell>
                <TableCell colSpan={2} className="font-medium p-6 text-center">
                  {cartDetails?.data?.totalCartPrice}
                </TableCell>

                <TableCell className="font-medium p-6 text-center">
                  <Button className="bg-indigo-400 py-6 ">
                    <Link href={"/checkout"}>Proceed To Checkout</Link>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <h2 className="text-3xl text-center my-10">Your cart is empty</h2>
      )}
    </>
  );
}
