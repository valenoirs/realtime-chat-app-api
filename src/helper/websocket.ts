import config from "../config/config";
import { Server as httpServer } from "http";
import { Server as ioServer, Socket } from "socket.io";

let io: ioServer

/**
 * Initialize WebSocket
 * @param httpServer 
 * @returns {ioServer}
 */
export const initializeWebsocket = (httpServer?: httpServer): ioServer => {
    if(!io){
        io = new ioServer(httpServer, config.CORS)
    }

    return io
}