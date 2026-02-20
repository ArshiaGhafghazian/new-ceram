import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, id, ...props }, ref) => {
        return (
            <Input
                placeholder=" "
                className={cn('peer', className)}
                ref={ref}
                id={id}
                {...props}
            />
        );
    },
);
FloatingInput.displayName = 'FloatingInput';

const FloatingLabel = React.forwardRef<
    React.ElementRef<typeof Label>,
    React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
    return (
      <Label
        className={cn(
          "peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text bg-secondary px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2  rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
});
FloatingLabel.displayName = 'FloatingLabel';

type FloatingLabelInputProps = InputProps & {
    label?: string;
    inputClassName?: string; // ClassName for the input
    labelClassName?: string; // ClassName for the label
};

const FloatingLabelInput = React.forwardRef<
    React.ElementRef<typeof FloatingInput>,
    React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, inputClassName, labelClassName, ...props }, ref) => {
    const inputId = id || `floating-input-${React.useId()}`;

    return (
        <div className="relative">
            <FloatingInput ref={ref} id={inputId} className={inputClassName} {...props} />
            <FloatingLabel htmlFor={inputId} className={labelClassName}>
                {label}
            </FloatingLabel>
        </div>
    );
});
FloatingLabelInput.displayName = 'FloatingLabelInput';

export { FloatingInput, FloatingLabel, FloatingLabelInput };