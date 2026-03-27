'use server'

import { Supplier } from "@/models/Supplier";
import path from "path";
import fs from 'fs/promises';
import { redirect } from "next/navigation";

export async function formSubmit(prevStatus: object , form: FormData){
    // const id = form.get("id")?.toString();
    // const name = form.get("name")?.toString();
    // const contactPerson = form.get("contactPerson")?.toString();
    // const email = form.get("email")?.toString();
    // const location = form.get("location")?.toString();

    // const supplier= {
    //     id: Number(id), 
    //     name: name ? name : "", 
    //     contactPerson : contactPerson ? contactPerson : ""  , 
    //     email: email ? email : "", 
    //     location: location ? location : ""
    // }
    const supplier:Supplier = Object.fromEntries(form.entries()) as unknown as Supplier;
    
    if(supplier.id<100){
        return {status:-1, message: "error"}
    }

    const filepath = path.join(process.cwd(),"data", "suppliers.json");
    const fileContent = await fs.readFile(filepath,'utf-8');
    const suppliers = JSON.parse(fileContent) as Supplier[];
    suppliers.push(supplier);

    await fs.writeFile(filepath,JSON.stringify(suppliers,null,2),'utf-8');

    console.log("Server");

    redirect("/suppliers")

    return {status:1, message : "completed"};
}