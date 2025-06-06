"use client";

import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '../ui/button';
import Image from 'next/image';

function LoginModal() {
  return (
<Dialog>
  <DialogTrigger asChild>
    <Button>
      Getting Started 
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='2-xl'>Welcome to Snappy chat !!!</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
    <Button variant={'outline'}>
      <Image src="/images/google.png"
      className='mr-4 size-4'
      alt='googel image'/>
      Login with google
    </Button>
  </DialogContent>
</Dialog>
  )
}

export default LoginModal