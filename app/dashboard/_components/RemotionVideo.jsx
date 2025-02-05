import React from 'react'
import { AbsoluteFill, Audio, Img, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

export default function RemotionVideo({ audioScript, captions, imageUrl, videoScript, setDurationFrame }) {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame(); // 25
  const defineDurationFrame = () => {
    setDurationFrame(captions[captions?.length - 1]?.end / 1000 * fps)
    return captions[captions?.length - 1]?.end / 1000 * fps
  }
  const defineCurrentCaptions = () => {
    const currentTime = frame / 30 * 1000 //convert fram to milesseconds
    const currentCaption = captions.find((item) => currentTime >= item.start && currentTime <= item.end)
    return currentCaption ? currentCaption?.word : '';
  }  
  return (
    <AbsoluteFill key={captions.length}>
      {imageUrl?.map((item, index) => (
        <>
          <Sequence key={index} from={(index * defineDurationFrame()) / imageUrl?.length} durationInFrames={defineDurationFrame()}>
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
            <AbsoluteFill className='text-black flex font-bold
              justify-start items-center
              '>
              <h2 className='text-2xl'>{defineCurrentCaptions()}</h2>
            </AbsoluteFill>
          </Sequence>
        </>
      ))}
      <Audio src={audioScript} />
    </AbsoluteFill>
  )
}
