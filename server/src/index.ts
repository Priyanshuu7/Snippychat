import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import cors from 'cors';
const app: Application = express();
const port = process.env.PORT || 7000;
import Routes from './routes/index.js';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { setupSocket } from './socket.js';
import { createAdapter } from '@socket.io/redis-streams-adapter';
import redis from './config/redis.config.js';
import { instrument } from '@socket.io/admin-ui';

// socket server connection //
const server = createServer(app);
let io;
try {
  const redisAvailable = !!process.env.REDIS_URL;
  if (redisAvailable) {
    const ioSrv = new Server(server, {
      cors: {
        origin: ['http://localhost:3000', 'https://admin.socket.io'],
        credentials: true,
      },
      adapter: createAdapter(redis),
    });
    io = ioSrv;
    console.log('Using Redis adapter for Socket.io.');
  } else {
    throw new Error('No REDIS_URL set');
  }
} catch (e) {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'https://admin.socket.io'],
      credentials: true,
    },
  });
  console.log('Redis unavailable, running Socket.io without Redis adapter.');
}
instrument(io, {
  auth: false,
  mode: 'development',
});

setupSocket(io);
export { io };

// * Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://admin.socket.io'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  return res.send("It's working 🙌");
});

app.use('/api', Routes);
server.listen(port, () => console.log(`Server is running on PORT ${port}`));
