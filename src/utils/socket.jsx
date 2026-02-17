import {io} from "socket.io-client";
export const createSocketConnection=()=>{
    const url=import.meta.env.VITE_BACKEND_URL;
    return io(url,{withCredentials:true,transports: ["websocket"]})
}