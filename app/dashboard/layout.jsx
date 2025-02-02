'use client'
import React from 'react'
import Header from './_components/Header'
import SideNav from './_components/SideNav'
import { VideoDataProvider } from '@/app/context/videoDataContext';

export default function DashboardLayout({ children }) {
  return (
    <VideoDataProvider>
      <div>
        <div className='hidden md:block h-screen bg-white fixed mt-[165px]'>
          <SideNav />
        </div>
        <div>
          <Header />
          <div className='md:ml-64 p-10'>
            {children}
          </div>
        </div>
      </div>
    </VideoDataProvider>
  )
}
