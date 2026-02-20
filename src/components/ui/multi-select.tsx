import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon, XCircle, ChevronDown, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

import CustomPopover from "@/components/ui/custom-popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { FloatingLabel } from "./FloatingLabelInput";

const multiSelectVariants = cva(
    "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
    {
        variants: {
            variant: {
                default: " text-foreground bg-card hover:bg-card/80",
                secondary: " bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive: " bg-destructive text-destructive-foreground hover:bg-destructive/80",
                inverted: "inverted",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

interface MultiSelectProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof multiSelectVariants> {
    options: {
        label: string;
        value: string;
        icon?: React.ComponentType<{ className?: string }>;
        disabled?: boolean;
    }[];
    onValueChange: (value: string[]) => void;
    value?: string[];
    defaultValue?: string[];
    placeholder?: string;
    animation?: number;
    maxCount?: number;
    modalPopover?: boolean;
    asChild?: boolean;
    className?: string;
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
    optionListClassName?: string;
    portal?: boolean;
    error?: boolean;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
    (
        {
            options,
            onValueChange,
            variant,
            defaultValue = [],
            placeholder = "",
            animation = 0,
            maxCount = 3,
            modalPopover = false,
            asChild = false,
            className,
            label,
            labelClassName,
            containerClassName,
            optionListClassName,
            portal = false,
            value = [],
            error = false,
            ...props
        },
        ref,
    ) => {
        // const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
        const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
        const [isAnimating, setIsAnimating] = React.useState(false);

        const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                setIsPopoverOpen(true);
            } else if (event.key === "Backspace" && !event.currentTarget.value) {
                const newSelectedValues = [...value];
                newSelectedValues.pop();
                // setSelectedValues(newSelectedValues);
                onValueChange(newSelectedValues);
            }
        };

        const toggleOption = (option: string) => {
            const newSelectedValues = value.includes(option)
                ? value.filter((value) => value !== option)
                : [...value, option];
            // setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const handleClear = () => {
            // setSelectedValues([]);
            onValueChange([]);
        };

        const handleTogglePopover = () => {
            setIsPopoverOpen((prev) => !prev);
        };

        const clearExtraOptions = () => {
            const newSelectedValues = value.slice(0, maxCount);
            // setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        };

        const toggleAll = () => {
            if (value.length === options.length) {
                handleClear();
            } else {
                const allValues = options.map((option) => option.value);
                // setSelectedValues(allValues);
                onValueChange(allValues);
            }
        };
        React.useEffect(() => {
            if (value !== undefined) {
                // setSelectedValues(value);
            }
        }, []);

        const trigger = (
            <button
                ref={ref}
                {...props}
                className={cn(
                    "peer",
                    value.length === 0 && !isPopoverOpen && "empty-and-closed",
                    "rounded-8 flex h-8 items-center justify-between border p-1 px-3",
                    `${error ? "border-red-700" : ""}`,
                    className,
                )}
            >
                {value.length === 0 && (
                    <span className="px mr-1 line-clamp-1 w-full text-right text-xs whitespace-nowrap">
                        {placeholder}
                    </span>
                )}
                {value.length > 0 ? (
                    <div className="flex w-full items-center justify-between">
                        <div className="flex flex-wrap items-center">
                            {value.slice(0, maxCount).map((value) => {
                                const option = options.find((o) => o.value === value);
                                return (
                                    <Badge
                                        key={value}
                                        className={cn(
                                            isAnimating ? "animate-bounce" : "",
                                            multiSelectVariants({ variant }),
                                        )}
                                        style={{ animationDuration: `${animation}s` }}
                                    >
                                        <XCircle
                                            className="ml-2 h-4 w-4 cursor-pointer"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                toggleOption(value);
                                            }}
                                        />
                                        <span className="max-w-[200px] text-ellipsis">{option?.label}</span>
                                    </Badge>
                                );
                            })}
                            {value.length > maxCount && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Badge
                                            className={cn(
                                                "border-foreground/1 !text-10px text-foreground whitespace-nowrap",
                                                isAnimating ? "animate-bounce" : "",
                                                multiSelectVariants({ variant }),
                                                "bg-background",
                                            )}
                                            style={{ animationDuration: `${animation}s` }}
                                        >
                                            <XCircle
                                                className="ml-2 h-4 w-4 cursor-pointer"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    clearExtraOptions();
                                                }}
                                            />
                                            {` ${value.length - maxCount}+ مورد `}
                                        </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent className="z-[200] flex flex-col gap-1">
                                        {value.length > maxCount &&
                                            value.map((value, i) => {
                                                const option = options.find((o) => o.value === value);

                                                return <span key={`tootlip-item-${i}`}>{option?.label}</span>;
                                            })}
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                        <div className="flex items-center">
                            <XIcon
                                className="text-muted-foreground h-4 cursor-pointer"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleClear();
                                }}
                            />
                            <Separator orientation="vertical" className="flex h-full min-h-6" />
                            <ChevronDown className="text-muted-foreground h-4 cursor-pointer" />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-8 w-full items-center justify-end">
                        <ChevronDown className="text-muted-foreground mx-2 h-4 cursor-pointer" />
                    </div>
                )}
            </button>
        );

        const content = (
            <Command className="bg-secondary">
                <CommandInput placeholder="جست و جو ..." onKeyDown={handleInputKeyDown} />
                <CommandList>
                    <CommandEmpty>نتیجه ای یافت نشد!</CommandEmpty>
                    <CommandGroup className="scrollBarStyle max-h-60 overflow-auto">
                        <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                            <div
                                className={cn(
                                    "rounded-8 flex h-4 w-4 items-center justify-center border",
                                    value.length === options.length ? "" : "opacity-50 [&_svg]:invisible",
                                )}
                            >
                                <CheckIcon className="h-4 w-4" />
                            </div>
                            <span className="text-12px">(انتخاب همه)</span>
                        </CommandItem>
                        {options.map((option) => {
                            const isSelected = value.includes(option.value);
                            if (option.disabled)
                                return (
                                    <div
                                        key={option.value}
                                        className="text-14px bg-primary/10 border-b px-3 py-1.5 font-bold opacity-80"
                                    >
                                        {option.label}
                                    </div>
                                );
                            return (
                                <CommandItem
                                    key={option.value}
                                    onSelect={() => toggleOption(option.value)}
                                    className="cursor-pointer"
                                >
                                    <div
                                        className={cn(
                                            "rounded-8 border-primary flex h-4 w-4 items-center justify-center border",
                                            isSelected ? "bg-primary" : "opacity-50 [&_svg]:invisible",
                                        )}
                                    >
                                        <CheckIcon className="h-4 w-4" />
                                    </div>
                                    <span className="text-12px">{option.label}</span>
                                </CommandItem>
                            );
                        })}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup className="border-t">
                        <div className="flex items-center justify-between">
                            {value.length > 0 && (
                                <>
                                    <CommandItem
                                        onSelect={handleClear}
                                        className="flex-1 cursor-pointer justify-center"
                                    >
                                        پاک کردن
                                    </CommandItem>
                                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                                </>
                            )}
                            <CommandItem
                                onSelect={() => setIsPopoverOpen(false)}
                                className="max-w-full flex-1 cursor-pointer justify-center"
                            >
                                بستن
                            </CommandItem>
                        </div>
                    </CommandGroup>
                </CommandList>
            </Command>
        );

        return (
            <div className={cn("relative", containerClassName)}>
                {portal ? (
                    <CustomPopover trigger={trigger} open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                        {content}
                    </CustomPopover>
                ) : (
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
                        <PopoverTrigger asChild className="h-10">
                            {trigger}
                        </PopoverTrigger>
                        <PopoverContent
                            className={cn("w-auto p-0", optionListClassName)}
                            align="start"
                            onEscapeKeyDown={() => setIsPopoverOpen(false)}
                        >
                            {content}
                        </PopoverContent>
                    </Popover>
                )}

                {label && (
                    <FloatingLabel
                        className={cn(
                            "peer-focus:secondary peer-focus:dark:secondary absolute -start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text px-0 text-sm whitespace-nowrap text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-0 rtl:peer-focus:left-[unset] rtl:peer-focus:translate-x-0",
                            labelClassName,
                        )}
                    >
                        {label}
                    </FloatingLabel>
                )}
            </div>
        );
    },
);

MultiSelect.displayName = "MultiSelect";
