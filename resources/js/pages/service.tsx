"use client"

import "@styles/global.css"

import NavbarLayout from "../layouts/navbar-layout"
import CarouselLayout from "../layouts/carousel-layout"
import FooterLayout from "../layouts/footer-layout"

import { Shield, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { useState } from "react"

const phone_wp = "523223602224"

function ImageSlider({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            nextImage()
        }

        if (touchStart - touchEnd < -75) {
            prevImage()
        }
    }

    return (
        <div
            className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-2xl transition-all duration-500"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        aria-label="Imagen anterior"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-900 rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                        aria-label="Imagen siguiente"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Ir a imagen ${idx + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

function ImageCarouselEquipment({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [touchStart, setTouchStart] = useState(0)
    const [touchEnd, setTouchEnd] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX)
    }

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            nextImage()
        }

        if (touchStart - touchEnd < -75) {
            prevImage()
        }
    }

    return (
        <div
            className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-2xl transition-all duration-500"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - ${currentIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>

                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                                    }`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

interface CarruselItem {
    id: number
    image: string
    title1?: string
    title2?: string
    activo: boolean
}

interface ServicioVario {
    title: string
    subtitle: string
    descripcion: string
    imagenes: string[] | string
    caracteristicas: string[]
    activo: boolean
    icon: keyof typeof Icons
    color: string
}

interface RentaEquipo {
    title: string
    subtitle: string
    description: string
    images: string[]
    caracteristicas: string[]
    activo: boolean
    color: string
}

interface ServiceProps {
    carruselService: CarruselItem[]
    serviciovario: ServicioVario[]
    rentaequipos: RentaEquipo[]
}

export default function Service({ carruselService = [], serviciovario = [], rentaequipos = [] }: ServiceProps) {
    const sendWhatsAppMessage = (productName: string, isService = false) => {
        const message = `Hola, me interesa ${productName}, quisiera información sobre ${isService ? "el servicio" : "el producto"}`
        const whatsappUrl = `https://wa.me/${phone_wp}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    const getColorClasses = (color: string) => {
        const bgColor = color.startsWith('bg-') ? color : `bg-${color}-500`
        const textColor = bgColor.replace('bg-', 'text-')
        const hoverBgColor = bgColor.replace('-500', '-600')
        return { bgColor, textColor, hoverBgColor }
    }

    return (
        <NavbarLayout>
            <CarouselLayout slides={carruselService} />

            <div className="min-h-screen bg-slate-50">
                <section className="min-h-screen bg-white flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                            Nuestros Servicios
                        </div>
                        <h1 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                            Equipos médicos y<span className="block font-semibold text-emerald-600">estudios especializados</span>
                        </h1>
                        <p className="text-xl text-slate-600 text-pretty leading-relaxed max-w-4xl mx-auto">
                            Ofrecemos una amplia gama de servicios médicos domiciliarios, renta y venta de equipo especializado. Cada
                            servicio está respaldado por profesionales certificados y tecnología de vanguardia para garantizar la
                            mejor atención en la comodidad de tu hogar.
                        </p>
                    </div>
                </section>

                <section className="py-32 bg-blue-50" id="services">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Estudios Diagnósticos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Diagnósticos precisos
                                <span className="block font-semibold text-emerald-600">en tu hogar</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-3xl mx-auto">
                                Realizamos estudios médicos especializados con la misma calidad y precisión que encontrarías en
                                cualquier hospital, pero en la comodidad de tu casa.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {serviciovario
                                .filter((servicio) => servicio.activo)
                                .map((servicio, index) => {
                                    const IconComponent = Icons[servicio.icon]
                                    const { bgColor, textColor, hoverBgColor } = getColorClasses(servicio.color)
                                    const imageArray = Array.isArray(servicio.imagenes) ? servicio.imagenes : [servicio.imagenes]

                                    return (
                                        <Card
                                            key={index}
                                            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 rounded-3xl hover:scale-[1.02]"
                                        >
                                            <div className="absolute top-6 left-6 z-10">
                                                <div
                                                    className={`w-16 h-16 ${hoverBgColor} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                                                >
                                                    {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                                                </div>
                                            </div>

                                            <CardContent className="p-0">
                                                <div className="relative p-6 pb-4">
                                                    <ImageSlider images={imageArray} title={servicio.title} />
                                                </div>

                                                <div className="px-6 pb-6">
                                                    <h3 className="text-3xl font-light text-slate-900 mb-2">{servicio.title}</h3>
                                                    <p className={`text-lg font-medium ${textColor} mb-4`}>{servicio.subtitle}</p>
                                                    <p className="text-slate-600 leading-relaxed text-pretty mb-6">{servicio.descripcion}</p>

                                                    <div className="space-y-3">
                                                        <h4 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                                                            <Shield className={`h-5 w-5 ${textColor} mr-2`} />
                                                            Incluye:
                                                        </h4>
                                                        <div className="grid grid-cols-1 gap-2">
                                                            {servicio.caracteristicas.map((caracteristica, featureIndex) => (
                                                                <div
                                                                    key={featureIndex}
                                                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                                                >
                                                                    <div className={`w-2 h-2 ${bgColor} rounded-full flex-shrink-0`}></div>
                                                                    <span className="text-slate-600 text-sm">{caracteristica}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => sendWhatsAppMessage(servicio.title, true)}
                                                        className={`w-full mt-6 ${hoverBgColor} text-white py-3 px-6 rounded-2xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer`}
                                                    >
                                                        <span>Solicitar Servicio</span>
                                                        <Zap className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Renta de Equipo Médico
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Todo el equipo que
                                <span className="block font-semibold text-emerald-600">necesitas</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-3xl mx-auto">
                                Contamos con el equipo médico más completo para cuidados domiciliarios, rehabilitación y tratamientos
                                especializados. Todos nuestros equipos están certificados y reciben mantenimiento regular.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {rentaequipos
                                .filter((equipo) => equipo.activo)
                                .map((equipo, index) => {
                                    const { hoverBgColor } = getColorClasses(equipo.color)

                                    return (
                                        <Card
                                            key={index}
                                            className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                                        >
                                            <CardContent className="p-0">
                                                <div className="relative p-4 pb-2">
                                                    <ImageCarouselEquipment images={equipo.images} title={equipo.title} />
                                                </div>

                                                <div className="px-4 pb-4">
                                                    <h3 className="text-xl font-light text-slate-900 mb-1">{equipo.title}</h3>
                                                    <p className="text-sm font-medium text-emerald-600 mb-3">{equipo.subtitle}</p>
                                                    <p className="text-slate-600 leading-relaxed text-pretty mb-4 text-xs">
                                                        {equipo.description}
                                                    </p>

                                                    <div className="space-y-2 mb-4">
                                                        <h4 className="text-xs font-medium text-slate-900 mb-2">Características principales:</h4>
                                                        <div className="space-y-1">
                                                            {equipo.caracteristicas.slice(0, 3).map((caracteristica, featureIndex) => (
                                                                <div key={featureIndex} className="flex items-start space-x-2">
                                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                                                    <span className="text-slate-600 text-xs leading-relaxed">
                                                                        {caracteristica}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => sendWhatsAppMessage(equipo.title)}
                                                        className={`w-full ${hoverBgColor} text-white py-2 px-3 rounded-xl text-xs font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
                                                    >
                                                        Rentar
                                                    </button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )
                                })}
                        </div>
                    </div>
                </section>
            </div>

            <FooterLayout />
        </NavbarLayout>
    )
}