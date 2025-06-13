import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

export default function Chat({ params }: { params: { id: string } }) {
  console.log("group id", params.id)
  return (
    <div>
      <h1>Heloo cht page </h1>
      <ChatBase />
    </div>
  )
}
