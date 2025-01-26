import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
export default function SelectDurations({onUserSelect}) {
    const [ selectedOption, setSelectedOption ] = React.useState();

  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>
            Duração
        </h2>
        <p className='text-gray-500'>Selecione a Duração do Video</p>
        <Select onValueChange={(value)=> {
            setSelectedOption(value);
            value != 'Prompt Customizado' && onUserSelect('duration', value)
        }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione Duração" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="30 sec">30 Segundos</SelectItem>
                <SelectItem value="60 sec">60 Segundos</SelectItem>
            </SelectContent>
        </Select>
    </div>
  )
}
