'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Nav() {
    const pathName = usePathname();

    return (
        <nav className="flex flex-row gap-2">
            <Link className={pathName === "/" ? "underline active" : ""} href="/">Home</Link>
            <Link className={pathName === "/dashboard" ? "underline active" : ""} href="/dashboard">Dashboard</Link>
            <Link className={pathName === "/login" ? "underline active" : ""} href="/login">Login</Link>
            <Link className={pathName === "/register" ? "underline active" : ""} href="/register">Register</Link>
        </nav>
    )
}