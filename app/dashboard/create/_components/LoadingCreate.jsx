import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import Image from 'next/image'

export default function LoadingCreate({ loading }) {
  return (
    <AlertDialog open={loading}>
   
      <AlertDialogContent className='bg-white'>
        <AlertDialogTitle className='flex flex-col items-center'>Gerando Video, Aguarde...</AlertDialogTitle>
        <div className='flex flex-col items-center my-10 justify-center'>
          <Image 
            src={'/trabalho-em-progresso.gif'} 
            width={100} height={100}
            alt='icone de progresso'
          />
        </div>
      </AlertDialogContent>

    </AlertDialog>
  )
}
