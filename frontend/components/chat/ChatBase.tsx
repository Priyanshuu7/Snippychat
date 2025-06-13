"use client"

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo } from 'react'

import { v4 as uuidV4 } from "uuid"
import { Button } from '../ui/button';


export default function ChatBase() {


    let socket = useMemo(() => {
        const socket = getSocket();
        return socket.connect();
    }, [])

    useEffect(() => {
        socket.on("message", (data: any) => {
            console.log("The socket messsge is ", data)
        })
        return () => {
            socket.close()
        }
    })

    const handleClick = () => {
        socket.emit("message", { name: "Priyanshu", id: uuidV4() })
    }


    return (
        <div>
            <Button onClick={handleClick}>
                Send messsge
            </Button>

        </div>
    )
} 
