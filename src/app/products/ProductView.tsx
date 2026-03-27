//<ProductView key={product.id} product={product}></ProductView>
'use client'

import { Product } from "@/models/Products"
import styles from './products.module.css'
import React from "react"

type ProductViewProps = {
    product : Product;
    onDelete: (product: Product) => void;
    onEdit: (product: Product) => void;
}

export const ProductView: React.FC<ProductViewProps> = React.memo(function ProductViewFC({product, onDelete, onEdit}) {
    console.log("Rendering ProductView: "+ product.id);
    return(
        <div key={product.id} className={styles.product}>
            <p>Id: {product.id}</p>
            <p>Name: {product.name}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
            <div>
                <button className="btn btn-warning" onClick={()=>{onDelete(product)}}>Delete</button>
                <button className="btn btn-info" onClick={()=>{onEdit(product)}}>Edit</button>
            </div>
        </div>
    )
})
