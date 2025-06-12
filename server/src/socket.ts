
import { Server } from "socket.io";

export function setupSocket(io:Server){
    io.on("connection",(socket)=>{
        console.log("Socket is Connected",socket.id)


        socket.on ("disconnect",()=>{
            console.log("Socket is disconnected",socket.id)
    
        })
    })

}