/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
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
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Pagination } from "@/types/api/pagination.type";
import toast from "react-hot-toast";
import UploaderModal from "@/components/common/uploader-modal";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CatalogeType } from "@/types/cataloge.type";
import Combobox from "@/components/ui/combo-box";

const INITIAL_FORM_VALUES: Omit<CatalogeType, "_id" | "type"> & {
  type: { label: string; value: string };
} = {
  name: { fa: "", en: "", ar: "", ru: "" },
  type: { label: "دیجیتال", value: "digital" },
  file: "",
  url: "",
  cover: "",
};

const Category = () => {
  const openUploader = useFileUploaderStore((state) => state.openUploader);
  const isUploaderOpen = useFileUploaderStore((state) => state.isUploaderOpen);
  const [isOpen, setIsOpen] = useState(false);
  const [catalogeId, setCatalogeId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [cataloges, setCataloges] = useState<CatalogeType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<Pagination>();
  const [formValue, setFormValue] = useState(INITIAL_FORM_VALUES);
  const [fileType, setFileType] = useState("");

  console.log("formValue", formValue);

  const getCataloges = async () => {
    const url = apiUrl + `cataloge?page=${page}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      console.log(res.data.data);
      setCataloges(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.log(error);
      setCataloges([]);
    }
    setIsLoading(false);
  };
  const getCataloge = async () => {
    const url = apiUrl + `cataloge/${catalogeId}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      const response = res.data.data as CatalogeType;
      
      setFormValue({
        name: response.name,
        cover: response.cover,
        file: response.file || "",
        type: response.type === "digital" ? { label: "دیجیتال", value: "digital" } : { label: "اسمارت", value: "smart" },
        url: response.url || "",
      });
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const createCataloge = async () => {
    const url = apiUrl + `cataloge`;
    const httpBody = {
      name: formValue.name,
      cover: formValue.cover,
      file: formValue.file,
      type: formValue.type.value,
      url: formValue.url,
    };
    setIsLoading(true);
    try {
      const res = await axios.post(url, httpBody, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session")}`,
        },
      });
      console.log(res.data.data);
      setIsOpen(false);
      toast.success("با موفقیت ایجاد شد");
      getCataloges();
      setFormValue(INITIAL_FORM_VALUES);
      setCatalogeId(undefined);
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است");
    }
    setIsLoading(false);
  };
  const updateCataloge = async () => {
    const url = apiUrl + `cataloge/${catalogeId}`;
     const httpBody = {
      name: formValue.name,
      cover: formValue.cover,
      file: formValue.file,
      type: formValue.type.value,
      url: formValue.url,
    };
    setIsLoading(true);
    try {
      const res = await axios.patch(url, httpBody, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session")}`,
        },
      });
      console.log(res.data.data);
      setIsOpen(false);
      toast.success("با موفقیت به روزرسانی شد");
      getCataloges();
      setFormValue(INITIAL_FORM_VALUES);
      setCatalogeId(undefined);
    } catch (error) {
      console.log(error);
      toast.error("خطایی رخ داده است");
    }
    setIsLoading(false);
  };

  const deleteCataloge = async (id: string) => {
    const url = apiUrl + "cataloge/" + id;
    setIsLoading(true);
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("session")}`,
        },
      });
      getCataloges();
      toast.success("با موفقیت به حذف شد");
    } catch (error) {
      toast.error("خطایی رخ داده است");
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCataloges();
  }, [page]);

  useEffect(() => {
    if (catalogeId !== undefined) getCataloge();
  }, [catalogeId]);

  return (
    <>
      <div className="max-w-450 mx-auto px-8 md:px-16 mt-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-black">کاتالوگ ها</h1>

          <Button onClick={() => setIsOpen(true)}>
            <span>کاتالوگ جدید</span>
            <Plus />
          </Button>
        </div>
        <div className="mx-auto mt-6">
          <div>
            <div className="overflow-x-auto rounded-lg shadow-md ">
              <table className=" min-w-125 w-full bg-white  ">
                <thead>
                  <tr className='bg-zinc-300 text-xs md:text-sm text-black'>
                    <th className='px-2 py-3 md:py-4 text-center w-1/3'>نام</th>
                    <th className='px-2 py-3 md:py-4 text-center w-1/3'>نوع</th>

                    <th className='px-2 py-3 md:py-4 text-center w-1/3'>عملیات</th>
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
                    : cataloges?.map((cat, i) => (
                      <tr
                        key={i}
                        className="odd:bg-gray-100 even:bg-gray-200 text-xs md:text-base"
                      >
                        <td className='p-1 py-3 text-center w-1/3'>{cat.name.fa}</td>
                        <td className='p-1 py-3 text-center w-1/3'>{cat.type}</td>

                       
                        <td className="p-1 py-3 text-center w-1/4 space-x-1">
                          <Button
                            onClick={() => {
                              setCatalogeId(cat._id);
                              setIsOpen(true);
                            }}
                            className="size-6"
                            size={"icon"}
                          >
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
                                <AlertDialogTitle>
                                  آیا از حذف مطمئن هستید؟
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  بعد از عملیات حذف امکان بازگردانی آیتم حذف
                                  شده وجود ندارد.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>بازگشت</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteCataloge(cat._id)}
                                >
                                  تایید
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {cataloges?.length === 0 && !isLoading && (
                <p className="w-full text-center my-10">
                  چیزی برای نمایش وجود ندارد
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-1 mt-4">
          <Button
            onClick={() => {
              if (pagination?.hasPrevPage) setPage((prev) => prev - 1);
            }}
          >
            قبلی
          </Button>
          <Button
            onClick={() => {
              if (pagination?.hasNextPage) setPage((prev) => prev + 1);
            }}
          >
            بعدی
          </Button>
        </div>
      </div>
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(false);
          setCatalogeId(undefined);
          setFormValue(INITIAL_FORM_VALUES);
        }}
      >
        <DialogContent dir="rtl" className="sm:max-w-6xl">
          <DialogHeader>
            <DialogTitle>ایجاد کاتالوگ</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <Label>نام کاتالوگ فارسی</Label>
              <Input
                type="text"
                value={formValue.name.fa}
                onChange={(e) => {
                  setFormValue((prev) => ({
                    ...prev,
                    name: { ...prev.name, fa: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>نام کاتالوگ انگلیسی</Label>
              <Input
                type="text"
                value={formValue.name.en}
                onChange={(e) => {
                  setFormValue((prev) => ({
                    ...prev,
                    name: { ...prev.name, en: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>نام کاتالوگ عربی</Label>
              <Input
                type="text"
                value={formValue.name.ar}
                onChange={(e) => {
                  setFormValue((prev) => ({
                    ...prev,
                    name: { ...prev.name, ar: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>نام کاتالوگ روسی</Label>
              <Input
                type="text"
                value={formValue.name.ru}
                onChange={(e) => {
                  setFormValue((prev) => ({
                    ...prev,
                    name: { ...prev.name, ru: e.target.value },
                  }));
                }}
              />
            </div>
            <div className="flex flex-col gap-4">
              <Label>نوع کاتالوگ</Label>
              <Combobox
                options={[
                  { label: "دیجیتال", value: "digital" },
                  { label: "اسمارت", value: "smart" },
                ]}
                value={formValue.type.value}
                onChange={(newVal) =>
                  setFormValue((prev) => ({ ...prev, type: newVal }))
                }
              />
            </div>

            <div className="col-span-full ">
              <div className="flex flex-col gap-4">
                <Label>کاور:</Label>
                <Button
                  onClick={() => {
                    setFileType("cover");
                    openUploader();
                  }}
                >
                  انتخاب کاور
                </Button>
                {formValue.cover && (
                  <div className="w-60 relative ">
                    <img src={imageBaseUrl + formValue.cover} alt="" />
                    <div
                      onClick={() =>
                        setFormValue((prev) => ({ ...prev, cover: "" }))
                      }
                      className="absolute top-1 left-1 hover:scale-110 cursor-pointer bg-red-600"
                    >
                      <Trash2Icon className="size-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {formValue.type.value === "digital" && (
              <div className="col-span-full ">
                <div className="flex flex-col gap-4">
                  <Label>فایل:</Label>
                  <Button
                    onClick={() => {
                      setFileType("file");
                      openUploader();
                    }}
                  >
                    انتخاب فایل
                  </Button>
                  {formValue.file && (
                    <div className="w-60 relative">
                      <img src={imageBaseUrl + formValue?.file} alt="" />
                      <div
                        onClick={() =>
                          setFormValue((prev) => ({ ...prev, file: "" }))
                        }
                        className="absolute top-1 left-1 hover:scale-110 cursor-pointer bg-red-600"
                      >
                        <Trash2Icon className="size-4" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {formValue.type.value === "smart" && (
              <div className="flex flex-col gap-4">
                <Label>آدرس فایل</Label>
                <Input
                  type="text"
                  value={formValue.url}
                  onChange={(e) => {
                    setFormValue((prev) => ({
                      ...prev,
                      url: e.target.value,
                    }));
                  }}
                />
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              onClick={() => {
                setFormValue(INITIAL_FORM_VALUES);
                setCatalogeId(undefined);
                setIsOpen(false);
              }}
              variant={"destructive"}
              type="button"
            >
              بازگشت
            </Button>
            <Button
              onClick={
                catalogeId !== undefined ? updateCataloge : createCataloge
              }
              type="button"
            >
              {catalogeId !== undefined ? "به روزرسانی" : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {isUploaderOpen && (
        <UploaderModal
          onSelect={(link) => {
            if (fileType === "cover") {
              setFormValue((prev) => ({ ...prev, cover: link }));
            } else {
              setFormValue((prev) => ({ ...prev, file: link }));
            }
          }}
        />
      )}
    </>
  );
};

export default Category;
