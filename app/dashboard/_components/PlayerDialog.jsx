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

export function PlayerDialog({ playerVideo, videoData = null }) {
    const [ openDialog, setOpenDialog ] = React.useState(true);
    const [ videoInfo, setInfoData ] = React.useState(videoData);
    React.useEffect(()=>{setOpenDialog(playerVideo)}, [playerVideo]);

    return (
        <Dialog open={openDialog}>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center border-4 border-emerald-700">
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold my-5'>Seu video esta pronto</DialogTitle>
                    <DialogDescription>
                        <Player
                            component={RemotionVideo}
                            durationInFrames={120}
                            compositionWidth={300}
                            compositionHeight={450}
                            fps={30}
                        />
                    </DialogDescription>
                </DialogHeader>

            </DialogContent>
        </Dialog>
    )
}
