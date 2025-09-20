"use server"

import { getUserToken } from "@/lib/token.utility";
import axios from "axios"


async function getCart() {
    try {

        const token = await getUserToken();
       
      const response = await  axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
        headers: {
            token: token as string
        }
      })
return{
    data: response?.data,
    status: response.status,
    message: response?.data.message
}
    } catch (error :unknown) {
        if (axios.isAxiosError(error)) 
     return{  
         data: [],
    status: error.response?.status,
    message: error?.response?.data.message || "An error occurred"
     }
    
}
};

async function addToCart(productId: string) {
    try {

        const token = await getUserToken();
        console.log(token , "user token");
       
      const response = await  axios.post("https://ecommerce.routemisr.com/api/v1/cart",{productId},
        {
        headers: {
            token: token as string
        }
      })
return{
    data: response?.data,
    status: response.status,
    message: response?.data.message
}
    } catch (error :unknown) {
        if (axios.isAxiosError(error)) 
     return{  
         data: [],
    status: error.response?.status,
    message: error?.response?.data.message || "An error occurred"
     }
    
}
};

async function deleteFromCart(productId: string) {
    try {

        const token = await getUserToken();
       
      const response = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
        headers: {
            token: token as string
        }
      })
      console.log(response , "delete from cart response");
return{
    data: response?.data,
    status: response.status,
    message: response?.data.message
}
    } catch (error :unknown) {
        if (axios.isAxiosError(error)) 
     return{  
         data: [],
    status: error.response?.status,
    message: error?.response?.data.message || "An error occurred"
     }
    
}
};
async function updateCart(productId: string, count: number) {
    try {

        const token = await getUserToken();
       
      const response = await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},
        {
        headers: {
            token: token as string
        }
      })
      console.log(response , "delete from cart response");
return{
    data: response?.data,
    status: response.status,
    message: response?.data.message
}
    } catch (error :unknown) {
        if (axios.isAxiosError(error)) 
     return{  
         data: [],
    status: error.response?.status,
    message: error?.response?.data.message || "An error occurred"
     }
    
}
}


export { getCart , addToCart , deleteFromCart , updateCart };