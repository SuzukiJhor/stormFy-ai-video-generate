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
import { useRouter } from 'next/navigation';

export function PlayerDialog({ playerVideo, videoData = null, setPlayerVideo = null }) {
    const [durationFrame, setDurationFrame] = React.useState(100);
    const [openDialog, setOpenDialog] = React.useState(false);
    const router = useRouter();

    function handleDialog() {
        setOpenDialog(false)
        if (setPlayerVideo)
            setPlayerVideo((prevState) => !prevState);
        router.replace('/dashboard')
    }

    React.useEffect(() => {
        setOpenDialog(playerVideo)
    }, [playerVideo, setOpenDialog]);

    return (
        <Dialog open={openDialog} onOpenChange={handleDialog}>
            <DialogContent className="sm:max-w-[425px] flex flex-col items-center border-4 border-emerald-700">
                <DialogHeader>
                    <DialogTitle className='text-3xl font-bold my-5'>Seu video esta pronto</DialogTitle>
                    <Player
                        component={RemotionVideo}
                        durationInFrames={Number(durationFrame.toFixed(0))}
                        compositionWidth={300}
                        compositionHeight={450}
                        fps={30}
                        controls={true}
                        inputProps={{
                            audioScript: videoData?.audioScript ?? videoData?.audioFileUrl,
                            captions: videoData?.captions,
                            imageUrl: videoData?.imageurl ?? videoData?.imageList,
                            videoScript: videoData?.script,
                            setDurationFrame: (v) => { }
                        }}
                    />
                    <div className='flex gap-10 p-2 justify-center'>
                        <Button onClick={handleDialog}>Dashboard</Button>
                        {/* <Button>Exportar</Button> */}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
