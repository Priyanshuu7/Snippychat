import { fetchChats } from '@/app/fetch/chatsFetch'
import { fetchChatGroup, fetchChatUsers } from '@/app/fetch/groupFetch'
import ChatBase from '@/components/chat/ChatBase'
import { notFound } from 'next/navigation'
import React from 'react'
import { authOptions, CustomSession } from '@/app/api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export default async function Chat({ params }: { params: { id: string } }) {


  if(params.id.length != 36){
    return notFound()
  }

  const group:GroupChatType | null = await  fetchChatGroup(params.id )
  if(group == null){
    return notFound()
  } 

  const session: CustomSession | null = await getServerSession(authOptions)

  const users : Array<GroupChatUserType> | [] = await fetchChatUsers(params.id, session?.user?.token!) 
 
  const chats : Array<MessageType> | [] = await fetchChats(params.id, session?.user?.token!)
 
  return ( 
    <div>
       <ChatBase users={users} group={group} oldMessages={chats}/>  
    </div>
  )
} 
