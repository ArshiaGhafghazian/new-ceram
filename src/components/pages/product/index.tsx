"use client";
import { imageBaseUrl } from "@/configs/config";
import { ProductType } from "@/types/product.type";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

type ProductPropsType = {
  data: ProductType;
  locale: "fa" | "en" | "ar" | "ru";
};

const ProductPage: React.FC<ProductPropsType> = ({ data, locale }) => {
  const t = useTranslations("Index");

  const [pictureIndex, setPictureIndex] = useState(0);
  const [modal, setModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  const productsImages = [data.thumb, ...data.images];
  return (
    <>
      <div className="md:pt-45 px-8 md:px-16  max-w-350 mx-auto">
        <div className="flex flex-col-reverse md:grid md:grid-cols-[1fr_2fr] gap-20">
          <div className="flex flex-col gap-4">
            <img
              src={`${imageBaseUrl}/${productsImages[pictureIndex]}`}
              alt=""
              className="transition-all"
            />
            <div className="flex f gap-4">
              <p className="font-bold text-black">
                {t("pages.products.color")}:
              </p>
              <p>{data.color}</p>
            </div>

            <div className="flex flex-col gap-4">
              <p className="font-bold text-black">
                {t("pages.products.face")}:
              </p>

              <div className="flex gap-3 flex-wrap">
                {productsImages?.map((item, index) => (
                  <img
                    key={item}
                    src={`${imageBaseUrl}/${item}`}
                    alt={item}
                    className={`w-36 h-36 cursor-pointer transition-all ${index === pictureIndex ? "border-2 border-black " : ""}`}
                    onClick={() => setPictureIndex(index)}
                  />
                ))}
                {/*                             
                             <img src="/pics/products/single/CG BU 02.jpg" alt="" className="w-36 h-36" />
                             <img src="/pics/products/single/CG BU 05.jpg" alt="" className="w-36 h-36" />
                             <img src="/pics/products/single/CG BU 07.jpg" alt="" className="w-36 h-36" /> */}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-bold text-black">
                {t("pages.products.gall")}:
              </p>
              <div className="flex gap-3 overflow-x-auto">
                {data.gallery?.map((item, index) => (
                  <img
                    key={index}
                    src={`${imageBaseUrl}/${item}`}
                    alt="ax"
                    className="w-48 h-48"
                    onClick={() => {
                      setModalIndex(index);
                      setModal(true);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 border-b pb-2">
              <p className="font-bold text-black">
                {" "}
                {t("pages.products.productName")}:
              </p>
              <p>{data.name[locale]}</p>
            </div>

            <div className="flex gap-4">
              <p className="font-bold text-black">
                {t("pages.products.wdith")}:
              </p>
              <div className="flex gap-[1px]">
                <p className="border-e-2 pe-2">{data.size.width}</p>
                <p className="border-s-2 ps-2">{`cm ${data.size.cm} / ${data.size.inch} in`}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold text-black">
                {t("pages.products.desc")}:
              </h2>
              <p className="text-justify">{data.description[locale]}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">{t("pages.products.use")}:</p>
              <div className="flex gap-2">
                {data.use?.map((item, index) => (
                  <img
                    key={`product-use-${index}`}
                    src={`${imageBaseUrl}/${item.icon}`}
                    alt="ax"
                    className="w-9 h-9 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">
                {t("pages.products.char")}:
              </p>
              <div className="flex gap-2">
                {data.characteristics?.map((item, index) => (
                  <img
                    key={`product-characteristics-${index}`}
                    src={`${imageBaseUrl}/${item.icon}`}
                    alt="ax"
                    className="w-9 h-9 rounded-full"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-black">
                {t("pages.products.pack")}:
              </p>
              <table>
                <thead>
                  <tr>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon4.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>

                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon3.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>

                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon5.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon4.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>

                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon3.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon4.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon4.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon3.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon2.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                    <td className="border border-gray-800 w-[10%)]">
                      <img
                        src="/pics/products/icons/t-icon1.png"
                        alt=""
                        className="block mx-auto"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>متراژ پالت</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>متراژ کارتن</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>ضخامن</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>وزن پالت</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>وزن کارتن</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>تعداد در پالت</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>کارتن در پالت</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>تعداد در کارتن</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>سایز</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>پرس</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>61.2</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>0.36</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>9 mm</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>935 kg </span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>5.5 kg</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>2040</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>170</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>12</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>10 * 30 cm</span>
                    </td>
                    <td className="border border-gray-800 w-[10%)] text-center">
                      <span>ملودی</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={modal}
        onOpenChange={() => {
          setModal(false);
        }}
      >
        <DialogContent dir="rtl" className="sm:max-w-6xl">
          <DialogHeader>
            <DialogTitle>نمایش</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center">
            <img
              src={`${imageBaseUrl}/${data.gallery[modalIndex]}`}
              alt="ax"
              className="w-[300px] md:w-[420px]"
            />
          </div>
          {/* <DialogFooter className="sm:justify-end mt-4">
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
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductPage;
