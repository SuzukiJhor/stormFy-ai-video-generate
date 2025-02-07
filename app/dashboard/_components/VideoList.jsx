import React from 'react'
import { Thumbnail } from '@remotion/player';
import RemotionVideo from './RemotionVideo';
import { PlayerDialog } from './PlayerDialog';

export default function VideoList({ videoList }) {
  const [openPlayDialog, setOpenPlayDialog] = React.useState(false);
  const [videoInfo, setVideoinfo] = React.useState();

  const SetdataInfoVideo = React.useCallback((video) => {
    setVideoinfo(video)
    setOpenPlayDialog((prevState) => !prevState);
  }, [setVideoinfo, setOpenPlayDialog])

  return (
    <div className='mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {videoList?.map((video, index) => (
        <div
          key={index}
          onClick={() => SetdataInfoVideo(video)}
          className='cursor-pointer hover:scale-105 transition-all'
        >
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={200}
            compositionHeight={250}
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            style={{
              borderRadius: 15
            }}
            inputProps={{
              ...video,
              setDurationFrame: (v) => { }
            }}
          />
        </div>
      ))}
      <PlayerDialog playerVideo={openPlayDialog} videoData={videoInfo} setPlayerVideo={setOpenPlayDialog} />
    </div>
  )
}
