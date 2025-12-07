/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "../Switcher/LocaleSwitcher";
import { useLocale, useTranslations } from "next-intl";
import {
    Home,
    LayoutDashboard,
    LogIn,
    UserPlus,
    Menu,
    X,
} from "lucide-react";

export default function Navbar() {
    const t = useTranslations('common');
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Efecto para detectar scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú móvil al cambiar ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathName]);

    const locale = useLocale();
    const navLinks = [
        { href: `/${locale}`, label: t('home'), icon: <Home className="w-4 h-4" /> },
        { href: `/${locale}/dashboard`, label: t('dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
        { href: `/${locale}/login`, label: t('login'), icon: <LogIn className="w-4 h-4" /> },
        { href: `/${locale}/register`, label: t('register'), icon: <UserPlus className="w-4 h-4" /> },
    ];

    return (
        <>
            {/* Navbar Principal */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg"
                : "bg-white dark:bg-gray-900"
                }`}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                                    <span className="text-white font-bold text-lg">GT</span>
                                </div>
                                <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Gestion de Tareas
                                </span>
                            </Link>
                        </div>

                        {/* Navegación Desktop */}
                        <nav className="hidden md:flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = pathName === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`
                      flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200
                      ${isActive
                                                ? "bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-inner"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                                            }
                    `}
                                    >
                                        {link.icon}
                                        <span className="font-medium">{link.label}</span>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                                        )}
                                    </Link>
                                );
                            })}

                            {/* Separador */}
                            <div className="h-6 w-px mx-2 bg-gray-300 dark:bg-gray-700"></div>

                            {/* Switcher de Idioma con mejor estilo */}
                            <div className="flex items-center space-x-2 pl-2">
                                <div className="relative">
                                    <LocaleSwitcher />
                                </div>
                            </div>
                        </nav>

                        {/* Botón Menú Móvil */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú Móvil */}
                {isMenuOpen && (
                    <div className="md:hidden animate-in slide-in-from-top-5 duration-300">
                        <div className="px-4 pt-2 pb-6 space-y-2 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl">
                            {navLinks.map((link) => {
                                const isActive = pathName === link.href;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`
                      flex items-center justify-between p-3 rounded-xl transition-all
                      ${isActive
                                                ? "bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }
                    `}
                                    >
                                        <div className="flex items-center space-x-3">
                                            {link.icon}
                                            <span className="font-medium">{link.label}</span>
                                        </div>
                                        {isActive && (
                                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        )}
                                    </Link>
                                );
                            })}

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                                <div className="flex items-center justify-between p-3">
                                    <div className="flex items-center space-x-3">
                                        <span className="font-medium">Idioma / Language</span>
                                    </div>
                                    <LocaleSwitcher />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* Espacio para el navbar fijo */}
            <div className="h-16 md:h-20"></div>

            {/* Indicador de ruta activa (efecto sutil) */}
            <div className="fixed top-0 left-0 right-0 h-1 z-40">
                <div
                    className="h-full bg-linear-to-r from-blue-500 via-purple-500 to-pink-500"
                    style={{
                        width: '100%',
                        backgroundSize: '200% 100%',
                        animation: 'linearShift 3s ease infinite',
                    }}
                />
            </div>

            <style jsx global>{`
        @keyframes linearShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Mejoras para el switcher de idiomas */
        .locale-switcher-button {
          padding: 0.5rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid #e5e7eb;
          background: white;
          font-weight: 500;
          transition: all 0.2s;
        }
        
        .locale-switcher-button:hover {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .dark .locale-switcher-button {
          background: #1f2937;
          border-color: #4b5563;
          color: #f9fafb;
        }
        
        .dark .locale-switcher-button:hover {
          border-color: #60a5fa;
          box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1);
        }
      `}</style>
        </>
    );
}