"use client"

import { useForm } from "react-hook-form";
import { zodResolver  } from '@hookform/resolvers/zod';

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { createChatSchema, createChatSchemaType } from "@/app/validations/GroupChatValidation";
import { Input } from "../ui/input";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { CHAT_GROUP_URL } from "@/lib/apiEndPoints";

function CreateChat({user}:{user:CustomUser}) {
    const [loading,setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, formState:{ errors } } = useForm<createChatSchemaType >({
        resolver: zodResolver(createChatSchema)
      });

      const onSubmit = async (payload:createChatSchemaType) =>{

        try {
            setLoading(true)

            const {data} = await axios.post(CHAT_GROUP_URL,  {...payload, user_id:user.id },{
                headers:{
                    Authorization : user.token
                }
            })
            
        } catch (error) {

            setLoading(false)

            if(error instanceof AxiosError){
                toast.error(error.message)
            }
            else{
            toast.error("You fucked up")
            }
            
        }
       

      }
  return ( 
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>
    <Button>
        Create Group
    </Button>
  </DialogTrigger>
  <DialogContent onInteractOutside={(e)=> e.preventDefault()}>
    <DialogHeader>
      <DialogTitle>Create New chat</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <form  onSubmit={handleSubmit(onSubmit)}>

        <div className="mt-4">
        <Input placeholder="Enter chat Title" {...register("title")}/>
        <span className="text-red-500">{errors.title?.message}</span>
        </div>
        <div className="mt-4">
        <Input placeholder="Enter chat Password" {...register("passcode")}/>
        <span className="text-red-500">{errors.title?.message}</span>
        </div>
        <div className="mt-4">
            <Button className="w-full" disabled={loading }>

                {loading ? "Processing..." : "Submit"}

            </Button>
 
        </div>
        
    </form>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default CreateChat