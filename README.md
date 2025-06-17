# SnippyChat

SnippyChat is a real-time group chat application that allows users to create, join, and participate in group conversations using a secure passcode system. It features Google authentication, Kafka-based message queuing, and scalable real-time communication using WebSockets.

## Features

- Google OAuth authentication via Auth.js
- Create group chats with a title and passcode
- Join existing groups using passcode access
- Real-time messaging using Socket.io
- Kafka message broker for scalable event handling
- Redis caching for performance optimization
- Zod validation for both client and server
- Responsive user interface built with Tailwind CSS

## Tech Stack

**Frontend**: Next.js (App Router), TypeScript, Tailwind CSS  
**Backend**: Express.js, Node.js  
**Database**: PostgreSQL via Supabase  
**Authentication**: Auth.js with Google OAuth  
**Real-Time**: Socket.io + Kafka  
**Cache**: Redis  
**ORM**: Prisma  
**Validation**: Zod

## How It Works

1. Users log in using Google.
2. Authenticated users can create new chat groups with a custom passcode.
3. Anyone can join an existing group by providing a name and the correct passcode.
4. Messages are exchanged in real-time through Socket.io and Kafka.
5. Redis is used to reduce database load and improve performance.

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Priyanshuu7/Snippychat
   cd Snippychat
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment variables:
   - `.env.local` for Next.js
   - `.env` for the backend

4. Start development servers:
   ```bash
   # Frontend
   npm run dev

   # Backend (if separate)
   npm run server
   ```

5. To start Redis using Docker:
   ```bash
   docker run --name redis-chat -p 6379:6379 -d redis
   ```

## Future Enhancements

- Typing indicators
- Chat message persistence in Supabase
- Reactions and threaded replies
- Optimized mobile responsiveness

## License

MIT License © Priyanshu Rajak (https://github.com/Priyanshuu7)
