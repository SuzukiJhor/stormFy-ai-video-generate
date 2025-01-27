'use client'
import React from 'react'
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import SelectDurations from './_components/SelectDurations';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import LoadingCreate from './_components/LoadingCreate';
import { v4 as uuidv4 } from 'uuid';

export default function CreateNew() {
  const [ loading, setLoading ] = React.useState(false);
  const [ formData, setFormData ] = React.useState([]);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData( prev => ({
      ...prev,
      [fieldName] : fieldValue
    }))
  }

  const onHandleCreateCick = async () => {
    const prompt = videoScript();
    setLoading(true);
    const script = await postVideoScriptRequest(prompt);
    const result = await generateAudio(script);
    const response = await postAudioScriptRequest(result);
    setLoading(false);
    console.log('Resultado', response);
  }

  async function postAudioScriptRequest(data) {
    try {
      const response = await axios.post('/api/audio', {
        data
      })
      return response.data;
    } catch(err) {
      console.error('postAudioScriptRequest', err)
    }
  }

  async function postVideoScriptRequest(prompt) {
    try {
      const response = await axios.post('/api/video-script', {
        prompt: prompt
      })
      return response.data;
    } catch(err) {
      console.error('postVideoScriptRequest', err)
    }
  }

  async function generateAudio({ result: { video_scenes } }) {
    const id = uuidv4();
    const script = video_scenes
    const text = await joinText(script)
    const audio = {
      text, id
    }
    return audio;
  }

  async function joinText(dataResult) {
    let script = '';
    await dataResult.forEach(( item =>  {
      script = script + item.contextText + '';
    }))
    return script;
  }

  function videoScript() {
    const prompt = `Escreva um script para gerar um vídeo de ${formData.duration} sobre o tema: ${formData.topic}, juntamente com um prompt de imagem gerado por IA no formato ${formData.ImageStyle} para cada cena, e forneça o resultado no formato JSON com os campos imagePrompt e ContextText. Não inclua texto simples.`;
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
        <LoadingCreate loading={loading} />
      </div>
    </div>
  )
}
