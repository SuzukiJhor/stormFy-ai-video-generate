'use client'
import React from 'react'
import Link from 'next/link'
import { FilePlus2, Gavel, PanelBottom, UserRoundCog } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SideNav() {
    const menuOptions = [
        {
            id: 1,
            name: 'Dashboard',
            path:'/dashboard',
            icon: PanelBottom
        },
        // {
        //     id: 2,
        //     name: 'Atualizar',
        //     path:'/update',
        //     icon: Gavel
        // },
        {
            id: 3,
            name: 'Criar',
            path:'/dashboard/create',
            icon: FilePlus2
        },
        {
            id: 4,
            name: 'Conta',
            path:'/dashboard/account',
            icon: UserRoundCog
        },
    ]

    const path = usePathname();
  return (
    <div className='w-64 h-screen shadow-md p-5'>
        <div>
            {menuOptions.map((item, index) => {
                return <Link href={item.path} key={index}>
                    <div className={`flex items-center gap-3 p-3 
                        hover:bg-neutral-400
                        rounded-md cursor-pointer
                        ${path == item.path && 'bg-neutral-400'}
                    `}>
                        <item.icon/>
                        <h2>{item.name}</h2>
                    </div>
                </Link>
            })}
        </div>
    </div>
  )
}
