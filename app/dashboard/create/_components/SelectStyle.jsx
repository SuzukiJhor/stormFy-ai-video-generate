import Image from 'next/image'
import React from 'react'

const styleOptions = [
    {
        name: 'Realista',
        image: '/realistic.jpg',
        description: 'imagem realista'
    },
    {
        name: 'Cartoon',
        image: '/cartoon.png',
        description: 'imagem de cartoon'

    },
    {
        name: 'Comic',
        image: '/comic.jpg',
        description: 'imagem Comi'

    },
]

export default function SelectStyle({onUserSelect}) {
    const [ selectedOption, setSelectedOption ] = React.useState();
    
  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl text-primary'>Style</h2>
        <p className='text-gray-500 p-1'>Selecione seu Estilo de Video</p>
        <div className='grid grid-cols-2 md:grid-cols-3
            lg:grid-cols-5 xl:grid-cols-6 gap-5 mt-03
        '>
            {styleOptions.map((item, index) => (
                <div key={index} className={`relative hover:scale-105 transition-all cursor-pointer
                    ${selectedOption == item.name && 'border-2 border-black scale-110'}    
                `}>
                    <Image 
                        alt={item.description}
                        src={item.image} 
                        width={100} 
                        height={100}
                        className='h-48 object-cover rounded-lg w-full' 
                        onClick={()=> {
                            setSelectedOption(item.name)
                            onUserSelect('ImageStyle', item.name)
                        }}
                    />
                    <h2 className='absolute p-1 bg-black bottom-0 w-full text-white text-center'>
                        {item.name}
                    </h2>
                </div>
            ))}
            
        </div>

    </div>
  )
}
