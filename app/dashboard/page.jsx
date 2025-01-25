'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import EmptyState from './_components/EmptyState'

export default function Dashboard() {
  const [ videoList, setVideoList ] = React.useState([])
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='font-bold text-2xl text-pri'>Dashboard</h2>
        <Link href={'/dashboard/create'}>
          <Button> + Criar Um</Button>
        </Link>
      </div>
      {/*Empty State*/}
      {videoList?.length === 0 && 
        <div>
          <EmptyState/>
        </div>}
      </div>
  )
}
