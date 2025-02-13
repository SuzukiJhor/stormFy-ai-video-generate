'use client'
import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'
import { Button } from '@/components/ui/button'
import EmptyState from './_components/EmptyState'

export default function Dashboard() {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const [videoList, setVideoList] = React.useState([]);

  async function fetchVideoDataByUser() {
    if (!userEmail) return;
    if (videoList.length !== 0) return;
    await fetchByEmail();
  }

  async function fetchByEmail() {
    try {
      const response = await axios.get('/api/video-data', {
        headers: { 'User-Email': userEmail }
      });
      const { data } = response;
      setVideoList(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error('Erro ao buscar vídeos:', error);
    }
  }

  React.useEffect(() => {
    fetchVideoDataByUser();
  }, [fetchVideoDataByUser, videoList, setVideoList])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-primary text-2xl text-emerald-700'>Meu Painel</h1>
        <Link href={'/dashboard/create'}>
          <Button className='hover:bg-neutral-400'> + Criar Um</Button>
        </Link>
      </div>
      {/*Empty State*/}
      {videoList.length === 0 &&
        <div>
          <EmptyState />
        </div>
      }
      {/*List of video*/}
      {videoList.length !== 0 &&
        <VideoList videoList={videoList} />
      }

    </div>
  )
}
