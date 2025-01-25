'use client'
import React from 'react'
import SelectTopic from './-components/SelectTopic'

export default function CreateNew() {
  const [ formData, seFormData ] = React.useState([]);
  const onHandleInputChange = (fieldName, fieldValue) => {
    console.log(fieldName, fieldValue)
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'> + Criar mais um</h2>
      <div className='mt-10 shadow-md p-10'>
        {/* Topico */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
      </div>
    </div>
  )
}
