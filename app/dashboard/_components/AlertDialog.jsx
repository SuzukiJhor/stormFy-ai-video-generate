'use client'
import { useState, useEffect } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function AlertDialogComponent({ text, open = false, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const status = text === "Video gerado com sucesso!" ? "success" : "error";
    console.log(status)
    useEffect(() => { setIsOpen(open) }, [open]);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) onClose();
    };


    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                {status === "error" && <AlertDialogTitle className='bg-red-600 p-2 rounded'>Ocorreu um Erro</AlertDialogTitle>}
                {status === "success" && <AlertDialogTitle className='bg-green-600 p-2 rounded'>Deu certo</AlertDialogTitle>}

                <AlertDialogDescription>{text}</AlertDialogDescription>

                <AlertDialogFooter>
                    <AlertDialogAction onClick={handleClose}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
