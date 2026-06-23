import type { Product } from "../types/store.types";

const BASE_URL='https://fakestoreapi.com';

export const apiService = {
    /**
     * Fetches all products from the store.
     * Promise<Product[]> guarantees that the resolved array fits the exact type contract.
     */
    getAllProducts: async (): Promise<Product[]> => {
        try {
            const response = await fetch(`${BASE_URL}/products`);

            if (!response.ok) {
                throw new Error(`HTTP error. status: ${response.status}`);
            }
            const data = await response.json();
            return data as Product[]
        } catch(error){
            console.error("Failed to fetch products", error);
            throw error;
        }
    },

    getProductById: async (id: number): Promise<Product> => {
        try{
            const response = await fetch(`${BASE_URL}/products/${id}`);

            if(!response.ok){
                throw new Error(`HTTP error. status: ${response.status}`);
            }

            const data = await response.json();
            return data as Product;
        } catch (error){
            console.error(`Failed to fetch product with ID ${id}`, error);
            throw error;
        }
    }
}