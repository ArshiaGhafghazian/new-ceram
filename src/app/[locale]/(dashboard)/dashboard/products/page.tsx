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
import { MultiSelect } from "@/components/ui/multi-select";
import { ProductUseType } from "@/types/productUse.type";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { ProductType } from "@/types/product.type";


type FormValue = {
    name: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    size: string,
    description: {
        en: string,
        ar: string,
        ru: string,
        fa: string
    },
    image: string,
    alt: string,
    priority: string,
    category: { value: string, label: string }

}



const INITIAL_FORM_VALUES = {
    name: { fa: "", en: "", ar: "", ru: "" },
    description: { fa: "", en: "", ar: "", ru: "" },
    color: "",
    subCategory: { value: "", label: "" },
    use: [] as string[],
    characteristics: [] as string[],
    "packaging": {
        "palletSize": "",
        "palletWight": "",
        "palletCount": "",
        "cartonSize": "",
        "cartonWight": "",
        "cartonCount": "",
        "cartonInPalletCount": "",
        "press": "",
        "size": "",
        "width": ""
    },
    press: "",
    size: {
        width: "",
        inch: "",
        cm: "",
    },
    thumb: "",
    images: [] as string[],
    galleries: [] as string[],

    isPublic: false



}

const Products = () => {
    const openUploader = useFileUploaderStore(state => state.openUploader)
    const isUploaderOpen = useFileUploaderStore(state => state.isUploaderOpen)
    const [isOpen, setIsOpen] = useState(false)
    const [productId, setProductId] = useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const [subCategories, setSubCategories] = useState<CategoryType[]>([])
    const [page, setPage] = useState<number>(1)
    const [pagination, setPagination] = useState<Pagination>()
    const [formValue, setFormValue] = useState(INITIAL_FORM_VALUES)
    const [productsUseList, setProductsUseList] = useState<ProductUseType[]>([])
    const [productChracteristics, setProductChracteristics] = useState<ProductUseType[]>([])
    const [imageType, setImageType] = useState<"thumb" | "images" | "gallaries">("thumb")
    const [productList, setProductList] = useState<ProductType[]>([])

    console.log("productList", productList);



    const [step, setStep] = useState<"general" | "galleries" | "dependency" | "final">("general")

    useEffect(() => {
        setStep("general")
    }, [isOpen])

    console.log("formmmmmmmmmm", formValue);

    const getProductsUse = async () => {

        const url = apiUrl + `productUse?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setProductsUseList(res.data.data)
            // setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setProductsUseList([])

        }
        setIsLoading(false)
    }
    const getProductCharacteristics = async () => {

        const url = apiUrl + `productChracteristics?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setProductChracteristics(res.data.data)
            // setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setProductChracteristics([])

        }
        setIsLoading(false)
    }


    const getProducts = async () => {
        const url = apiUrl + `products?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setProductList(res.data.data)
            setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setSubCategories([])

        }
        setIsLoading(false)
    }
    const getSubCategories = async () => {
        const url = apiUrl + `subcategory?page=${page}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            console.log(res.data.data);
            setSubCategories(res.data.data)
            // setPagination(res.data.pagination)

        } catch (error) {
            console.log(error);
            setSubCategories([])

        }
        setIsLoading(false)
    }



    const getProduct = async () => {
        const url = apiUrl + `products/${productId}`;
        setIsLoading(true)
        try {
            const res = await axios.get(url)
            const response = res.data.data as ProductType
            console.log("subCategories", subCategories);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            let foundedCategory: CategoryType | undefined

            if (subCategories.length) {
                foundedCategory = subCategories.find(cat => cat._id === response.subcategory?._id)
            }


            const foundedUse = response.use.map(use => use._id)
            const foundedChar = response.characteristics.map(char => char._id)

            console.log("foundedCategory:", foundedCategory);

            setFormValue(prev => ({
                ...prev,
                color: response.color,
                name: response.name,
                description: response.description,
                galleries: response.gallery,
                images: response.images,
                thumb: response.thumb,
                isPublic: response.isPublic,
                packaging: response.packaging,
                size: response.size,
                subCategory: { label: foundedCategory?.name?.fa || "", value: foundedCategory?._id || "" },
                use: foundedUse,
                characteristics: foundedChar,

            }))

        } catch (error) {
            console.log(error);


        }
        setIsLoading(false)
    }


    const createProduct = async () => {
        const url = apiUrl + `products`;
        setIsLoading(true)

        const httpBody = {
            name: formValue.name,
            description: formValue.description,
            subcategory: formValue.subCategory.value,
            color: formValue.color,
            size: formValue.size,
            packaging: formValue.packaging,
            use: formValue.use,
            characteristics: formValue.characteristics,
            isPublic: formValue.isPublic,
            images: formValue.images,
            thumb: formValue.thumb,
            galleries: formValue.galleries,


        }

        try {
            const res = await axios.post(url, httpBody, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت ایجاد شد")
            getProducts()
            setFormValue(INITIAL_FORM_VALUES)
            setProductId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")



        }
        setIsLoading(false)
    }
    const updateProducts = async () => {
        const url = apiUrl + `products/${productId}`;
        setIsLoading(true)
        const httpBody = {
            name: formValue.name,
            description: formValue.description,
            subcategory: formValue.subCategory.value,
            color: formValue.color,
            size: formValue.size,
            packaging: formValue.packaging,
            use: formValue.use,
            characteristics: formValue.characteristics,
            isPublic: formValue.isPublic,
            images: formValue.images,
            thumb: formValue.thumb,
            galleries: formValue.galleries,


        }
        try {
            const res = await axios.patch(url, httpBody, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            console.log(res.data.data);
            setIsOpen(false)
            toast.success("با موفقیت به روزرسانی شد")
            getProducts()
            setFormValue(INITIAL_FORM_VALUES)
            setProductId(undefined)

        } catch (error) {
            console.log(error);
            toast.error("خطایی رخ داده است")


        }
        setIsLoading(false)
    }

    const deleteProduct = async (id: string) => {
        const url = apiUrl + "products/" + id;
        setIsLoading(true)
        try {
            const res = await axios.delete(url, { headers: { Authorization: `Bearer ${sessionStorage.getItem("session")}` } })
            getProducts()
            toast.success("با موفقیت به حذف شد");

        } catch (error) {
            toast.error("خطایی رخ داده است");
            console.log(error);

        }
        setIsLoading(false)
    }

    useEffect(() => {

        getProducts()

    }, [page])

    useEffect(() => {
        getSubCategories()

        getProductsUse()
        getProductCharacteristics()
    }, [])

    useEffect(() => {
        if (productId !== undefined)
            getProduct()
    }, [productId])

    return (
        <>
            <div className="max-w-450 mx-auto px-8 md:px-16 mt-10">
                <div className="flex justify-between items-center">

                    <h1 className="text-xl font-bold text-black">محصولات</h1>

                    <Button onClick={() => setIsOpen(true)}>
                        <span> محصولات جدید</span>
                        <Plus />
                    </Button>
                </div>
                <div className='mx-auto mt-6'>
                    <div>
                        <div className='overflow-x-auto rounded-lg shadow-md '>
                            <table className=' min-w-125 w-full bg-white  '>
                                <thead>
                                    <tr className='bg-zinc-300 text-xs md:text-sm text-black'>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>نام محصول</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>تصویر</th>
                                        <th className='px-2 py-3 md:py-4 text-center w-1/4'>مربوط به</th>

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
                                        : productList
                                            ?.map((product, i) => (
                                                <tr
                                                    key={i}
                                                    className='odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base'
                                                >
                                                    <td className='p-1 py-3 text-center w-1/4'>{product.name.fa}</td>

                                                    <td className='p-1 py-3 text-center w-1/4'>
                                                        <a href={imageBaseUrl + product.thumb} target="_blank">
                                                            <img className="w-28 mx-auto cursor-pointer" src={imageBaseUrl + product.thumb} alt={imageBaseUrl + product.name.fa} />
                                                        </a>
                                                    </td>
                                                    <td className='p-1 py-3 text-center w-1/4'>{product?.subcategory?.name?.fa}</td>
                                                    <td className='p-1 py-3 text-center w-1/4 space-x-1'>
                                                        <Button onClick={() => {
                                                            setProductId(product._id)
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
                                                                    <AlertDialogAction onClick={() => deleteProduct(product._id)}>تایید</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>



                                                    </td>

                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                            {(productList?.length === 0 && !isLoading) && (
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
                    setProductId(undefined)
                    setFormValue(INITIAL_FORM_VALUES)
                }}>

                <DialogContent dir="rtl" className="sm:max-w-6xl">
                    <DialogHeader>
                        <DialogTitle>ایجاد محصول</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {step === "general" && <>
                            <div className="flex flex-col gap-4">
                                <Label>نام  محصول فارسی</Label>
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
                                <Label>نام  محصول انگلیسی</Label>
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
                                <Label>نام  محصول عربی</Label>
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
                                <Label>نام  محصول روسی</Label>
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
                        </>}
                        {step === "final" && <>
                            <div className="flex flex-col gap-4">
                                <Label>متراژ پالت</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.palletSize}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, palletSize: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>وزن پالت</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.palletWight}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, palletWight: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>تعداد در پالت</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.palletCount}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, palletCount: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>ابعاد کارتون</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.cartonSize}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, cartonSize: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>وزن کارتون</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.cartonWight}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, cartonWight: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>تعداد کارتون</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.cartonCount}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, cartonCount: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>تعداد کارتون در پالت</Label>
                                <Input
                                    type="text"
                                    value={formValue.packaging.cartonInPalletCount}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            packaging: { ...prev.packaging, cartonInPalletCount: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>ضخامت mm</Label>
                                <Input
                                    type="text"
                                    value={formValue.size.width}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, width: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>ضخامت cm</Label>
                                <Input
                                    type="text"
                                    value={formValue.size.cm}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, cm: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>ضخامت inch</Label>
                                <Input
                                    type="text"
                                    value={formValue.size.inch}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            size: { ...prev.size, inch: e.target.value },
                                        }))
                                    }} />
                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>پرس</Label>
                                <Input
                                    type="text"
                                    value={formValue.press}
                                    onChange={(e) => {
                                        setFormValue((prev) => ({
                                            ...prev,
                                            press: e.target.value,
                                        }))
                                    }} />
                            </div>
                            <div style={{ direction: "ltr" }} className="flex flex-col gap-4 items-end">
                                <Label>نمایش در صفحه صالی</Label>
                                <Switch checked={formValue.isPublic} onCheckedChange={(checked) => setFormValue(prev => ({ ...prev, isPublic: checked as boolean }))} />

                            </div>


                        </>}

                        {step === "dependency" && <>
                            <div className="flex flex-col gap-4">
                                <Label>نام  دسته بندی:</Label>
                                <Combobox
                                    value={formValue.subCategory.value}
                                    options={subCategories.map((sub) => ({ label: sub.name.fa, value: sub._id }))}
                                    onChange={(val) => { setFormValue(prev => ({ ...prev, subCategory: val })) }} />

                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>محل استفاده محصول</Label>
                                <MultiSelect
                                    className="w-full"

                                    value={formValue.use}
                                    options={productsUseList.map((prodUse) => ({ label: prodUse.name.fa, value: prodUse._id })) || []}
                                    onValueChange={(val) => { setFormValue(prev => ({ ...prev, use: val })) }} />

                            </div>
                            <div className="flex flex-col gap-4">
                                <Label>مشخصات محصول

                                </Label>
                                <MultiSelect
                                    className="w-full"

                                    value={formValue.characteristics}
                                    options={productChracteristics.map((char) => ({ label: char.name.fa, value: char._id })) || []}
                                    onValueChange={(val) => { setFormValue(prev => ({ ...prev, characteristics: val })) }} />

                            </div>
                        </>}
                        {step === "galleries" && <>
                            <div className="col-span-full space-y-2">
                                <div className="flex flex-col gap-4">
                                    <Label>عکس نمایه:</Label>
                                    <Button onClick={() => {
                                        setImageType("thumb")
                                        openUploader()
                                    }}>انتخاب فایل</Button>

                                </div>
                                {formValue.thumb && <div className="w-40 relative border border-primary rounded-lg">
                                    <img src={imageBaseUrl + formValue.thumb} alt="" />
                                    <div
                                        onClick={() => setFormValue(prev => ({ ...prev, thumb: "" }))}
                                        className="absolute top-1 left-1 hover:scale-110 cursor-pointer">
                                        <Trash2Icon className="size-4" />
                                    </div>
                                </div>}
                            </div>
                            <div className="col-span-full space-y-2">
                                <div className="flex flex-col gap-4">
                                    <Label>عکس های محصول:</Label>
                                    <Button onClick={() => {
                                        setImageType("images")
                                        openUploader()
                                    }}>انتخاب فایل</Button>

                                </div>
                                {formValue.images.length > 0 && <div className="flex gap-2 flex-wrap">
                                    {formValue.images.map((img, index) => (
                                        <div key={`image-${index}`} className="w-40 relative border border-primary rounded-lg">
                                            <img src={imageBaseUrl + img} alt="" />
                                            <div
                                                onClick={() => {
                                                    const allImages = [...formValue.images]


                                                    const filterdImages = allImages.filter(image => image !== img)

                                                    setFormValue(prev => ({ ...prev, images: filterdImages }))
                                                }}
                                                className="absolute top-1 left-1 hover:scale-110 cursor-pointer">
                                                <Trash2Icon className="size-4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                }
                            </div>
                            <div className="col-span-full space-y-2">
                                <div className="flex flex-col gap-4">
                                    <Label>عکس های گالری:</Label>
                                    <Button onClick={() => {
                                        setImageType("gallaries")
                                        openUploader()
                                    }}>انتخاب فایل</Button>

                                </div>
                                {formValue.galleries.length > 0 && <div className="flex gap-2 flex-wrap">
                                    {formValue.galleries.map((img, index) => (
                                        <div key={`image-${index}`} className="w-40 relative border border-primary rounded-lg">
                                            <img src={imageBaseUrl + img} alt="" />
                                            <div
                                                onClick={() => {
                                                    const allImages = [...formValue.galleries]


                                                    const filterdImages = allImages.filter(image => image !== img)

                                                    setFormValue(prev => ({ ...prev, galleries: filterdImages }))
                                                }}
                                                className="absolute top-1 left-1 hover:scale-110 cursor-pointer">
                                                <Trash2Icon className="size-4" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                }
                            </div>

                        </>}


                    </div>
                    <DialogFooter className="sm:justify-end mt-4">
                        {step === "general" && <>
                            <Button onClick={() => {
                                setFormValue(INITIAL_FORM_VALUES)
                                setProductId(undefined)
                                setIsOpen(false)
                            }
                            } variant={"destructive"} type="button">بستن</Button>
                            <Button onClick={() => setStep("dependency")} type="button">مرحله بعد</Button>
                        </>}
                        {step === "dependency" && <>
                            <Button onClick={() => {
                                setStep("general")
                            }
                            } variant={"destructive"} type="button">بازگشت</Button>
                            <Button onClick={() => setStep("galleries")} type="button">مرحله بعد</Button>
                        </>}
                        {step === "galleries" && <>
                            <Button onClick={() => {
                                setStep("dependency")
                            }
                            } variant={"destructive"} type="button">بازگشت</Button>
                            <Button onClick={() => setStep("final")} type="button">مرحله بعد</Button>
                        </>}
                        {step === "final" && <>
                            <Button onClick={() => {
                                setStep("galleries")
                            }
                            } variant={"destructive"} type="button">بازگشت</Button>
                            <Button onClick={productId !== undefined ? updateProducts : createProduct} type="button">{productId !== undefined ? "به روزرسانی" : "ذخیره"}</Button>
                        </>}
                        {/* <Button onClick={() => {
                            setFormValue(INITIAL_FORM_VALUES)
                            setProductId(undefined)
                            setIsOpen(false)
                        }
                        } variant={"destructive"} type="button">بازگشت</Button>
                        <Button onClick={productId !== undefined ? updateProducts : createProduct} type="button">{productId !== undefined ? "به روزرسانی" : "ذخیره"}</Button> */}

                    </DialogFooter>
                </DialogContent>
            </Dialog>
            {isUploaderOpen &&
                <UploaderModal onSelect={(link) => {
                    switch (imageType) {
                        case "thumb":

                            setFormValue(prev => ({ ...prev, thumb: link }))
                            break
                        case "images":

                            const allImages = [...formValue.images]
                            allImages.push(link)

                            setFormValue(prev => ({ ...prev, images: allImages }))
                            break
                        case "gallaries":
                            const allGallaries = [...formValue.galleries]
                            allGallaries.push(link)

                            setFormValue(prev => ({ ...prev, galleries: allGallaries }))
                            break


                    }

                }
                } />
            }
        </>
    )
};

export default Products;
