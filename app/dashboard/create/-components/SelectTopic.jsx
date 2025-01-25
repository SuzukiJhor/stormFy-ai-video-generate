'use client'
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

export default function SelectTopic({onUserSelect}) {
    const [ selectedOption, setSelectedOption ] = React.useState();
    const options = [ 'Prompt Customizado', 'História Aleatória IA', 'História de Medo']
  return (
    <div>
        <h2 className='font-bold text-2xl text-primary'>Conteudo</h2>
        <p className='text-gray-500'>Qual o Tópico do seu Video ?</p>
        <Select onValueChange={(value) => {
          setSelectedOption(value)
          value != 'Prompt Customizado' && onUserSelect('topic', value)
          }}>
            <SelectTrigger className="w-full mt-02 p-6 text-lg">
                <SelectValue placeholder="Tipo de Conteudo" />
            </SelectTrigger>
            <SelectContent>
                {options.map((item, index)=>(
                <SelectItem value={item} key={index}>{item}</SelectItem>
                ))}
            </SelectContent>
        </Select>

        {selectedOption === 'Prompt Customizado' && 
            <Textarea 
              className='mt-03' 
              placeholder='Escreva seu Prompt Aqui'
              onChange={(e)=> onUserSelect('Topic', e.target.value)}
            />
        }
    </div>
  )
}
