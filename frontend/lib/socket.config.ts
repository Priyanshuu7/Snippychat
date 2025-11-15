import { io, Socket } from 'socket.io-client';
import Env from './env';

let socket: Socket;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(Env.BACKEND_URL, {
      autoConnect: false,
      // Add reconnection options for robustness
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      transports: ['websocket'], // Force websocket only for stability
    });
  }
  return socket;
};
