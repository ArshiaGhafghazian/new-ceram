"use client"
import { useFileUploaderStore } from "@/stores/file-uploader.store";
import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { apiUrl, imageBaseUrl } from "@/configs/config";
import axios from "axios";
import { FileItem } from "@/types/file-uploader.type";

type UploaderModalPropsType = {
    onSelect: (link: string) => void
}

const UploaderModal: React.FC<UploaderModalPropsType> = ({ onSelect }) => {
    const isUploaderOpen = useFileUploaderStore(state => state.isUploaderOpen)
    const closeUploader = useFileUploaderStore(state => state.closeUploader)

    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState<FileItem[]>([])

    const getFiles = async () => {
        const url = apiUrl + "uploads";
        setIsLoading(true)
        try {
            const res = await axios.get(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log("res:::", res.data.data);
            setFileList(res.data.data)

        } catch (error) {
            console.log(error);
            setFileList([])

        }
        setIsLoading(false)
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getFiles()
    }, [])

    const handleSelect = (link: string) => {
        onSelect(link)
        closeUploader()
    }



    return (
        <Dialog open={isUploaderOpen} onOpenChange={closeUploader}>

            <DialogContent dir="rtl" className="sm:max-w-full">
                <DialogHeader>
                    <DialogTitle>انتخاب فایل</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {fileList.map((file, index) => (<div onClick={()=>{handleSelect(file.path)}} key={`file-${file._id}-${index}`} className="w-40 cursor-pointer rounded-lg overflow-hidden hover:grayscale-50 border border-primary-foreground hover:border-primary transition-all"><img src={imageBaseUrl + file.path} alt="" /></div>))}


                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploaderModal;
