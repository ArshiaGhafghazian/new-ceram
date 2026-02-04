"use client"
import React from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Image from "next/image";

const TopMenu = () => {
    return <div className="fixed top-0 start-0 h-20 w-full flex flex-col bg-white/70 md:bg-gray-200/40 backdrop-blur-sm  shadow-md hover:bg-white/90 transition-all text-black z-2000" >
        <div className="flex items-center justify-center">
            <Image width={200} height={200} className='w-16 md:w-32' src="/logo web.png" alt="" />
        </div>
    </div>;
};

export default TopMenu;
