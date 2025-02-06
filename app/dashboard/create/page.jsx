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
import AlertDialogComponent from '../_components/AlertDialog';
import { PlayerDialog } from '../_components/PlayerDialog';

export default function CreateNew() {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const { videoData, setVideoData } = useVideoDataContext();
  const [playVideo, setPlayVideo] = React.useState(false);
  const [videoId, setVideoId] = React.useState(1);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const { user } = useUser()

  const onHandleInputChange = React.useCallback((fieldName, fieldValue) => {
    setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  }, [])

  const registerData = async (url, data) => {
    try {
      const response = await axios.post(url, { data });
      return response.data;
    } catch (error) {
      console.error(`Erro ao chamar ${url}:`, error);
      return null;
    }
  }

  const onHandleClickCreate = React.useCallback(async () => {
    setLoading(true);
    try {
      const prompt = createPromptScript();
      const script = await registerData('/api/video-script', prompt);
      if (!script) throw new Error('Erro ao criar script do vídeo');

      const audioScript = createAudioScript(script);

      const audioResponse = await registerData('/api/audio', audioScript);
      const imageResponse = await registerData('/api/image', script);
      const captionResponse = await registerData('/api/caption', audioResponse);

      if (!audioResponse || !imageResponse || !captionResponse) throw new Error('Erro ao gerar recursos do vídeo');

      setVideoData(prev => ({
        ...prev,
        videoScript: script?.result || [],
        audioScript: audioResponse?.url || '',
        imageUrl: imageResponse?.urls || [],
        captions: captionResponse?.result || [],
      }));

      await registerData('/api/video-data', {
        data: videoData,
        createdBy: user?.primaryEmailAddress?.emailAddress,
      });
      setSuccess(true);
    } catch (error) {
      setError(error.message || 'Erro ao criar vídeo');
      console.error('Erro ao criar o vídeo:', error);
    } finally {
      setLoading(false);
    }
  }, [videoData, setVideoData, user]);

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
    dataResult.forEach((item => {
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

  function handleCloseAlert() {
    setSuccess(false)
    setError(false)
  }

  React.useEffect(() => {
    if (success) setPlayVideo(true);
  }, [videoData, success, error])

  return (
    <div className='md:px-20'>
      <h2 className='font-bold text-4xl text-primary text-center'> + Criar mais um</h2>
      <div className='mt-10 shadow-md p-10 border-2 border-emerald-700'>
        {/* Topico */}
        <SelectTopic onUserSelect={onHandleInputChange} />
        {/* Estilo */}
        <SelectStyle onUserSelect={onHandleInputChange} />
        {/* Duração */}
        <SelectDurations onUserSelect={onHandleInputChange} />
        {/* Duração */}
        <Button
          className='mt-10 w-full hover:bg-neutral-400 hover:text-emerald-700'
          onClick={onHandleClickCreate}
        >Criar Short Video</Button>
        <LoadingCreate loading={loading} />
        {/* Alert Dialog */}
        {error && <AlertDialogComponent text={error} open={error} onClose={handleCloseAlert} />}
        {/* Player Dialog */}
        <PlayerDialog playerVideo={playVideo} videoData={videoData} />
      </div>
    </div>
  )
}
