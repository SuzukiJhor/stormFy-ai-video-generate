import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed border-emerald-700'>
        <h2 className='pb-5'>Você não tem nenhum video criado!</h2>
        <Link href={'/dashboard/create'}>
            <Button className='hover:bg-neutral-300 hover:text-emerald-700'>Crie Um Novo Short Video</Button>
        </Link>
    </div>
  )
}
  