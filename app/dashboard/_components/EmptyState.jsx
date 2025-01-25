import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function EmptyState() {
  return (
    <div className='p-5 py-24 flex items-center flex-col mt-10 border-2 border-dashed'>
        <h2>Você não tem nenhum video criado!</h2>
        <Link href={'/dashboard/create'}>
            <Button>Crie Um Novo Short Video</Button>
        </Link>
    </div>
  )
}
