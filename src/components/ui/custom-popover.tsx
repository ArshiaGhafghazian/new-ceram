"use client";
// Custom Popover component using React and Tailwind
import { useEffect, useRef } from "react";

interface CustomPopoverProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CustomPopover({ trigger, children, open, onOpenChange }: CustomPopoverProps) {
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onOpenChange(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, onOpenChange]);

    return (
        <div className="relative">
            <div onClick={() => onOpenChange(!open)}>{trigger}</div>
            {open && (
                <div
                    ref={popoverRef}
                    className="bg-background rounded-12 absolute z-50 mt-2 w-[300px] border shadow-lg"
                >
                    {children}
                </div>
            )}
        </div>
    );
}
