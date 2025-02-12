import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserInfoContext } from '@/app/context/userInfoContext';

export default function Header() {
  const { userInfo } = useUserInfoContext();
  const router = useRouter();
  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md border-b-2 border-emerald-700'>
      <div className='flex gap-3 items-center'>
        <Image src={'/logo-StormFy.jpg'} alt='logo' width={70} height={70} />
        <h2 className='font-bold text-xl'>StormFy IA</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Image src={'/coin.ico'} alt='logo' width={30} height={30} />
        {userInfo ? (
          <h2 className='text-yellow-500 font-bold'>{userInfo}</h2>
        ) :
          <h2 className='text-yellow-500 font-bold'>0</h2>
        }
        <Button
          className="px-6 py-3 text-lg tracking-widest font-semibold rounded-lg bg-primary transition-all duration-300 shadow-md hover:bg-neutral-300 hover:text-emerald-700"
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </Button>
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-10 h-10 rounded-full shadow-md transition-all hover:bg-opacity-80",
            },
          }}
        />
      </div>
    </div>
  )
}
