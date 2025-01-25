import React from 'react'
import { Button } from "@/components/ui/button";
import { UserButton } from '@clerk/nextjs';
import Image from 'next/image'

export default function Header() {
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md'>
        <div className='flex gap-3 items-center'>
            <Image src={'/login03.jpg'} alt='logo' width={30} height={30}/>
            <h2 className='font-bold text-xl'>Videos Curtos</h2>
        </div>
        <div className='flex gap-3 items-center'>
            <Button className='hover:bg-primary hover:text-white' variant="secondary">DashBoard</Button>
            <UserButton/>
        </div>
    </div>
  )
}
