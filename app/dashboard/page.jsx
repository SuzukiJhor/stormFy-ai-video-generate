'use client'
import React from 'react'
import Link from 'next/link'
import axios from 'axios';
import { useUser } from '@clerk/nextjs'
import VideoList from './_components/VideoList'
import { Button } from '@/components/ui/button'
import EmptyState from './_components/EmptyState'
import { useUserInfoContext } from '../context/userInfoContext'

export default function Dashboard() {
  const { user } = useUser();
  const { userInfo, setUserInfo } = useUserInfoContext();
  const userEmail = user?.primaryEmailAddress?.emailAddress || '';
  const [videoList, setVideoList] = React.useState([]);
  async function fetchVideoDataByUser() {
    if (!userEmail) return;
    if (videoList.length !== 0) return;
    fetchByEmail();
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
    fetchVideoDataByUser();
  }, [fetchVideoDataByUser, videoList, setVideoList])

  React.useEffect(() => {
    fetchInfoUser();
  }, [userEmail])

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-emerald-700'>Dashboard</h2>
        <Link href={'/dashboard/create'}>
          <Button className='hover:bg-neutral-300 hover:text-emerald-700'> + Criar Um</Button>
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
