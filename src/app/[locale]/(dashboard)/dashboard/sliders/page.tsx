/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { Button } from "@/components/ui/button";
import { apiUrl, imageBaseUrl } from "@/configs/config";
import { SliderType } from "@/types/slider.type";
import axios from "axios";
import { Plus } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const INITIAL_FORM_VALUES = {
    alt: "",
    priority: "",
    file: ""
}

const SlidersPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [sliders, setSliders] = useState<SliderType[]>([])
    const [formValue, setFormValue] = useState(INITIAL_FORM_VALUES)
    const [openFileModal, setOpenFileModal] = useState<boolean>(false)


    const getSliders = async () => {
        const url = apiUrl + "sliders";
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setSliders(res.data.data)

        } catch (error) {
            console.log(error);
            setSliders([])

        }
        setIsLoading(false)
    }
    const deleteSlider = async (id: string) => {
        const url = apiUrl + "sliders/" + id;
        setIsLoading(true)
        try {
            const res = await axios.delete(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            getSliders()

        } catch (error) {
            console.log(error);

        }
        setIsLoading(false)
    }


    useEffect(() => {
        getSliders()
    }, [])



    return (
        <>
            <div className="max-w-450 mx-auto px-8 md:px-16 mt-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-bold text-black">اسلایدر ها</h1>
                    <Button onClick={() => setIsOpen(true)}>
                        <span>اسلایدر جدید</span>
                        <Plus />
                    </Button>
                </div>
                <div className='mx-auto mt-6'>
                    <div>
                        <div className='overflow-x-auto rounded-lg shadow-md '>
                            <table className=' min-w-125 w-full bg-white  '>
                                <thead>
                                    <tr className='bg-zinc-300 text-xs md:text-sm text-black'>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>اولویت</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>alt</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>فایل</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading
                                        ? Array(5)
                                            .fill(0)
                                            .map((_, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-4 w-12 mx-auto'></div>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-8 w-8 mx-auto'></div>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-4 w-32 mx-auto'></div>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-4 w-24 mx-auto'></div>
                                                    </td>

                                                </tr>
                                            ))
                                        : sliders
                                            ?.map((slider, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/4'>{slider.priority}</td>
                                                    <td className='p-1 py-3 text-center w-1/4'>{slider.alt}</td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <a href={imageBaseUrl + slider.url} target="_blank">
                                                            <img className="w-28 mx-auto cursor-pointer" src={imageBaseUrl + slider.url} alt={imageBaseUrl + slider.alt} />
                                                        </a>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        {/* <Popover>
                                                    <Popover.Trigger>
                                                        <Button variant="text" color="danger">
                                                            <Icon className="mx-auto text-red cursor-pointer" icon="material-symbols:delete-outline-sharp" width="24" height="24" />
                                                        </Button>
                                                    </Popover.Trigger>
                                                    <Popover.Content>
                                                        {({ setOpen }) => (
                                                            <div className="w-56 space-y-3">
                                                                <Title as="h6">عملیات حذف</Title>
                                                                <Text>از حذف اسلایدر اطمینان دارید؟</Text>
                                                                <div className="flex justify-end gap-3 mb-1">
                                                                    <Button size="sm" variant="outline" color="danger" onClick={() => setOpen(false)}>
                                                                        خیر
                                                                    </Button>
                                                                    <Button size="sm" onClick={() => {
                                                                        deleteSlider(slider._id)
                                                                        setOpen(false)
                                                                    }}>
                                                                        بله
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Popover.Content>
                                                </Popover> */}

                                                    </td>

                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            {(sliders?.length === 0 && !isLoading) && (
                                <p className='w-full text-center my-10'>چیزی برای نمایش وجود ندارد</p>
                            )}
                        </div>
                    </div>
                </div>

            </div>


            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogContent dir="rtl" className="sm:max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>ایجاد اسلایدر</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <Label>نام اسلایدر</Label>
                            <Input
                                type="text"
                                value={formValue.alt}
                                onChange={(e) => {
                                    setFormValue(prev => ({
                                        ...prev,
                                        alt: e.target.value
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>اولویت</Label>
                            <Input
                                type="number"
                                value={formValue.priority}
                                onChange={(e) => {
                                    setFormValue(prev => ({
                                        ...prev,
                                        priority: e.target.value
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>فایل:</Label>
                            <Button onClick={()=>setOpenFileModal(true)}>انتخاب فایل</Button>
                            <Dialog open={openFileModal} onOpenChange={setOpenFileModal}>

                                <DialogContent dir="rtl" className="sm:max-w-6xl">
                                    <DialogHeader>
                                        <DialogTitle>انتخاب فایل</DialogTitle>
                                        <DialogDescription>

                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        {/* <div className="flex flex-col gap-4">
                                            <Label>نام اسلایدر</Label>
                                            <Input
                                                type="text"
                                                value={formValue.alt}
                                                onChange={(e) => {
                                                    setFormValue(prev => ({
                                                        ...prev,
                                                        alt: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Label>اولویت</Label>
                                            <Input
                                                type="number"
                                                value={formValue.priority}
                                                onChange={(e) => {
                                                    setFormValue(prev => ({
                                                        ...prev,
                                                        priority: e.target.value
                                                    }))
                                                }} />
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Label>فایل:</Label>
                                            <Button>انتخاب فایل</Button>
                                        </div> */}

                                    </div>
                                    <DialogFooter className="sm:justify-start">
                                        <DialogClose asChild>
                                            <Button type="button">Close</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>

                    </div>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button">Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
};

export default SlidersPage;
