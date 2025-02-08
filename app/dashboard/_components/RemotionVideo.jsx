'use client'
import React from 'react'
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

export default function RemotionVideo({ audioScript, captions, imageUrl, videoScript, setDurationFrame }) {  
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame(); // 25

  const defineDurationFrame = () => {
    setDurationFrame(captions[captions?.length - 1]?.end / 1000 * fps)
    return captions[captions?.length - 1]?.end / 1000 * fps
  }

  const defineCurrentCaptions = React.useCallback(() => {
    const currentTime = (frame / fps) * 1000; // Convert frame para milissegundos
    const currentCaption = captions.find((item) => currentTime >= item.start && currentTime <= item.end)
    return currentCaption ? currentCaption?.word : '';
  }, [captions, fps]);

  return (
    <AbsoluteFill>
      {imageUrl?.map((item, index) => {
        const startTime = (index * defineDurationFrame()) / imageUrl?.length;
        const duration = defineDurationFrame();
        const scale = (index) =>
          interpolate(
            frame,
            [startTime, startTime + duration / 2, startTime + duration],
            index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

        return (
          <Sequence key={`sequence-${index}`} from={startTime} durationInFrames={duration}>
            <Img
              src={item}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: `scale(${scale(index)})`,
              }}
            />
            <AbsoluteFill key={`caption-${index}`} className="text-white flex font-bold justify-start items-center">
              <h2 className="text-2xl">{defineCurrentCaptions()}</h2> 
            </AbsoluteFill>
          </Sequence>
        );
      })}
      {audioScript && <Audio src={audioScript} from={0} />}
    </AbsoluteFill>
  )
}
