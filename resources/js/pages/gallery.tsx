"use client"

import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { useState } from "react"
import { Heart, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import * as Icons from "lucide-react";


interface Equipo {
    id: number,
    id_galeria_equipamiento: number,
    icon: keyof typeof Icons,
    servicio: string,
    descripcion: string,
    caracteristicas: string[],
    image: string,
    color: string
}

interface Equipamiento {
    id: number,
    categoria: string,
    titulo: string,
    subtitulo: string,
    descripcion: string,
    equipos: Equipo[]
}

interface DigitalMemory {
    id: number
    image: string
    title: string
    date: string
}

interface Slide {
    image: string
    title: string
    description: string
}

interface GalleryProps {
    digitalMemories: DigitalMemory[]
    sliderGallery: Slide[]
    secciones: Equipamiento[]
}

export default function MedicalGallery({ digitalMemories, sliderGallery, secciones }: GalleryProps) {
    const [showAllMemories, setShowAllMemories] = useState(false)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [animatingCards, setAnimatingCards] = useState<number[]>([])
    const [imageTransitioning, setImageTransitioning] = useState(false)

    const displayedMemories = showAllMemories ? digitalMemories : digitalMemories.slice(0, 6)

    const openModal = (index: number) => {
        setSelectedImageIndex(index)
        setIsModalOpen(true)
    }

    const navigateImage = (direction: "prev" | "next") => {
        setImageTransitioning(true)
        setTimeout(() => {
            if (direction === "prev") {
                setSelectedImageIndex((prev) => (prev === 0 ? displayedMemories.length - 1 : prev - 1))
            } else {
                setSelectedImageIndex((prev) => (prev === displayedMemories.length - 1 ? 0 : prev + 1))
            }
            setTimeout(() => setImageTransitioning(false), 50)
        }, 150)
    }

    const handleShowMore = () => {
        const newCards = digitalMemories.slice(6).map((_, index) => index + 6)
        setAnimatingCards(newCards)
        setShowAllMemories(true)

        setTimeout(() => {
            setAnimatingCards([])
        }, 600)
    }

    const currentImage = displayedMemories[selectedImageIndex]

    return (
        <NavbarLayout>
            <CarouselLayout slides={sliderGallery} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero Section */}
                <section className="pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 md:pb-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 sm:mb-4">
                                Galería Médica
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-4">
                                Nuestro
                                <span className="block font-semibold text-emerald-600">equipamiento</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 md:mb-16 text-pretty leading-relaxed max-w-4xl mx-auto px-4">
                                Tecnología médica de vanguardia llevada directamente a tu hogar. Conoce los equipos que hacen posible
                                nuestros servicios de diagnóstico domiciliario con la más alta calidad y profesionalismo.
                            </p>
                        </div>
                    </div>
                </section>

                {secciones.map((seccion, idx) => (
                    <section key={idx} className={`py-16 sm:py-20 md:py-24 lg:py-32 ${idx % 2 === 0 ? "bg-blue-50" : "bg-white"}`}>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-20">
                                <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                    {seccion.categoria}
                                </div>
                                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-4">
                                    {seccion.titulo}<span className="block font-semibold text-emerald-600">{seccion.subtitulo}</span>
                                </h2>
                                <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 md:mb-16 text-pretty leading-relaxed max-w-3xl mx-auto px-4">
                                    {seccion.descripcion}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {seccion.equipos.map((equipo) => {
                                    const IconComponent = Icons[equipo.icon];
                                    return (
                                        <Card key={equipo.id} className="group shadow-lg bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl overflow-hidden border border-slate-200">
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={equipo.image || "/storage/default_card.svg"}
                                                    alt={equipo.servicio}
                                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                            </div>
                                            <CardContent className="p-8 text-center">
                                                <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-${equipo.color}-600 rounded-2xl flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-105 transition-all duration-300 shadow-lg`}>
                                                    {IconComponent ? (
                                                        <IconComponent className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                                                        ) : (
                                                        <div className="h-7 w-7 sm:h-8 sm:w-8 bg-gray-100 rounded-full" />
                                                        )}
                                                </div>
                                                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 sm:mb-4">{equipo.servicio}</h3>
                                                <p className="text-sm sm:text-base text-slate-600 leading-relaxed text-pretty mb-4 sm:mb-6 text-left">{equipo.descripcion}</p>
                                                <div className="space-y-2 text-left">
                                                    {equipo.caracteristicas && equipo.caracteristicas.length > 0 && equipo.caracteristicas.map((caracteristica, index) => (
                                                        <div key={index} className="text-xs sm:text-sm text-slate-600 flex items-center">
                                                            <div className={`w-2 h-2 bg-${equipo.color}-600 rounded-full mr-3 flex-shrink-0`} />
                                                            {caracteristica}
                                                        </div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                ))}

                {/* Digital Memories Section */}
                <section id="memories" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 sm:mb-4">
                                Nuestra Historia
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-4">
                                Recuerdos
                                <span className="block font-semibold text-emerald-600">digitales</span>
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-12 md:mb-16 text-pretty leading-relaxed max-w-3xl mx-auto px-4">
                                Momentos especiales capturados durante nuestros servicios médicos domiciliarios. Cada imagen cuenta la
                                historia de nuestro compromiso con tu salud y bienestar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {displayedMemories.map((memory, index) => (
                                <div
                                    key={memory.id}
                                    onClick={() => openModal(index)}
                                    className={`group cursor-pointer relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border border-slate-200 ${index >= 6 && showAllMemories
                                            ? animatingCards.includes(index)
                                                ? "opacity-0 translate-y-8 animate-in fade-in-0 slide-in-from-bottom-8 duration-500 fill-mode-forwards"
                                                : "opacity-100 translate-y-0"
                                            : ""
                                        }`}
                                    style={{
                                        animationDelay: index >= 6 && animatingCards.includes(index) ? `${(index - 6) * 100}ms` : "0ms",
                                    }}
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={memory.image || "/placeholder.svg"}
                                            alt={memory.title}
                                            className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                                            <div className="rounded-xl p-3">
                                                <h3 className="text-white font-medium text-sm mb-1 drop-shadow-lg">{memory.title}</h3>
                                                <p className="text-white/80 text-xs drop-shadow-lg">{memory.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {!showAllMemories && digitalMemories.length > 6 && (
                            <div className="text-center mt-8 sm:mt-12">
                                <Button
                                    onClick={handleShowMore}
                                    variant="outline"
                                    className="px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 rounded-full bg-transparent"
                                >
                                    Mostrar Más...
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                {/* Modal */}
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-[98vw] sm:max-w-7xl w-full p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl overflow-hidden max-h-[98vh] shadow-2xl">
                        <DialogTitle className=""></DialogTitle>
                        <DialogDescription className="sr-only"></DialogDescription>
                        <div className="relative">
                            <button
                                onClick={() => navigateImage("prev")}
                                className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md hover:bg-white/15 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            >
                                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white group-hover:text-white/90 transition-colors duration-200" />
                            </button>

                            <button
                                onClick={() => navigateImage("next")}
                                className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/5 backdrop-blur-md hover:bg-white/15 border border-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                            >
                                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white group-hover:text-white/90 transition-colors duration-200" />
                            </button>

                            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden">
                                <img
                                    src={currentImage?.image || "/placeholder.svg"}
                                    alt={currentImage?.title}
                                    loading="lazy"
                                    className={`w-full h-auto max-h-[85vh] object-contain rounded-2xl sm:rounded-3xl transition-all duration-300 ${imageTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
                                        }`}
                                />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <FooterLayout />
        </NavbarLayout>
    )
}
