import { Server, Socket } from 'socket.io';
import prisma from './config/db.config.js';

interface CustomSocket extends Socket {
  room?: string;
}

export function setupSocket(io: Server) {
  io.use((socket: CustomSocket, next) => {
    const room = socket.handshake.auth.room || socket.handshake.headers.room;
    if (!room) {
      return next(new Error('Invalid room'));
    }
    socket.room = room;
    next();
  });

  io.on('connection', (socket: CustomSocket) => {
    socket.join(socket.room);

    socket.on('message', async data => {
      // Validate group_id matches the room
      if (!data.group_id || data.group_id !== socket.room) {
        socket.emit('error', { error: 'Message missing or invalid group_id' });
        return;
      }
      try {
        // Save only allowed fields to avoid issues
        const saved = await prisma.chats.create({
          data: {
            id: data.id, // should be provided by frontend
            group_id: socket.room!,
            message: data.message,
            name: data.name,
            created_at: data.created_at,
            file: data.file ?? null,
          },
        });
        // Emit to everyone in the room (except sender)
        socket.to(socket.room!).emit('message', saved);
        // Optionally: echo message back to sender as stored (for consistency)
        socket.emit('message', saved);
      } catch (err) {
        socket.emit('error', { error: 'Failed to save message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket is disconnected', socket.id);
    });
  });
}
