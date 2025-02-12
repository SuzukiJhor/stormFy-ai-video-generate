import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

export default function TitleVideo({ onUserSelect }) {
    return (
        <div className='mt-7'>
            <h2 className='font-bold text-2xl text-primary pb-6'>
                Titúlo
            </h2>
            <p className='text-gray-500 pb-4'>Defina o Titúlo do seu Video</p>
            <Input
                className='mt-03 border-emerald-700'
                placeholder='Escreva o Titulo'
                onChange={(e)=> onUserSelect('title', e.target.value)}
            />
        </div>
    )
}
