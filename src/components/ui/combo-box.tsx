"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import CustomPopover from "@/components/ui/custom-popover";

// Define types for props
interface Option {
    label: string;
    value: string;
    disabled?: boolean;
    [key: string]: any;
}

interface ComboboxProps {
    options: Option[];
    value: string | null;
    onChange: (value: Option) => void;
    containerClassName?: string;
    optionListClassName?: string;
    className?: string;
    label?: string;
    error?: boolean;
    portal?: boolean;
    modalPopover?: boolean;
    disabled?: boolean;
}

export default function Combobox({
    options = [],
    value,
    onChange,
    containerClassName,
    optionListClassName,
    modalPopover = false,
    className,
    label,
    error = false,
    portal = false,
    disabled = false,
}: ComboboxProps) {
    const [open, setOpen] = useState(false);

    const trigger = (
        <button
            disabled={disabled}
            className={cn(
                "rounded-8 !text-12px disabled:text-secondary-foreground/60 disabled:border-secondary-foreground/10 flex w-full items-center justify-between border py-2.5 pr-3 pl-2 hover:bg-inherit disabled:cursor-not-allowed",
                `${error ? "border-red-700" : ""}`,
                className,
            )}
        >
            {value && value !== "" && value !== "undefined"
                ? options?.find((item) => item.value === value)?.label
                : (label ?? "انتخاب کنید")}
            <ChevronsUpDown className="mr-2 h-4 w-4 opacity-50" />
        </button>
    );

    const content = (
        <Command>
            <CommandInput placeholder="جستجو..." />
            <CommandList className="w-full">
                <ScrollArea
                    className={cn(
                        "scrollBarStyle max-h-60 min-w-full overflow-y-auto rounded-b-md",
                        optionListClassName,
                    )}
                >
                    <CommandEmpty>موردی یافت نشد!</CommandEmpty>
                    <CommandGroup className="">
                        {options.map((item, index) => (
                            <CommandItem
                                key={`${item.value}-${index}`}
                                onSelect={() => {
                                    onChange(item);
                                    setOpen(false);
                                }}
                                className={
                                    item?.disabled
                                        ? "border-foreground text-foreground rounded-none border-b-2 font-bold"
                                        : ""
                                }
                                disabled={item?.disabled ?? false}
                            >
                                <Check className={cn(value === item.value ? "opacity-100" : "opacity-0")} />
                                {item.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </ScrollArea>
            </CommandList>
        </Command>
    );

    return (
        <div className={cn(containerClassName)}>
            {portal ? (
                <CustomPopover trigger={trigger} open={open} onOpenChange={setOpen}>
                    {content}
                </CustomPopover>
            ) : (
                <Popover open={open} onOpenChange={setOpen} modal={modalPopover}>
                    <PopoverTrigger asChild>{trigger}</PopoverTrigger>
                    <PopoverContent className={cn("p-0", optionListClassName)}>{content}</PopoverContent>
                </Popover>
            )}
        </div>
    );
}
