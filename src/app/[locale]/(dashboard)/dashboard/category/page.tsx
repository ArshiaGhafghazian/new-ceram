/* eslint-disable react-hooks/set-state-in-effect */
"use client"
import { Button } from "@/components/ui/button";
import { apiUrl, imageBaseUrl } from "@/configs/config";
import { useFileUploaderStore } from "@/stores/file-uploader.store";
import { CategoryType } from "@/types/category.type";
import axios from "axios";
import { Edit, Plus, Trash2, Trash2Icon } from "lucide-react";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Pagination } from "@/types/api/pagination.type";
import toast from "react-hot-toast";
import UploaderModal from "@/components/common/uploader-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const INITIAL_FORM_VALUES = {
    name: { fa: "", en: "", ar: "", ru: "" },
    description: { fa: "", en: "", ar: "", ru: "" },
    size: "",
    image: "",
    alt: "",
    priority: "",
}

const Category = () => {
    const openUploader = useFileUploaderStore(state => state.openUploader)
    const isUploaderOpen = useFileUploaderStore(state => state.isUploaderOpen)
    const [isOpen, setIsOpen] = useState(false)
    const [categoryId, setCategoryId] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pagination, setPagination] = useState<Pagination>()
    const [formValue, setFormValue] = useState(INITIAL_FORM_VALUES)

    const getCategories = async () => {
        const url = apiUrl + `category?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setCategories(res.data.data)
            setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setCategories([])

        }
        setIsLoading(false)
    }
    const getCategory = async () => {
        const url = apiUrl + `category/${categoryId}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            const response = res.data.data as CategoryType
            setFormValue({
                alt: response.alt,
                description: response.description,
                image: response.image,
                name: response.name,
                priority: response.priority,
                size: response.size
            })

        } catch (error) {
            console.log(error);


        }
        setIsLoading(false)
    }

    const createCategory = async () => {
        const url = apiUrl + `category`;
        setIsLoading(true)
        try {
            const res = await axios.post(url, formValue, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت ایجاد شد")
            getCategories()
            setFormValue(INITIAL_FORM_VALUES)
            setCategoryId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")



        }
        setIsLoading(false)
    }
    const updateCategory = async () => {
        const url = apiUrl + `category/${categoryId}`;
        setIsLoading(true)
        try {
            const res = await axios.patch(url, formValue, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت به روزرسانی شد")
            getCategories()
            setFormValue(INITIAL_FORM_VALUES)
            setCategoryId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")


        }
        setIsLoading(false)
    }

    const deleteCategory = async (id: string) => {
        const url = apiUrl + "category/" + id;
        setIsLoading(true)
        try {
            const res = await axios.delete(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            getCategories()
            toast.success("با موفقیت به حذف شد");

        } catch (error) {
            toast.error("خطایی رخ داده است");
            console.log(error);

        }
        setIsLoading(false)
    }

    useEffect(() => {
        getCategories()
    }, [page])

    useEffect(() => {
        if (categoryId !== undefined)
            getCategory()
    }, [categoryId])

    return (
        <>
            <div className="max-w-450 mx-auto px-8 md:px-16 mt-10">
                <div className="flex justify-between items-center">

                    <h1 className="text-xl font-bold text-black">دسته بندی محصولات</h1>

                    <Button onClick={() => setIsOpen(true)}>
                        <span>دسته بندی جدید</span>
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
                                        : categories
                                            ?.map((category, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/4'>{category.priority}</td>
                                                    <td className='p-1 py-3 text-center w-1/4'>{category.alt}</td>
                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <a href={imageBaseUrl + category.image} target="_blank">
                                                            <img className="w-28 mx-auto cursor-pointer" src={imageBaseUrl + category.image} alt={imageBaseUrl + category.alt} />
                                                        </a>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4 space-x-1'>
                                                        <Button onClick={() => {
                                                            setCategoryId(category._id)
                                                            setIsOpen(true)

                                                        }
                                                        }
                                                            className="size-6" size={"icon"}>
                                                            <Edit className="size-4" />
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button className="size-6" size={"icon"}>
                                                                    <Trash2 className="size-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent dir="rtl">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>آیا از حذف مطمئن هستید؟</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        بعد از عملیات حذف امکان بازگردانی آیتم حذف شده وجود ندارد.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>بازگشت</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => deleteCategory(category._id)}>تایید</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>



                                                    </td>

                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            {(categories?.length === 0 && !isLoading) && (
                                <p className='w-full text-center my-10'>چیزی برای نمایش وجود ندارد</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1 mt-4">
                    <Button onClick={() => {
                        if (pagination?.hasPrevPage) setPage(prev => prev - 1)
                    }}>قبلی</Button>
                    <Button onClick={() => {
                        if (pagination?.hasNextPage) setPage(prev => prev + 1)
                    }}>بعدی</Button>
                </div>
            </div>
            <Dialog
                open={isOpen}
                onOpenChange={() => {
                    setIsOpen(false)
                    setCategoryId(undefined)
                    setFormValue(INITIAL_FORM_VALUES)
                }}>

                <DialogContent dir="rtl" className="sm:max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>ایجاد دسته بندی</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <Label>نام دسته بندی فارسی</Label>
                            <Input
                                type="text"
                                value={formValue.name.fa}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        name: { ...prev.name, fa: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>نام دسته بندی انگلیسی</Label>
                            <Input
                                type="text"
                                value={formValue.name.en}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        name: { ...prev.name, en: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>نام دسته بندی عربی</Label>
                            <Input
                                type="text"
                                value={formValue.name.ar}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        name: { ...prev.name, ar: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>نام دسته بندی روسی</Label>
                            <Input
                                type="text"
                                value={formValue.name.ru}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        name: { ...prev.name, ru: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>توضیحات فارسی</Label>
                            <Textarea

                                value={formValue.description.fa}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        description: { ...prev.description, fa: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>توضیحات انگلیسی</Label>
                            <Textarea

                                value={formValue.description.en}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        description: { ...prev.description, en: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>توضیحات عربی</Label>
                            <Textarea

                                value={formValue.description.ar}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        description: { ...prev.description, ar: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>توضیحات روسی</Label>
                            <Textarea

                                value={formValue.description.ru}
                                onChange={(e) => {
                                    setFormValue((prev) => ({
                                        ...prev,
                                        description: { ...prev.description, ru: e.target.value },
                                    }))
                                }} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label>نام جایگزین عکس</Label>
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
                            <Label>سایز</Label>
                            <Input
                                type="text"
                                value={formValue.size}
                                onChange={(e) => {
                                    setFormValue(prev => ({
                                        ...prev,
                                        size: e.target.value
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
                            <Button onClick={() => openUploader()}>انتخاب فایل</Button>

                        </div>
                        {formValue.image && <div className="w-20 relative">
                            <img src={imageBaseUrl + formValue.image} alt="" />
                            <div
                                onClick={() => setFormValue(prev => ({ ...prev, image: "" }))}
                                className="absolute top-1 left-1 hover:scale-110 cursor-pointer">
                                <Trash2Icon className="size-4" />
                            </div>
                        </div>}

                    </div>
                    <DialogFooter className="sm:justify-end mt-4">
                        <Button onClick={() => {
                            setFormValue(INITIAL_FORM_VALUES)
                            setCategoryId(undefined)
                            setIsOpen(false)
                        }
                        } variant={"destructive"} type="button">بازگشت</Button>
                        <Button onClick={categoryId !== undefined ? updateCategory : createCategory} type="button">{categoryId !== undefined ? "به روزرسانی" : "ذخیره"}</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {isUploaderOpen &&
                <UploaderModal onSelect={(link) => { setFormValue(prev => ({ ...prev, image: link })) }} />
            }
        </>
    )
};

export default Category;
