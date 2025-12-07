'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';

export default function LocaleSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ];

    const currentLanguage = languages.find(lang => lang.code === locale);

    const switchLocale = (newLocale: string) => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
        setIsOpen(false);
    };

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Botón principal - Elegante y moderno */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    flex items-center justify-between
                    px-4 py-1
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-xl
                    hover:border-blue-400 dark:hover:border-blue-500
                    hover:shadow-md hover:shadow-blue-100 dark:hover:shadow-blue-900/20
                    transition-all duration-300
                    group
                    min-w-[140px]
                "
                aria-label="Change language"
                aria-expanded={isOpen}
            >
                <div className="flex items-center gap-3">
                    {/* Icono globo con animación */}
                    <div className="
                        relative
                        group-hover:rotate-12
                        transition-transform duration-500
                    ">
                        <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        {/* Efecto de ondas */}
                        <div className="
                            absolute -inset-1
                            rounded-full
                            bg-blue-400/0
                            group-hover:bg-blue-400/10
                            transition-all duration-700
                            scale-0 group-hover:scale-100
                        " />
                    </div>

                    {/* Idioma actual */}
                    <div className="flex flex-col items-start">
                        <span className="
                            text-sm font-semibold
                            text-gray-800 dark:text-gray-200
                            capitalize
                        ">
                            {currentLanguage?.name}
                        </span>
                        <span className="
                            text-xs
                            text-gray-500 dark:text-gray-400
                        ">
                            {currentLanguage?.code.toUpperCase()}
                        </span>
                    </div>
                </div>

                {/* Flecha animada */}
                <ChevronDown className={`
                    w-4 h-4
                    text-gray-400
                    transition-transform duration-300
                    ${isOpen ? 'rotate-180' : ''}
                `} />
            </button>

            {/* Dropdown - Flotante y con efectos premium */}
            {isOpen && (
                <div className="
                    absolute top-full right-0 mt-2
                    min-w-full
                    bg-white dark:bg-gray-800
                    border border-gray-200 dark:border-gray-700
                    rounded-xl
                    shadow-2xl
                    shadow-gray-200/50 dark:shadow-gray-900/50
                    backdrop-blur-sm
                    overflow-hidden
                    z-50
                    animate-in slide-in-from-top-2 duration-200
                ">
                    <div className="p-2">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => switchLocale(language.code)}
                                className={`
                                    w-full
                                    flex items-center justify-between
                                    px-4 py-3
                                    rounded-lg
                                    transition-all duration-200
                                    hover:scale-[1.02]
                                    ${locale === language.code
                                        ? 'bg-linear-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    {/* Bandera con efecto */}
                                    <span className="text-xl transform hover:scale-110 transition-transform">
                                        {language.flag}
                                    </span>
                                    <div className="flex flex-col items-start">
                                        <span className="
                                            text-sm font-medium
                                            text-left
                                        ">
                                            {language.name}
                                        </span>
                                        <span className="
                                            text-xs opacity-75
                                        ">
                                            {language.code.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                {/* Checkmark para selección actual */}
                                {locale === language.code && (
                                    <div className="
                                        flex items-center justify-center
                                        w-5 h-5
                                        bg-blue-500
                                        rounded-full
                                        animate-in zoom-in duration-300
                                    ">
                                        <Check className="w-3 h-3 text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Efecto de lineare en el borde inferior */}
                    <div className="
                        h-1
                        bg-linear-to-r from-blue-400 via-purple-400 to-pink-400
                        opacity-50
                    " />
                </div>
            )}

            {/* Indicador sutil de cambio */}
            <div className={`
                absolute -top-1 -right-1
                w-3 h-3
                bg-linear-to-br from-blue-500 to-purple-500
                rounded-full
                border-2 border-white dark:border-gray-900
                transition-all duration-300
                ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
            `} />

            {/* Efectos de hover avanzados */}
            <div className="
                absolute inset-0
                rounded-xl
                bg-linear-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0
                group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5
                opacity-0 group-hover:opacity-100
                transition-all duration-500
                -z-10
                blur-sm
            " />
        </div>
    );
}