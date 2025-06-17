import DashNavbar from '@/components/dashboard/DashNavbar'
import React from 'react'
import { authOptions, CustomSession } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth'
import CreateChat from '@/components/group-chats/CreateChat'
import { fetchChatGroups } from '../fetch/groupFetch'
import GroupChatCard from '@/components/group-chats/GroupChatCard'


export default async function page() {
    const session: CustomSession | null = await getServerSession(authOptions)
    const groups: Array<GroupChatType> | [] = await fetchChatGroups(session?.user?.token!)


    return (
        <div>
            <DashNavbar
                name={session?.user?.name!}
                image={session?.user?.image ?? undefined}
            />
            <div className="px-6 py-4">

                <div className="flex items-center justify-between">

                </div>


                <div className="flex justify-end mt-4">
                    <CreateChat user={session?.user!} />
                </div>


                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.length > 0 &&
                        groups.map((item, index) => (
                            <div
                                key={index}
                                
                            >
                                <GroupChatCard group={item} user={session?.user!} />
                            </div>
                        ))}
                </div>
            </div>


        </div>
    )
}
