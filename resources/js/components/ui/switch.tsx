import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import { cn } from '@/lib/utils';

type SwitchType = 'success' | 'info' | 'danger' | 'warning';

export interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    type?: SwitchType;
}

const typeColors: Record<SwitchType, string> = {
    success: 'data-[state=checked]:bg-emerald-500',
    info: 'data-[state=checked]:bg-blue-500',
    danger: 'data-[state=checked]:bg-red-500',
    warning: 'data-[state=checked]:bg-orange-500',
};

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
    ({ className, checked, onCheckedChange, type = 'info', ...props }, ref) => (
        <SwitchPrimitives.Root
            ref={ref}
            checked={checked}
            onCheckedChange={onCheckedChange}
            className={cn(
                "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-gray-300 transition-colors duration-200 ease-in-out",
                typeColors[type],
                className
            )}
            {...props}
        >
            <SwitchPrimitives.Thumb
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out",
                    "translate-x-0.5 data-[state=checked]:translate-x-5"
                )}
            />
        </SwitchPrimitives.Root>
    )
);
Switch.displayName = "Switch";

export { Switch };
