import DashNavbar from '@/components/dashboard/DashNavbar'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'

export default async function page() {

    const session:CustomSession | null = await getServerSession(authOptions) 
    
    return (
<DashNavbar name = {session?.user?.name! } image={session?.user?.image ?? undefined}/>
  )
}

 