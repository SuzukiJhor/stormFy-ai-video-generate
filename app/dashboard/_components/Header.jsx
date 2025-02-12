import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUserInfoContext } from '@/app/context/userInfoContext';

export default function Header() {
  const router = useRouter();
  const { user } = useUser();
  const { userInfo, setUserInfo } = useUserInfoContext();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';

  async function fetchInfoUser() {
    if (userInfo !== null) return;
    if (userEmail.length === 0) return;
    try {
      const response = await axios.get('/api/user-info', {
        headers: { 'User-Email': userEmail }
      });
      const { data } = response;
      setUserInfo(Number(data));
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  }

  React.useEffect(() => {
    fetchInfoUser();
  }, [userEmail])

  return (
    <div className='p-3 px-5 flex items-center justify-between shadow-md border-b-2 border-emerald-700'>
      <div className='flex gap-3 items-center'>
        <Image src={'/logo-StormFy.jpg'} alt='logo' width={70} height={70} />
        <h2 className='font-bold text-xl'>StormFy IA</h2>
      </div>
      <div className='flex gap-3 items-center'>
        <Image src={'/coin.ico'} alt='logo' width={30} height={30} />
        {userInfo ? (
          <h2 className='text-yellow-500 font-bold text-xl'>{userInfo}</h2>
        ) :
          <h2 className='text-yellow-500 font-bold text-xl'>0</h2>
        }
        <Button
          className="px-6 py-3 text-lg tracking-widest font-semibold rounded-lg bg-primary duration-300 shadow-md hover:bg-neutral-400"
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
