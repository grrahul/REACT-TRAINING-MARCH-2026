'use server'

export async function sayHello(message: string){
    console.log("invoking say hello:" + message);
    return (
        <div style={{color:'blue'}}>Hello {message} </div>
    )
}