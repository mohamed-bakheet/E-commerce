"use server"

import { getUserToken } from "@/lib/token.utility";
import axios from "axios"

interface shippingAddressTybes{
    details:string,
    phone:string,
    city:string,
}

async function getCashPayment(cartId:string, shippingAddress:shippingAddressTybes) {
    try {
          const token = await getUserToken();
      const response = await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress},{
         headers: {
            token: token as string
        }
      })
      console.log(response,"payment response");
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
async function getOnlinePayment(cartId:string, shippingAddress:shippingAddressTybes) {
    try {
          const token = await getUserToken();
      const response = await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{shippingAddress},{
         headers: {
            token: token as string
        }
      })
      console.log(response,"payment response");
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

export { getCashPayment , getOnlinePayment}