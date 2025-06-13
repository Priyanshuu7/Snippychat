"use client";

import React, { useEffect, useMemo } from "react";
import { getSocket } from "@/lib/socket.config";
import { v4 as uuidV4 } from "uuid";
import { Button } from "../ui/button";

export default function ChatBase({ groupId }: { groupId: string }) {
  const socket = useMemo(() => {
    const socket = getSocket();
    socket.auth = {
      room: groupId,
    };
    return socket.connect();
  }, [groupId]);

  useEffect(() => {
    socket.on("message", (data: any) => {
      console.log("The socket message is", data);
    });

    return () => {
      socket.close();
    };
  }, [socket]);

  const handleClick = () => {
    socket.emit("message", { name: "Priyanshu", id: uuidV4() });
  };

  return (
    <div>
      <Button onClick={handleClick}>Send message</Button>
    </div>
  );
}
