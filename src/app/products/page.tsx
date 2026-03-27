'use client'

import { Product } from "@/models/Products";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import styles from './products.module.css';
import { useRouter } from "next/navigation";
import { ProductView } from "./ProductView";
import { useProducts } from "@/hooks/useProducts";
import { useTitle } from "@/hooks/useTitle";

export default function ListProducts() {

    //const [products, setProducts] = useState<Product[]>([]);
    const [isMessageVisible,setMessageVisble]=useState(true);
    const router = useRouter();
    useTitle("List Products");
    const {products, setProducts} =useProducts();

    const deleteProducts = useCallback(async (product:Product)=>
    {
        const url = "http://localhost:9000/products";
        try {
            const response = await axios.delete(url+"/"+product.id);
            const copy_of_products = [...products];
            const index = copy_of_products.findIndex(item => item.id === product.id);
            copy_of_products.splice(index,1);
            setProducts(copy_of_products);
        }
        catch{
            console.log("Error");
            alert("FAILED TO DELETE...");
        }
    },[products]);

    const editProduct = useCallback((product:Product) => {
        router.push("/products/"+product.id);
    },[]);


    // async function editProduct(product:Product) {
    //    router.push("/products/"+product.id); 
    // }

    const totalPrice = useMemo(function calculateTotalPrice(){
        let total =0;
        console.log("Calculate total price function invoked...")
        products.forEach(product => {
            if(product.price){
                total += product.price;
            }
        })
        return total;
    },[products])

    return(
        <div>
            <h4>List Products</h4>

            <div> Total Price : {totalPrice}</div>
            {isMessageVisible ? <div>This page is to demonstrate data fetching</div>:null}

            <br/>
            <button 
                className="btn "
                onClick={()=>setMessageVisble(!isMessageVisible)}>
                    {isMessageVisible? "Hide": "Show"}
            </button>

            <div style={{display:"flex" , flexFlow: "row wrap" , justifyContent:"center"}}> 
                {products.map((product) => {
                    return (
                        <ProductView key={product.id} product={product} onDelete={deleteProducts} onEdit={editProduct}></ProductView>
                    )
                })}
            </div>
        </div>
    )
}