"use client"
import React, { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import NavLink from "@/components/common/NavLink";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SideMenu = () => {
    const [open, setOpen] = useState<boolean>(false)
    const pathname = usePathname();
    const getLinkClass = (path: string) => {
        const correctedPathname = pathname.split("/")
        const correctedPath = path.split("/")
        const final = correctedPathname[correctedPathname.length - 1]
        const finalPath = correctedPath[correctedPath.length - 1]
        const isActive = final === finalPath; // Check if the link is active
        return `${isActive ? "bg-primary text-white" : ""
            } hover:bg-primary  hover:text-white p-3 font-semibold text-sm flex items-center gap-2 transition-all duration-[100ms] ${!open ? "justify-center" : ""
            }`;
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOpen(false)
    }, [pathname])

    return (
        <>
            <Button onClick={() => setOpen(true)} variant="secondary" size="icon"><Menu className='size-4' /></Button>
            <Drawer open={open} onOpenChange={setOpen} direction="right">

                <DrawerContent>
                    <DrawerHeader>
                        <div className="flex justify-center">
                            <Image src="/logo web.png" alt="" className='w-18 md:w-32 ' width={200} height={200} />
                        </div>
                    </DrawerHeader>
                    <div className="no-scrollbar overflow-y-auto px-4">
                        <menu className={` transition-all relative`}>
                            <ul className='flex flex-col  '>

                                <NavLink href='/' className={getLinkClass("/")}>
                                    <li>صفحه اصلی</li>
                                </NavLink>
                                <NavLink href='/dashboard' className={getLinkClass("/dashboard")}>

                                    <li>داشبورد</li>
                                </NavLink>
                                <NavLink href='/dashboard/sliders' className={getLinkClass("/dashboard/sliders")}>
                                    <li>اسلایدرها</li>
                                </NavLink>
                                <NavLink href='/dashboard/category' className={getLinkClass("/dashboard/category")}>
                                    <li>دسته بندی محصولات</li>
                                </NavLink>
                                <NavLink href='/dashboard/subcategory' className={getLinkClass("/dashboard/subcategory")}>

                                    {<li>زیر دسته بندی محصولات</li>}
                                </NavLink>
                                  <NavLink href='/dashboard/productUse' className={getLinkClass("/dashboard/productUse")}>

                                    <li>محل استفاده محصولات</li>
                                </NavLink>
                                 <NavLink href='/dashboard/productChracteristic' className={getLinkClass("/dashboard/productChracteristic")}>

                                <li>مشخصات محصولات</li>
                                </NavLink>
                                {/* <NavLink href='/dashboard/blog' className={getLinkClass("/dashboard/blog")}>

                    {open && <li>بلاگ</li>}
                </NavLink> */}
                                {/* <NavLink href='/dashboard/general' className={getLinkClass("/dashboard/general")}>

                    {open && <li>تنظیمات کلی</li>}
                </NavLink> */}
                                {/* <NavLink href='/dashboard/category' className={getLinkClass("/dashboard/category")}>

                                    {open && <li>دسته بندی محصولات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/subcategory' className={getLinkClass("/dashboard/subcategory")}>

                                    {open && <li>زیر دسته بندی محصولات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/productUse' className={getLinkClass("/dashboard/productUse")}>

                                    {open && <li>محل استفاده محصولات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/productChracteristic' className={getLinkClass("/dashboard/productChracteristic")}>

                                    {open && <li>مشخصات محصولات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/cataloge' className={getLinkClass("/dashboard/cataloge")}>

                                    {open && <li>کاتالوگ ها</li>}
                                </NavLink>
                                <NavLink href='/dashboard/products' className={getLinkClass("/dashboard/products")}>

                                    {open && <li>محصولات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/about-us' className={getLinkClass("/dashboard/about-us")}>

                                    {open && <li>درباره ما</li>}
                                </NavLink> */}

                                {/* <NavLink href='/dashboard/mission' className={getLinkClass("/dashboard/mission")}>

                    {open && <li>ماموریت ها</li>}
                </NavLink> */}
                                {/* <NavLink href='/dashboard/shareholders' className={getLinkClass("/dashboard/shareholders")}>

                    {open && <li>سهامداران</li>}
                </NavLink> */}
                                {/* <NavLink href='/dashboard/board-of-directors' className={getLinkClass("/dashboard/board-of-directors")}>

                                    {open && <li>هیئت مدیره</li>}
                                </NavLink>
                                <NavLink href='/dashboard/achievments' className={getLinkClass("/dashboard/achievments")}>

                                    {open && <li>افتخارات</li>}
                                </NavLink>
                                <NavLink href='/dashboard/licence' className={getLinkClass("/dashboard/licence")}>

                                    {open && <li>گواهینامه ها</li>}
                                </NavLink>
                                <NavLink href='/dashboard/committe' className={getLinkClass("/dashboard/committe")}>

                                    {open && <li>کمیته ها</li>}
                                </NavLink>
                                <NavLink href='/dashboard/customers' className={getLinkClass("/dashboard/customers")}>

                                    {open && <li>مشتری ها</li>}
                                </NavLink> */}
                                {/* <NavLink href='/dashboard/surveys' className={getLinkClass("/dashboard/surveys")}>

                    {open && <li>نظرسنجی</li>}
                </NavLink> */}

                                {/* <NavLink href='/dashboard/surveyQuestion' className={getLinkClass("/dashboard/surveyQuestion")}>

                    {open && <li>سوالات نظرسنجی</li>}
                </NavLink> */}

                                <li
                                    onClick={() => {
                                        localStorage.removeItem("token");
                                        window.location.replace("/");
                                    }}
                                    className={`hover:bg-primary hover:text-primary-content p-3 font-semibold text-sm flex items-center gap-2 cursor-pointer ${!open ? "justify-center" : ""
                                        }`}
                                >
                                    {/* <IconLogout width='26' height='26' viewBox='0 0 24  24 ' strokeWidth={1} /> */}
                                    <span>خروج</span>
                                </li>
                            </ul>
                        </menu>
                    </div>
                    {/* <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>

        </>
    )
};

export default SideMenu;
