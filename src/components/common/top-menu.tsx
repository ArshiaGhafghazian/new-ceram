/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useEffect, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import NavLink from "./NavLink";
import { CategoryType } from "@/types/category.type";
import { apiUrl, imageBaseUrl } from "@/configs/config";
import axios from "axios";
import { useTranslations } from "next-intl";
import { SubCategoryType } from "@/types/subcategory.type";

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
];
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
];

type TopMenuPropsType = {
  locale: "fa" | "ar" | "en" | "ru";
};

const TopMenu: React.FC<TopMenuPropsType> = ({ locale }) => {
  const t = useTranslations("Index");

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategoryType[]>([]);

  const getCategories = async () => {
    const url = apiUrl + "category";

    try {
      const res = await axios.get(url);
      console.log(res.data.data);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
      setCategories([]);
    }
  };
  const getSubCategories = async () => {
    const url = apiUrl + "subcategory";

    try {
      const res = await axios.get(url);
      console.log(res.data.data);
      setSubCategories(res.data.data);
    } catch (error) {
      console.log(error);
      setSubCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, []);

  return (
    <div className="fixed top-0 start-0  w-full flex flex-col bg-white/70 md:bg-gray-200/40 backdrop-blur-sm  shadow-md hover:bg-white/90 transition-all text-black z-2000">
      <div className="flex items-center justify-center">
        <Image
          width={200}
          height={200}
          className="w-16 md:w-32"
          src="/logo web.png"
          alt=""
        />
      </div>
      <div className="flex items-center justify-center my-2">
        <NavigationMenu dir="rtl">
          <NavigationMenuList>
            <NavigationMenuItem className="">
              <NavigationMenuLink
                asChild
                // className={navigationMenuTriggerStyle()}
              >
                <NavLink href="/">{t("menus.home")}</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem dir="rtl" className="md:flex">
              <NavigationMenuTrigger>
                {t("menus.products")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-100 gap-4 md:w-125 md:grid-cols-4 lg:w-150">
                  {categories.map((category) => (
                  
                    <div className="flex flex-col gap-2" key={category._id}>
                      <div className="flex flex-col gap-2">
                        <div className="w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            src={imageBaseUrl + category.image}
                            alt={category.alt}
                          />
                        </div>
                        <p className="text-secondary-foreground text-center font-semibold">
                          {category.name[locale]}
                        </p>
                        <p className="text-secondary-foreground text-center">
                          {" "}
                          {category.size}
                        </p>
                      </div>
                       <div
                       
                          className="flex flex-col gap-2 items-center justify-between px-4"
                        >
                          {subCategories
                            ?.filter((sub) => sub.category._id === category._id)
                            ?.map((subCategory, i) => (
                              <NavLink
                                key={`subcategory-${i + 1}`}
                                href={`/products?category=${category._id}&subcategory=${subCategory._id}`}
                              >
                                {subCategory.name[locale]}
                              </NavLink>
                            ))}
                        </div>
                    </div>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem dir="rtl" className="md:flex">
              <NavigationMenuTrigger>
                {t("menus.cataloge")}
              </NavigationMenuTrigger>
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
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink href="/">{t("menus.blog")}</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem dir="rtl" className="md:flex">
              <NavigationMenuTrigger>
                {t("menus.aboutUs")}
              </NavigationMenuTrigger>
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
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <NavLink href="/">{t("menus.virtualShowroom")}</NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                {" "}
                {t("menus.aboutUs")}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-40">
                  <ListItem href="/docs" title="   تماس با ما"></ListItem>
                  <ListItem
                    href="/docs/installation"
                    title=" فرم نظرسنجس"
                  ></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
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
  );
}
