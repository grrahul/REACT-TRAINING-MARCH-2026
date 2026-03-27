"use client";

import { Product } from "@/models/Products";
import axios from "axios";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState , MouseEvent} from "react";
import { useRouter } from "next/navigation";

const url = "http://localhost:9000/products";
export default function EditProduct() {
  const [product, setProduct] = useState(new Product(0, "", 0, ""));
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await axios.get<Product>(url + "/" + params.id);
        setProduct(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProduct();
  }, []);

  function handleNameChange(evt: ChangeEvent<HTMLInputElement>) {
    // const value = evt.target.value;
    // const copy = {...product};
    // copy.name = value;
    // setProduct(product);

    setProduct({...product,name:evt.target.value});
  }

  function handlePriceChange(evt: ChangeEvent<HTMLInputElement>) {
    setProduct({...product, price:evt.target.valueAsNumber});
  }

  function handleDescriptionChange(evt: ChangeEvent<HTMLInputElement>) {
    setProduct({...product, description:evt.target.value});
  }

    async function updateProducts(evt:MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        const url = "http://localhost:9000/products";
        try {
            const response = await axios.put(url+"/"+product.id,product);
            router.back();
        }
        catch{
            console.log("Save is not successful");
            alert("Save not successfull");
        }
    }

    async function cancelChanges(evt:MouseEvent<HTMLButtonElement>) {
        evt.preventDefault();
        router.back();
    }

  return (
    <div>
      <h4>Edit Product: {params.id}</h4>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            className="form-control"
            type="text"
            id="name"
            value={product.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="form-control"
            type="number"
            id="price"
            value={product.price}
            onChange={handlePriceChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="desc">Description</label>
          <input
            className="form-control"
            type="text"
            id="desc"
            value={product.description}
            onChange={handleDescriptionChange}
          />
        </div>
        <br />
        <div>
          <button className="btn btn-warning" onClick={cancelChanges}>Cancel</button>&nbsp;
          <button className="btn btn-success" onClick={updateProducts}>Save</button>
        </div>
      </form>
    </div>
  );
}