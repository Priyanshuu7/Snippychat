import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getSocket } from '@/lib/socket.config';

import { v4 as uuidv4 } from 'uuid';
export default function Chats({
  group,
  oldMessages,
  chatUser,
}: {
  group: GroupChatType;
  oldMessages: Array<MessageType> | [];
  chatUser?: GroupChatUserType;
}) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<MessageType>>(oldMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const socket = useMemo(() => {
    const s = getSocket();
    // Avoid repeated connect/disconnect on every render
    s.auth = { room: group.id };
    return s.connect();
  }, [group.id]);

  // Always reconcile messages from backend when group/oldMessages changes
  useEffect(() => {
    setMessages(oldMessages);
  }, [oldMessages, group.id]);

  useEffect(() => {
    // Handler in a ref to avoid multiple listener instances
    const handler = (data: MessageType) => {
      setMessages(prev => {
        // Avoid duplicates based on id
        if (prev.some(m => m.id === data.id)) return prev;
        return [...prev, data];
      });
      scrollToBottom();
    };
    socket.on('message', handler);
    return () => {
      socket.off('message', handler);
      socket.disconnect();
    };
  }, [socket]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const payload: MessageType = {
      id: uuidv4(),
      message: message,
      name: chatUser?.name ?? 'Unknown',
      created_at: new Date().toISOString(),
      group_id: group.id,
    };
    socket.emit('message', payload);
    setMessage('');
    // (No need to optimistically add to message state, server echoes message back)
  };

  return (
    <div className="flex flex-col h-[94vh]  p-4">
      <div className="flex-1 overflow-y-auto flex flex-col-reverse">
        <div ref={messagesEndRef} />
        <div className="flex flex-col gap-2">
          {messages.map(message => (
            <div
              key={message.id}
              className={`max-w-sm rounded-lg p-2 ${
                message.name === chatUser?.name
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600  text-white self-end'
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 text-black self-start'
              }`}
            >
              {message.message}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          className="flex-1 p-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          onChange={e => setMessage(e.target.value)}
        />
      </form>
    </div>
  );
}
