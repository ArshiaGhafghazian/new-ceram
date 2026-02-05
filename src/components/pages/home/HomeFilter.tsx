"use client"
import React from "react";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "@/components/ui/combobox"


type CategoryType = {
    label: string
    value: string
}

const CATEGORIES: CategoryType[] = [
    { label: "استخری", value: "next" },
    { label: "چوبی", value: "sveltekit" },
    { label: "متری", value: "nuxt" },
]

const HomeFilter = () => {
    return (
        <div className='max-w-350 mx-auto px-8 md:px-16 mt-10'>
            <h2 className='text-2xl font-bold mb-3'>جستجوی محصولات</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className="flex flex-col gap-2">
                    <Label>نام:</Label>
                    <Input className="" />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>نام:</Label>
                    <Combobox items={CATEGORIES}>
                        <ComboboxInput placeholder="انتخاب کنید" />
                        <ComboboxContent>
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item.value} value={item.value}>
                                        {item.label}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>سایز:</Label>
                    <Input />
                </div>

            </div>
        </div>
    )
};

export default HomeFilter;
