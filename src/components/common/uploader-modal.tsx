"use client"
import { useFileUploaderStore } from "@/stores/file-uploader.store";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { apiUrl, imageBaseUrl } from "@/configs/config";
import axios from "axios";
import { FileItem } from "@/types/file-uploader.type";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { Pagination } from "@/types/api/pagination.type";

type UploaderModalPropsType = {
    onSelect: (link: string) => void
}

const UploaderModal: React.FC<UploaderModalPropsType> = ({ onSelect }) => {
    const isUploaderOpen = useFileUploaderStore(state => state.isUploaderOpen)
    const closeUploader = useFileUploaderStore(state => state.closeUploader)
    const [open, setOpen] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1)
  
    const [pagination, setPagination] = useState<Pagination>()

    const [isLoading, setIsLoading] = useState(false)
    const [fileList, setFileList] = useState<FileItem[]>([])

    const uoloadFile = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = apiUrl + "uploads";
        const formData = new FormData()
        formData.append("file", file!)




        try {
            const res = await axios.post(url, formData, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res);
            setOpen(false)
            toast.success("با موفقیت آپلود شد")
            getFiles()


        } catch (error) {
            toast.error("خطایی رخ داده است")


        }
        setIsLoading(false)
    }

    const getFiles = async () => {
        const url = apiUrl + `uploads?page=${page}&limit=5`;
        setIsLoading(true)
        try {
            const res = await axios.get(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log("res:::", res.data.pagination);
            setPagination(res.data.pagination)
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
    }, [page])

    const handleSelect = (link: string) => {
        onSelect(link)
        closeUploader()
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (!selectedFile) return;

        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
    };

    const handleRemove = () => {
        setFile(null);
        setPreview(null);
    };

    return (
        <Dialog open={isUploaderOpen} onOpenChange={closeUploader}>

            <DialogContent showCloseButton={false} dir="rtl" className="sm:max-w-full">
                <DialogHeader className="relative ">
                    <Button onClick={() => setOpen(true)} className="absolute end-0 top-0" size={"icon"}><Plus className="size-4" /></Button>
                    <Dialog open={open} onOpenChange={setOpen} >

                        <DialogContent dir="rtl" >
                            <DialogHeader className="relative ">

                                <DialogTitle>بارگذاری فایل</DialogTitle>
                                <DialogDescription>

                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={uoloadFile} className="grid grid-cols-1  gap-4">

                                <Field>
                                    <FieldLabel htmlFor="picture">انتخاب</FieldLabel>

                                    <Input
                                        id="picture"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />

                                    <FieldDescription>یک فایل را انتخاب گنید</FieldDescription>

                                    {preview && (
                                        <div style={{ marginTop: 12 }}>
                                            <img
                                                src={preview}
                                                alt="preview"
                                                style={{
                                                    width: 120,
                                                    height: 120,
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    display: "block",
                                                    marginBottom: 8,
                                                }}
                                            />

                                            <button className="cursor-pointer" type="button" onClick={handleRemove}>
                                                حذف تصویر
                                            </button>
                                        </div>
                                    )}
                                </Field>

                                <DialogFooter className="sm:justify-end">
                                    <DialogClose asChild>
                                        <Button type="button">بازگشت</Button>
                                    </DialogClose>

                                    <Button type="submit">آپلود</Button>

                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <DialogTitle>انتخاب فایل</DialogTitle>
                    <DialogDescription>

                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-4">
                    {fileList.map((file, index) => (
                        <div
                            key={`file-${file._id}-${index}`}
                            onClick={() => { handleSelect(file.path) }}
                            className="w-40  cursor-pointer rounded-lg overflow-hidden hover:grayscale-50 border border-primary-foreground hover:border-primary transition-all"
                        >
                            <img className="" src={imageBaseUrl + file.path} alt="" />
                        </div>
                    ))}


                </div>
                <div className="flex items-center justify-center gap-1">
                    <Button onClick={() => {
                        if (pagination?.hasPrevPage) setPage(prev => prev - 1)
                    }}>قبلی</Button>
                    <Button onClick={() => {
                        if (pagination?.hasNextPage) setPage(prev => prev + 1)
                    }}>بعدی</Button>
                </div>
                <DialogFooter className="sm:justify-end">
                    <DialogClose asChild>
                        <Button type="button">بازگشت</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default UploaderModal;
