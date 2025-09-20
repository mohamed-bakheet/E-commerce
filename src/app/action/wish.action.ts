"use server"

import { getUserToken } from "@/lib/token.utility";
import axios from "axios"

async function getUserWish() {
    try {
          const token = await getUserToken();
      const response = await  axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
        headers: {
            token: token as string
        }   
      });
      console.log(response,"wish response");
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
async function addToWish(productId:string) {
    try {
          const token = await getUserToken();
      const response = await  axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",{productId},
        {
        headers: {
            token: token as string
        }   
      });
      console.log(response,"wish response");
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
async function deleteFromWish(productId: string) {
    try {

        const token = await getUserToken();
       
      const response = await  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
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

export { getUserWish , addToWish, deleteFromWish}