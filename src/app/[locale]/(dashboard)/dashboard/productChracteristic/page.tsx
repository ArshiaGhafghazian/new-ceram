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
import Combobox from "@/components/ui/combo-box";
import { ProductUseType } from "@/types/productUse.type";


type FormValue = {
    name: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },


    icon: string,

}

const INITIAL_FORM_VALUES: FormValue = {
    name: { fa: "", en: "", ar: "", ru: "" },


    icon: "",



}

const Category = () => {
    const openUploader = useFileUploaderStore(state => state.openUploader)
    const isUploaderOpen = useFileUploaderStore(state => state.isUploaderOpen)
    const [isOpen, setIsOpen] = useState(false)
    const [productUseId, setProductUseId] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [productsUseList, setProductsUseList] = useState<ProductUseType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pagination, setPagination] = useState<Pagination>()
    const [formValue, setFormValue] = useState(INITIAL_FORM_VALUES)
   

    console.log("formmmmmmmmmm", formValue);


    const getProductsUse = async () => {

        const url = apiUrl + `productChracteristics?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log("getProductsUse::::",res.data.data);
            setProductsUseList(res.data.data)
            setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setProductsUseList([])

        }
        setIsLoading(false)
    }

    

    const getProductUse = async () => {
        const url = apiUrl + `productChracteristics/${productUseId}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            const response = res.data.data as ProductUseType
            
          
            setFormValue({
                icon: response.icon,
                name: response.name,
               
            })

        } catch (error) {
            console.log(error);


        }
        setIsLoading(false)
    }


    const createProductUse = async () => {
        const url = apiUrl + `productChracteristics`;
        setIsLoading(true)

        const httpBody = {
            name: formValue.name,
         
           
            icon: formValue.icon,
           
        }

        try {
            const res = await axios.post(url, httpBody, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت ایجاد شد")
            getProductsUse()
            setFormValue(INITIAL_FORM_VALUES)
            setProductUseId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")



        }
        setIsLoading(false)
    }
    const updateProductUse = async () => {
        const url = apiUrl + `productChracteristics/${productUseId}`;
        setIsLoading(true)
        const httpBody = {
            name: formValue.name,
            icon: formValue.icon,
        
        }
        try {
            const res = await axios.patch(url, httpBody, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت به روزرسانی شد")
            getProductsUse()
            setFormValue(INITIAL_FORM_VALUES)
            setProductUseId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")


        }
        setIsLoading(false)
    }

    const deleteProductUse = async (id: string) => {
        const url = apiUrl + "productChracteristics/" + id;
        setIsLoading(true)
        try {
            const res = await axios.delete(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            getProductsUse()
            toast.success("با موفقیت به حذف شد");

        } catch (error) {
            toast.error("خطایی رخ داده است");
            console.log(error);

        }
        setIsLoading(false)
    }

    useEffect(() => {
        getProductsUse()

    }, [page])

  

    useEffect(() => {
        if (productUseId !== undefined)
            getProductUse()
    }, [productUseId])

    return (
        <>
            <div className="max-w-450 mx-auto px-8 md:px-16 mt-10">
                <div className="flex justify-between items-center">

                    <h1 className="text-xl font-bold text-black">مشخصات محصولات</h1>

                    <Button onClick={() => setIsOpen(true)}>
                        <span> مشخصات محصولات جدید</span>
                        <Plus />
                    </Button>
                </div>
                <div className='mx-auto mt-6'>
                    <div>
                        <div className='overflow-x-auto rounded-lg shadow-md '>
                            <table className=' min-w-125 w-full bg-white  '>
                                <thead>
                                    <tr className='bg-zinc-300 text-xs md:text-sm text-black'>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/3'>نام</th>

                                        <th className='px-2 py-3 md:py-4 text-center w-1/3'>فایل</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/3'>عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isLoading
                                        ? Array(3)
                                            .fill(0)
                                            .map((_, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/3'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-4 w-12 mx-auto'></div>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/3'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-8 w-8 mx-auto'></div>
                                                    </td>

                                                    <td className='p-1 py-3 text-center w-1/3'>
                                                        <div className='animate-pulse bg-gray-300 rounded-lg h-4 w-24 mx-auto'></div>
                                                    </td>

                                                </tr>
                                            ))
                                        : productsUseList
                                            ?.map((category, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/3'>{category.name.fa}</td>

                                                    <td className='p-1 py-3 text-center w-1/3'>
                                                        <a href={imageBaseUrl + category.icon} target="_blank">
                                                            <img className="w-28 mx-auto cursor-pointer" src={imageBaseUrl + category.icon} alt={imageBaseUrl} />
                                                        </a>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/3 space-x-1'>
                                                        <Button onClick={() => {
                                                            setProductUseId(category._id)
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
                                                                    <AlertDialogAction onClick={() => deleteProductUse(category._id)}>تایید</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>



                                                    </td>

                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            {(productsUseList?.length === 0 && !isLoading) && (
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
                    setProductUseId(undefined)
                    setFormValue(INITIAL_FORM_VALUES)
                }}>

                <DialogContent dir="rtl" className="sm:max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>ایجاد مشخصات محصولات</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-4">
                            <Label>نام  فارسی</Label>
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
                            <Label>نام  انگلیسی</Label>
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
                            <Label>نام  عربی</Label>
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
                            <Label>نام  روسی</Label>
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
                            <Label>فایل:</Label>
                            <Button onClick={() => openUploader()}>انتخاب فایل</Button>

                        </div>
                        {formValue.icon && <div className="w-20 relative">
                            <img src={imageBaseUrl + formValue.icon} alt="" />
                            <div
                                onClick={() => setFormValue(prev => ({ ...prev, icon: "" }))}
                                className="absolute top-1 left-1 hover:scale-110 cursor-pointer">
                                <Trash2Icon className="size-4" />
                            </div>
                        </div>}

                    </div>
                    <DialogFooter className="sm:justify-end mt-4">
                        <Button onClick={() => {
                            setFormValue(INITIAL_FORM_VALUES)
                            setProductUseId(undefined)
                            setIsOpen(false)
                        }
                        } variant={"destructive"} type="button">بازگشت</Button>
                        <Button onClick={productUseId !== undefined ? updateProductUse : createProductUse} type="button">{productUseId !== undefined ? "به روزرسانی" : "ذخیره"}</Button>

                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {isUploaderOpen &&
                <UploaderModal onSelect={(link) => { setFormValue(prev => ({ ...prev, icon: link })) }} />
            }
        </>
    )
};

export default Category;
