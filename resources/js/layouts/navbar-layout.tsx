"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, User, Phone, Menu, Images, Briefcase } from "lucide-react"

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
                className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled
                        ? "bg-card/95 backdrop-blur-xl shadow-xl border-b border-border/50"
                        : "bg-card/80 backdrop-blur-md shadow-lg border-b border-border/30"
                    }`}
            >
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 h-16 w-full max-w-8xl mx-auto">
                    <a href="/" className="flex items-center space-x-3 group hover:scale-105 transition-all duration-300">
                        <div
                            className={`relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-700 via-blue-700 to-emerald-600 rounded-xl shadow-lg transition-all duration-300 p-1 group-hover:shadow-xl group-hover:rotate-6 ${isScrolled ? "shadow-blue-700/20" : "shadow-blue-700/30"
                                }`}
                        >
                            <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                            <img
                                src="/idp-white.png"
                                alt="Imagen del Puerto Logo"
                                className="w-full h-full object-contain relative z-10"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-base sm:text-lg lg:text-xl font-medium text-foreground tracking-tight leading-none">
                                Imagen del Puerto
                            </span>
                            <span className="text-xs text-muted-foreground font-semibold tracking-wider">SERVICIOS MÉDICOS</span>
                        </div>
                    </a>

                    <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
                        {navItems.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <Button
                                    key={item.name}
                                    variant="ghost"
                                    size="lg"
                                    className={`relative group flex items-center space-x-3 px-6 py-3 text-sm font-medium text-muted-foreground transition-all duration-300 rounded-2xl hover:scale-105 hover:shadow-none ${item.color}`}
                                    asChild
                                >
                                    <a href={item.href}>
                                        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                                        <span className="relative">
                                            {item.name}
                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full rounded-full"></span>
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
                                className="lg:hidden p-3 hover:bg-blue-700/10 hover:text-blue-700 transition-all duration-300 rounded-2xl border border-transparent hover:border-blue-700/20 hover:shadow-lg hover:scale-105"
                                aria-label="Abrir menú de navegación"
                            >
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-80 sm:w-96 p-0 bg-card border-l border-border/50 shadow-2xl z-[60]">
                            <div className="flex flex-col h-full">
                                <div className="relative flex items-center justify-between p-8 bg-gradient-to-br from-blue-700/5 via-emerald-600/5 to-orange-600/5 border-b border-border/50">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/5 via-emerald-600/5 to-orange-600/5"></div>
                                    <a href="/" className="relative flex items-center space-x-3 group" onClick={() => setIsOpen(false)}>
                                        <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-700 via-blue-700 to-emerald-600 rounded-xl shadow-lg transition-all duration-300 p-1 group-hover:shadow-xl group-hover:rotate-6">
                                            <div className="absolute inset-0 bg-white/20 rounded-xl"></div>
                                            <img
                                                src="/idp-white.png"
                                                alt="Imagen del Puerto Logo"
                                                className="w-full h-full object-contain relative z-10"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-medium text-foreground text-lg leading-none">Imagen del Puerto</span>
                                            <span className="text-xs text-muted-foreground font-semibold tracking-wider mt-0.5">
                                                SERVICIOS MÉDICOS
                                            </span>
                                        </div>
                                    </a>
                                </div>

                                <div className="flex-1 py-8">
                                    <nav className="space-y-2 px-6">
                                        {navItems.map((item, index) => {
                                            const Icon = item.icon
                                            return (
                                                <Button
                                                    key={item.name}
                                                    variant="ghost"
                                                    className={`group w-full justify-start space-x-4 px-6 py-5 text-base font-medium text-muted-foreground transition-all duration-300 rounded-2xl hover:scale-105 hover:shadow-none ${item.color}`}
                                                    asChild
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <a href={item.href}>
                                                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                                                        <span className="relative">
                                                            {item.name}
                                                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full rounded-full"></span>
                                                        </span>
                                                    </a>
                                                </Button>
                                            )
                                        })}
                                    </nav>
                                </div>

                                <div className="relative p-8 bg-gradient-to-br from-muted/30 via-blue-700/5 to-emerald-600/5 border-t border-border/50">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/5 via-emerald-600/5 to-orange-600/5"></div>
                                    <div className="relative text-center">
                                        <div className="flex items-center justify-center gap-2 mb-3">
                                            <div className="w-2 h-2 bg-blue-700 rounded-full animate-pulse"></div>
                                            <p className="text-sm font-medium text-foreground">Servicios médicos profesionales</p>
                                            <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <div className="w-1 h-1 bg-blue-700 rounded-full"></div>
                                                Rayos X
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <div className="w-1 h-1 bg-emerald-600 rounded-full"></div>
                                                Electrocardiogramas
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <div className="w-1 h-1 bg-orange-600 rounded-full"></div>
                                                Renta de equipo
                                            </span>
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
