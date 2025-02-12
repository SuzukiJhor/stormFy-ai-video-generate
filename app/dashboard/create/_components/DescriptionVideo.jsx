import React from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';

export default function DescriptionVideo({ onUserSelect }) {
    return (
        <div 
            className='mt-7 animate-in'
            style={{ animationDelay: '2s' }}
        >
            <h2 className='font-bold text-2xl text-primary pb-6'>
                Descrição
            </h2>
            <Input
                className='mt-03 border-emerald-700'
                placeholder='Escreva uma breve descrição para o Video'
                onChange={(e)=> onUserSelect('description', e.target.value)}
            />
        </div>
    )
}
