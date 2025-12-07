'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "../Switcher/LocaleSwitcher";
import { useTranslations } from "next-intl";


export default function Nav() {
    const t = useTranslations('common');
    const pathName = usePathname();

    return (
        <nav className="flex flex-row gap-2">
            <Link className={pathName === "/" ? "underline active" : ""} href="/">{t('home')}</Link>
            <Link className={pathName === "/dashboard" ? "underline active" : ""} href="/dashboard">{t('dashboard')}</Link>
            <Link className={pathName === "/login" ? "underline active" : ""} href="/login">{t('login')}</Link>
            <Link className={pathName === "/register" ? "underline active" : ""} href="/register">{t('register')}</Link>
            |
            <LocaleSwitcher />
        </nav>
    )
}