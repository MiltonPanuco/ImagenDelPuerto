"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Home, User, Phone, Menu, Images, Briefcase, Facebook, Instagram, MessageCircle } from "lucide-react"

interface NavItem {
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    color: string
}

const navItems: NavItem[] = [
    {
        name: "Inicio",
        href: "/",
        icon: Home,
        color: "hover:text-blue-700",
    },
    {
        name: "Acerca de",
        href: "/about",
        icon: User,
        color: "hover:text-blue-700",
    },
    {
        name: "Servicios",
        href: "/service",
        icon: Briefcase,
        color: "hover:text-blue-700",
    },
    {
        name: "Galería",
        href: "/gallery",
        icon: Images,
        color: "hover:text-blue-700",
    },
    {
        name: "Contacto",
        href: "/contact",
        icon: Phone,
        color: "hover:text-blue-700",
    },
]

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <div className="min-h-screen bg-background">
            <nav
                className={`navbar-fixed-light fixed top-0 left-0 right-0 z-[50] transition-all duration-300 ${isScrolled ? "!bg-white/95 backdrop-blur-xl shadow-xl border-b border-gray-200/50" : "!bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/30"}`} >
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 h-16 w-full max-w-8xl mx-auto">
                    <a href="/" className="flex items-center space-x-3 group hover:scale-[1.02] transition-all duration-300">
                        <img
                            src="logo_idp.png"
                            alt="Imagen del Puerto Logo"
                            className={`w-11 h-11 sm:w-12 sm:h-12 object-contain transition-all duration-500 group-hover:scale-105 ${isScrolled ? "drop-shadow-md" : "drop-shadow-lg"
                                }`}
                        />
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg lg:text-xl font-semibold !text-gray-900 tracking-tight leading-none bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
                                Imagen del Puerto
                            </span>
                            <span className="text-[10px] sm:text-xs !text-gray-600 font-medium tracking-[0.15em] uppercase mt-0.5">Servicios Médicos</span>
                        </div>
                    </a>

                    <div className="hidden lg:flex items-center space-x-1.5 xl:space-x-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    size="lg"
                                    className={`relative group flex items-center space-x-2.5 px-5 py-2.5 text-sm font-medium !text-gray-600 transition-all duration-300 rounded-xl hover:!bg-blue-50/80 hover:scale-[1.03] ${item.color}`}
                                    asChild
                                >
                                    <a href={item.href}>
                                        <Icon className="w-[18px] h-[18px] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" />
                                        <span className="relative">
                                            {item.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 group-hover:w-full rounded-full shadow-sm"></span>
                                        </span>
                                    </a>
                                </Button>
                            )
                        })}
                    </div>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="lg"
                                className="lg:hidden relative p-2.5 !text-gray-700 hover:!text-blue-700 hover:!bg-blue-50/80 transition-all duration-500 rounded-xl border border-gray-200/50 hover:border-blue-200/50 hover:shadow-md hover:scale-105 group"
                                aria-label="Abrir menú de navegación"
                            >
                                <Menu className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 sm:w-96 p-0 !bg-white border-l border-gray-200/50 shadow-2xl z-[60]">
                            <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
                            <div className="flex flex-col h-full">
                                <div className="relative flex items-center justify-between p-6 border-b border-gray-200/50">
                                    <a href="/" className="relative flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
                                        <img
                                            src="logo_idp.png"
                                            alt="Imagen del Puerto Logo"
                                            className="w-11 h-11 object-contain transition-all duration-500 group-hover:scale-105 drop-shadow-lg"
                                        />
                                        <div className="flex flex-col">
                                            <span className="font-semibold !text-gray-900 text-lg leading-none bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text">Imagen del Puerto</span>
                                            <span className="text-[10px] !text-gray-600 font-medium tracking-[0.15em] uppercase mt-1">
                                                Servicios Médicos
                                            </span>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-1 py-6 overflow-y-auto">
                                    <nav className="space-y-1.5 px-4">
                                        {navItems.map((item, index) => {
                                            const Icon = item.icon
                                            return (
                                                <Button
                                                    key={item.name}
                                                    variant="ghost"
                                                    className={`group w-full justify-start space-x-4 px-5 py-4 text-base font-medium !text-gray-600 transition-all duration-300 rounded-xl hover:!bg-blue-50/80 hover:scale-[1.02] hover:translate-x-1 ${item.color}`}
                                                    asChild
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <a href={item.href} className="relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-xl"></div>
                                                        <Icon className="w-5 h-5 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 relative z-10" />
                                                        <span className="relative z-10">
                                                            {item.name}
                                                            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 group-hover:w-full rounded-full"></span>
                                                        </span>
                                                    </a>
                                                </Button>
                                            )
                                        })}
                                    </nav>
                                </div>

                                <div className="relative p-6 !bg-gray-50/30 border-t border-gray-200/50">
                                    <div className="relative space-y-4">
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full animate-pulse shadow-lg shadow-blue-500/50"></div>
                                            <p className="text-sm font-semibold !text-gray-900 bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text">Servicios Médicos Profesionales</p>
                                            <div className="w-2 h-2 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-center gap-3 text-xs !text-gray-600">
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-blue-50/50 border border-blue-200/30">
                                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"></div>
                                                Rayos X
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-emerald-50/50 border border-emerald-200/30">
                                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-full"></div>
                                                ECG
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full !bg-orange-50/50 border border-orange-200/30">
                                                <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full"></div>
                                                Renta
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-center gap-3 pt-2">
                                            <a
                                                href="https://wa.me/5213223602224"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                                aria-label="WhatsApp"
                                            >
                                                <MessageCircle className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </a>
                                            <a
                                                href="https://www.facebook.com/p/Imagen-del-Puerto-61560994465369/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                                aria-label="Facebook"
                                            >
                                                <Facebook className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </a>
                                            <a
                                                href="https://www.instagram.com/imagen_del_puerto/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 hover:from-pink-600 hover:via-purple-600 hover:to-orange-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-xl"
                                                aria-label="Instagram"
                                            >
                                                <Instagram className="w-5 h-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </nav>

            <main className="">{children}</main>
        </div>
    )
}