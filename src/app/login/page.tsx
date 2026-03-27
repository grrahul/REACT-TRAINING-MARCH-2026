'use client'
import { SubmitEvent, useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useTitle } from "@/hooks/useTitle";
import { useDispatch } from "react-redux";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMesssage] = useState("");
    const router = useRouter();
    const usernameRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();
    useTitle("Login");

    //useEffect gets invoked once when the component is mounted
    useEffect(() =>{
        usernameRef.current?.focus();
        console.log("Login mounted...");

        //callback gets called when you leave the page
        return () => {
            console.log("Login unmounted...")
        }
    },[]);

    // useEffect(()=>{
    //     document.title += " Login";
    // },[]);

    async function handleLogin(evt: SubmitEvent<HTMLFormElement>){
        evt.preventDefault();

        if(username && password){
            //validation logic
            const url = "http://localhost:9000/login";
            try {    
                const response = await axios.post(url, {name:username, password:password});
                setMesssage("");
                dispatch({type:"login", payload:{
                    isAuthenticated:true,
                    username,
                    accessToken: response.data.accessToken,
                    refreshToken: response.data.refreshToken
                }}) 
                router.push("/");
            }
            catch(error) {
                console.log("Error: ",error);
                 setMesssage("Wrong credentials");
                 dispatch({type:"logout"});
            }
        }
        else{
            setMesssage("Enter the credentials");
        }     
    }

    return (
        <div>
            <h4>Login</h4>
            
            {message ? <div className="alert alert-warning">{message}</div> : null}
            
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">UserName</label>
                    <input ref={usernameRef}
                     id="username" type="text" className="form-control" placeholder="User ID" 
                    value={username} onChange={evt =>setUsername(evt.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input autoFocus id="password" type="text" className="form-control" placeholder="Password" 
                    value={password} onChange={evt => setPassword(evt.target.value)}/>
                </div>
                <br />
                <button className="btn btn-success"> Login </button>
            </form>
        </div>
    )
}