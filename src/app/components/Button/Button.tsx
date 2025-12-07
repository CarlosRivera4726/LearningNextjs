'use client';

import { ButtonHTMLAttributes } from 'react';
import { Loader2, LucideIcon } from 'lucide-react';

const colorClasses = {
    primary: {
        base: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800',
        text: 'text-white',
        shadow: 'shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35',
        ring: 'focus:ring-blue-500/30',
        border: 'border-blue-500',
        borderDark: 'dark:border-blue-400',
        textColor: 'text-blue-600 dark:text-blue-400',
        hoverBg: 'hover:bg-blue-50 dark:hover:bg-blue-900/20',
        hoverBgGhost: 'hover:bg-blue-100 dark:hover:bg-blue-900/30'
    },
    secondary: {
        base: 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 dark:from-gray-600 dark:to-gray-700 dark:hover:from-gray-700 dark:hover:to-gray-800',
        text: 'text-white',
        shadow: 'shadow-lg shadow-gray-500/25 hover:shadow-xl hover:shadow-gray-500/35',
        ring: 'focus:ring-gray-500/30',
        border: 'border-gray-500',
        borderDark: 'dark:border-gray-400',
        textColor: 'text-gray-600 dark:text-gray-400',
        hoverBg: 'hover:bg-gray-50 dark:hover:bg-gray-900/20',
        hoverBgGhost: 'hover:bg-gray-100 dark:hover:bg-gray-900/30'
    },
    success: {
        base: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 dark:from-green-600 dark:to-green-700 dark:hover:from-green-700 dark:hover:to-green-800',
        text: 'text-white',
        shadow: 'shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/35',
        ring: 'focus:ring-green-500/30',
        border: 'border-green-500',
        borderDark: 'dark:border-green-400',
        textColor: 'text-green-600 dark:text-green-400',
        hoverBg: 'hover:bg-green-50 dark:hover:bg-green-900/20',
        hoverBgGhost: 'hover:bg-green-100 dark:hover:bg-green-900/30'
    },
    danger: {
        base: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:hover:from-red-700 dark:hover:to-red-800',
        text: 'text-white',
        shadow: 'shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/35',
        ring: 'focus:ring-red-500/30',
        border: 'border-red-500',
        borderDark: 'dark:border-red-400',
        textColor: 'text-red-600 dark:text-red-400',
        hoverBg: 'hover:bg-red-50 dark:hover:bg-red-900/20',
        hoverBgGhost: 'hover:bg-red-100 dark:hover:bg-red-900/30'
    },
    warning: {
        base: 'bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 dark:from-yellow-600 dark:to-yellow-700 dark:hover:from-yellow-700 dark:hover:to-yellow-800',
        text: 'text-gray-900',
        shadow: 'shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/35',
        ring: 'focus:ring-yellow-500/30',
        border: 'border-yellow-500',
        borderDark: 'dark:border-yellow-400',
        textColor: 'text-yellow-600 dark:text-yellow-400',
        hoverBg: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20',
        hoverBgGhost: 'hover:bg-yellow-100 dark:hover:bg-yellow-900/30'
    },
    info: {
        base: 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 dark:from-cyan-600 dark:to-cyan-700 dark:hover:from-cyan-700 dark:hover:to-cyan-800',
        text: 'text-white',
        shadow: 'shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/35',
        ring: 'focus:ring-cyan-500/30',
        border: 'border-cyan-500',
        borderDark: 'dark:border-cyan-400',
        textColor: 'text-cyan-600 dark:text-cyan-400',
        hoverBg: 'hover:bg-cyan-50 dark:hover:bg-cyan-900/20',
        hoverBgGhost: 'hover:bg-cyan-100 dark:hover:bg-cyan-900/30'
    }
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    type: "submit" | "reset" | "button";
    color: keyof typeof colorClasses;
    value: string;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: LucideIcon;
    variant?: 'solid' | 'outline' | 'ghost';
}

const Button = ({
    type,
    color,
    value,
    loading = false,
    fullWidth = false,
    icon: Icon,
    variant = 'solid',
    className = '',
    disabled,
    ...props
}: ButtonProps) => {

    const colorSet = colorClasses[color];

    const baseClasses = `
        relative
        font-medium
        rounded-xl
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-1
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-[0.98]
        ${fullWidth ? 'w-full' : ''}
        px-4 py-2
    `;

    const getVariantClasses = () => {
        switch (variant) {
            case 'outline':
                return `
                    border-2
                    bg-transparent
                    ${color === 'warning'
                        ? 'text-gray-900 dark:text-gray-900'
                        : colorSet.textColor
                    }
                    ${colorSet.border} ${colorSet.borderDark}
                    ${colorSet.hoverBg}
                    ${colorSet.ring}
                `;

            case 'ghost':
                return `
                    bg-transparent
                    ${color === 'warning'
                        ? 'text-gray-900 dark:text-gray-900'
                        : colorSet.textColor
                    }
                    ${colorSet.hoverBgGhost}
                    ${colorSet.ring}
                `;

            default: // solid
                return `
                    ${colorSet.base}
                    ${colorSet.text}
                    ${colorSet.shadow}
                    ${colorSet.ring}
                `;
        }
    };

    return (
        <button
            type={type}
            className={`
                ${baseClasses}
                ${getVariantClasses()}
                ${loading ? 'text-transparent' : ''}
                ${className}
                group
                cursor-pointer
                p-2
            `}
            disabled={disabled || loading}
            {...props}
        >
            {/* Contenido del botón */}
            <span className="relative flex items-center justify-center gap-2">
                {Icon && !loading && (
                    <Icon className={`
                        w-4 h-4
                        transition-transform duration-300
                        group-hover:translate-x-0.5
                    `} />
                )}

                {loading && (
                    <>
                        <span className="invisible">{value}</span>
                        <Loader2 className="
                            absolute w-4 h-4 
                            animate-spin
                            text-current
                        " />
                    </>
                )}

                {!loading && value}
            </span>

            {/* Efecto de brillo en hover para variant solid */}
            {variant === 'solid' && !disabled && (
                <span className="
                    absolute inset-0
                    -translate-x-full
                    group-hover:translate-x-full
                    transition-transform duration-1000
                    rounded-xl
                " />
            )}
        </button>
    );
};

export default Button;