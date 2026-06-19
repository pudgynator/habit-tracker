import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'ghost-destructive' | 'contribute' | 'none' | 'low' | 'medium' | 'high' | 'max';

type ButtonProps = {
    variant?: Variant;
} & ComponentProps<'button'>

export function Button({ variant = 'primary', className, ...props}: ButtonProps) {
    return  (
        <button 
            {...props} 
            className={twMerge(
                getVariantStyles(variant), 
                "transition-colors rounded px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed", 
                className,
            )}>

        </button>
    )
}

function getVariantStyles(variant: Variant) {
    switch (variant) {
        case 'primary':
            return 'bg-violet-600 hover:bg-violet-500 '
        case 'secondary':
            return 'bg-zinc-700 hover:bg-zinc-600 text-zinc-400 '
        case 'ghost-destructive':
            return 'hover:bg-red-800 text-red-800 hover:text-red-200'
        case 'none': 
            return 'bg-zinc-700 w-1'
        case 'low':
            return 'bg-violet-300 w-1'
        case 'medium':
            return 'bg-violet-500 w-1'
        case 'high':
            return 'bg-violet-600 w-1'
        case 'max':
            return 'bg-violet-800 w-1'
        default: 
            throw new Error(`Unknown variant`)
    }
}
