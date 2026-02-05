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
import NavLink from "./NavLink";

const ABOUT_US: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]
const CATALOGS: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },

]

const TopMenu = () => {
    return (
        <div className="fixed top-0 start-0  w-full flex flex-col bg-white/70 md:bg-gray-200/40 backdrop-blur-sm  shadow-md hover:bg-white/90 transition-all text-black z-2000" >
            <div className="flex items-center justify-center">
                <Image width={200} height={200} className='w-16 md:w-32' src="/logo web.png" alt="" />
            </div>
            <div className="flex items-center justify-center my-2">
                <NavigationMenu dir="rtl">
                    <NavigationMenuList>
                        <NavigationMenuItem className="">
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <NavLink href="/">خانه</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem dir="rtl" className="md:flex">
                            <NavigationMenuTrigger>محصولات</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                    {CATALOGS.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem dir="rtl" className="md:flex">
                            <NavigationMenuTrigger>کاتالوگ</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                    {CATALOGS.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem className="">
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <NavLink href="/">وبلاگ</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem dir="rtl" className="md:flex">
                            <NavigationMenuTrigger>درباره ما</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150">
                                    {ABOUT_US.map((component) => (
                                        <ListItem
                                            key={component.title}
                                            title={component.title}
                                            href={component.href}
                                        >
                                            {component.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="">
                            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                <NavLink href="/">تور مجازی</NavLink>
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>ارتباط با ما</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="w-40">
                                    <ListItem href="/docs" title="   تماس با ما">
                                    </ListItem>
                                    <ListItem href="/docs/installation" title=" فرم نظرسنجس">
                                    </ListItem>

                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
};

export default TopMenu;


function ListItem({
    title,
    children,
    href,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <NavLink href={href}>
                    <div className="flex flex-col gap-1 text-sm">
                        <div className="leading-none font-medium">{title}</div>
                        <div className="text-muted-foreground line-clamp-2">{children}</div>
                    </div>
                </NavLink>
            </NavigationMenuLink>
        </li>
    )
}