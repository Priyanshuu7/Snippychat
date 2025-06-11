"use client";
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import UserAvatar from '../common/UserAvatar';
 
 function ProfileMenu({name,image}:{name:string,image?:string} ) {
   return (
     <>
        <DropdownMenu  >
            <DropdownMenuTrigger className='cursor-pointer'>
                <UserAvatar name = {name } image = {image}/>
            </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
              
                    <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
     </>
   )
 }
 
 export default ProfileMenu