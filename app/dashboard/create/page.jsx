'use client'
import React from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
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
  const scriptVideoRef = React.useRef({});
  const audioURLRef = React.useRef({});
  const captionsRef = React.useRef({});
  const imagesURLRef = React.useRef({});

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData( prev => ({
      ...prev,
      [fieldName] : fieldValue
    }))
  }

  const onHandleClickCreate = async () => {
    const prompt = createPromptScript();
    setLoading(true);
    await defineVideoScriptPost(prompt);

    const resultAudioScript = await createAudioScript(scriptVideoRef.current);

    await defineAudioScriptPost(resultAudioScript);

    await defineCaptionScriptPost(audioURLRef.current);

    await defineImagePost(scriptVideoRef.current);
    setLoading(false);
    console.log('result -- Urls', videoData);
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
      audioURLRef.current = response.data
      return;
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
        'captions' : response.data,
      }))
      captionsRef.current = response.data;
      return;
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
        'videoScript' : response.data,
      }))
      scriptVideoRef.current = response.data;
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
        'imageUrl' : response.data,
      }))
      imagesURLRef.current = response.data;
      return response.data;
    } catch(err) {
      console.error('defineImagePost', err)
    }
  }

  async function createAudioScript(prompt) {
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
    return `
      Write a script to generate ${formData.duration} video on topic: ${formData.topic} 
      along with AI image prompt in ${formData.ImageStyle} format for each scene and give 
      me result in JSON format with imagePrompt and ContextText as field, No Plain Text
    `;
  }

  React.useEffect(()=> {
    console.log(videoData)
  }, [videoData])

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
