"use server"

import axios from "axios"
import { Brands } from "../types/Brand.model";


async function getBrands(): Promise<{ data: Brands[]; status: number; message: string }> {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/brands", {
            params: {
               
                
            },
        });
        console.log(response)

        return {
            data: response?.data.data ?? [],
            status: response.status,
            message: response?.data.message || "Success",
        };
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status || 500,
                message: error?.response?.data?.message || "An error occurred",
            };
        }
        throw error;
    }
}

export { getBrands }
