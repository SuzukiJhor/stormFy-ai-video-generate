'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Player } from "@remotion/player";
import RemotionVideo from './RemotionVideo';
import { Button } from '@/components/ui/button';

export function PlayerDialog({ playerVideo, videoData = null }) {
    const [ durationFrame, setDurationFrame ] = React.useState(100);
    const [ openDialog, setOpenDialog ] = React.useState(true);
    const [ videoInfo, setInfoData ] = React.useState(videoData);
    React.useEffect(()=>{setOpenDialog(playerVideo)}, [playerVideo]);

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center border-4 border-emerald-700">
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold my-5'>Seu video esta pronto</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={Number(durationFrame.toFixed(0))}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                            controls={true}
                            inputProps={{
                                ...videoData,
                                setDurationFrame: (valueFrame) => setDurationFrame(valueFrame)
                            }}
                        />
                        <div className='flex gap-10 p-2 justify-center'>
                            <Button variant='destructive'>Cancel</Button>
                            <Button>Exportar</Button>
                        </div>
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}
