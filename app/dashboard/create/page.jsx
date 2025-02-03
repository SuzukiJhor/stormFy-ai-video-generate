'use client'
import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button';
import SelectTopic from './_components/SelectTopic'
import SelectStyle from './_components/SelectStyle';
import LoadingCreate from './_components/LoadingCreate';
import SelectDurations from './_components/SelectDurations';
import { useVideoDataContext } from '@/app/context/videoDataContext';

export default function CreateNew() {
  const [ loading, setLoading ] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const { videoData, setVideoData } = useVideoDataContext();
  const { user } = useUser()

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData( prev => ({
      ...prev,
      [fieldName] : fieldValue
    }))
  }

  const onHandleClickCreate = async () => {
    try {
      setLoading(true);
      const prompt = createPromptScript();
  
      const script = await defineVideoScriptPost(prompt);
      const resultAudioScript =  createAudioScript(script);
  
     await defineImagePost(script);
  
      const urlAudio = await defineAudioScriptPost(resultAudioScript);
      await defineCaptionScriptPost(urlAudio);

      await defineVideoDataPost();
      
      setLoading(false);
    } catch (error) {
      console.error('Erro ao criar o vídeo:', error);
      setLoading(false);
    }
  };

  async function defineVideoDataPost() {
    try {
      const response = await axios.post('/api/video-data', {
        data: videoData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      })
      console.log(response.data)
      return;
    } catch(err) {
      console.error('defineAudioScriptPost', err)
    }
  }

  async function defineAudioScriptPost(data) {
    try {
      const response = await axios.post('/api/audio', {
        data
      })
      setVideoData( prev => ({
        ...prev,
        'audioScript' : response.data?.url,
      }))
      return response.data;
    } catch(err) {
      console.error('defineAudioScriptPost', err)
    }
  }

  async function defineCaptionScriptPost(data) {
    try {
      const response = await axios.post('/api/caption', {
        data
      })
      setVideoData( prev => ({
        ...prev,
        'captions' : response.data?.result,
      }))
    } catch(err) {
      console.error('defineCaptionScriptPost', err)
    }
  }

  async function defineVideoScriptPost(prompt) {
    try {
      const response = await axios.post('/api/video-script', {
        data: prompt
      })
      setVideoData( prev => ({
        ...prev,
        'videoScript' : response.data?.result,
      }))
      return response.data;
    } catch(err) {
      console.error('defineVideoScriptPost', err)
    }
  }

  async function defineImagePost(prompt) {
    try {
      const response = await axios.post('/api/image', {
        data: prompt
      })
      setVideoData( prev => ({
        ...prev,
        'imageUrl' : response.data?.urls,
      }))
      return response.data;
    } catch(err) {
      console.error('defineImagePost', err)
    }
  }

  function createAudioScript(prompt) {
    const { result } = prompt;
    const id = uuidv4();
    const script = result
    const text = joinText(script)
    const audio = {
      text, id
    }
    return audio;
  }

  function joinText(dataResult) {
    let script = '';
    dataResult.forEach(( item =>  {
      script = script + item.contextText + '';
    }))
    return script;
  }

  function createPromptScript() {
    const duration = formData.duration || 'default duration';
    const topic = formData.topic || 'general topic';
    const imageStyle = formData.ImageStyle || 'realistic';

    return `
      Write a script to generate ${duration} video on topic: ${topic} 
      along with AI image prompt in ${imageStyle} format for each scene 
      and give me result in JSON format with imagePrompt and ContextText as field, No Plain Text
    `;
  }

  React.useEffect(()=> {}, [videoData])

  return (
      <div className='md:px-20'>
        <h2 className='font-bold text-4xl text-primary text-center'> + Criar mais um</h2>
        <div className='mt-10 shadow-md p-10'>
          {/* Topico */}
          <SelectTopic onUserSelect={onHandleInputChange} />
          {/* Estilo */}
          <SelectStyle onUserSelect={onHandleInputChange} />
          {/* Duração */}
          <SelectDurations onUserSelect={onHandleInputChange} />
          {/* Duração */}
          <Button
            className='mt-10 w-full'
            onClick={onHandleClickCreate}
          >Criar Short Video</Button>
          <LoadingCreate loading={loading} />
        </div>
      </div>
  )
}
