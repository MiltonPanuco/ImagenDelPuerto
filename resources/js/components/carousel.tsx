"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface CarouselSlide {
    id: number
    image: string
    title: string
    subtitle: string
}

const slides: CarouselSlide[] = [
    {
        id: 1,
        image: "/medical-xray-equipment.jpg",
        title: "Servicios de Rayos X",
        subtitle: "Equipos de radiología de última generación para diagnósticos precisos",
    },
    {
        id: 2,
        image: "/medical-electrocardiogram.jpg",
        title: "Electrocardiogramas",
        subtitle: "Estudios cardíacos profesionales con tecnología avanzada",
    },
    {
        id: 3,
        image: "/medical-equipment-rental.jpg",
        title: "Renta de Equipo Médico",
        subtitle: "Sillas de ruedas, camillas y material hospitalario de calidad",
    },
]

export default function ImageCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)

    // Función para ir al siguiente slide
    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, [])

    // Función para ir a un slide específico
    const goToSlide = useCallback((index: number) => {
        setCurrentSlide(index)
    }, [])

    // Auto-play del carrusel
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            nextSlide()
        }, 8000) // 8 segundos

        return () => clearInterval(interval)
    }, [nextSlide, isAutoPlaying])

    // Pausar auto-play cuando el usuario interactúa
    const handleUserInteraction = useCallback((action: () => void) => {
        setIsAutoPlaying(false)
        action()

        // Reiniciar auto-play después de 1 segundo
        setTimeout(() => {
            setIsAutoPlaying(true)
        }, 1000)
    }, [])

    return (
        <div className="relative w-screen h-screen overflow-hidden">
            {/* Contenedor de slides */}
            <div
                className="flex transition-transform duration-1000 ease-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="relative flex-shrink-0 w-screen h-screen">
                        {/* Imagen de fondo */}
                        <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />

                        <div className="absolute inset-0 bg-black/50" />

                        <div className="absolute bottom-16 left-8 sm:left-12 lg:left-16 max-w-2xl">
                            <div className="space-y-4">
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight text-balance drop-shadow-2xl">
                                    <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                                        {slide.title}
                                    </span>
                                </h1>
                                <p className="text-lg sm:text-xl text-white font-medium leading-relaxed max-w-lg drop-shadow-lg">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handleUserInteraction(() => goToSlide(index))}
                        className={cn(
                            "transition-all duration-300 ease-out",
                            currentSlide === index ? "w-8 h-2" : "w-2 h-2 hover:scale-125",
                        )}
                        aria-label={`Ir al slide ${index + 1}`}
                    >
                        <div
                            className={cn(
                                "w-full h-full rounded-full transition-all duration-300",
                                currentSlide === index ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60",
                            )}
                        />
                    </button>
                ))}
            </div>

            <div className="absolute top-0 left-0 w-full h-0.5 bg-black/20">
                <div
                    className="h-full bg-white/60 transition-all duration-1000 ease-out"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                />
            </div>
        </div>
    )
}
