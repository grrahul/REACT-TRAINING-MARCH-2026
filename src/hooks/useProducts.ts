import { Product } from "@/models/Products";
import { AppState } from "@/redux/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";


export function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    // const url = "http://localhost:9000/products";
    const url = "http://localhost:9000/secure_products";
    const controller = new AbortController()
    const auth = useSelector((state:AppState)=>state.auth);
    const router = useRouter();

    async function fetchProducts() {

        if(!auth.isAuthenticated){
            router.push("/login");
            return;
        }

        try {

            const headers = {"Authorization" : `Bearer ${auth.accessToken}`}
            const response = await axios.get<Product[]>(url,{signal:controller.signal, headers});
            setProducts(response.data);
            console.log(response);
        }
        catch{
            console.log("Error");
        }
    }
    useEffect(()=>{
        fetchProducts();
    },[])

    return {products,setProducts,fetchProducts};
}
