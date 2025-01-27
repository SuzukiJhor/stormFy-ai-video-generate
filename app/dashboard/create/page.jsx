'use client'
import React from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDurations from './_components/SelectDurations';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function CreateNew() {
  const [ formData, setFormData ] = React.useState([]);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData( prev => ({
      ...prev,
      [fieldName] : fieldValue
    }))
  }

  const onHandleCreateCick = async () => {
    const prompt = videoScript();
    await postVideoScriptRequest(prompt);
  }

  async function postVideoScriptRequest(prompt) {
      return await axios.post('/api/video-script', {
        prompt: prompt
      }).then( res => {
        console.log('postVideoScriptRequest', res.data);
      })
  }

  function videoScript() {
    const prompt = 
    `Write a script to generate ${formData.duration} video on topic: ${formData.topic} along with AI image prompt in ${formData.ImageStyle} format for each scene and give me result in JSON format with imagePrompt and ContextText as field, No Plain Text`;
    return prompt;
  }
  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'> + Criar mais um</h2>
      <div className='mt-10 shadow-md p-10'>
        {/* Topico */}
        <SelectTopic onUserSelect={onHandleInputChange}/>
        {/* Estilo */}
        <SelectStyle onUserSelect={onHandleInputChange}/>
        {/* Duração */}
        <SelectDurations onUserSelect={onHandleInputChange}/>
        {/* Duração */}
        <Button 
          className='mt-10 w-full'
          onClick={onHandleCreateCick}
        >Criar Short Video</Button>
      </div>
    </div>
  )
}
