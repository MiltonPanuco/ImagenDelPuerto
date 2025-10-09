"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
    image: string
    title: string
    description?: string
}

interface ModernCarouselProps {
    slides?: Slide[]
}

export default function ModernCarousel({ slides = [] }: ModernCarouselProps) {
    const [current, setCurrent] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const touchStartX = useRef<number>(0)
    const touchEndX = useRef<number>(0)
    const intervalTime = 6000

    // Iniciar el auto-slide
    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length)
        }, intervalTime)
    }

    // Reiniciar el tiempo cuando el usuario navega
    const resetTimer = () => {
        startTimer()
    }

    useEffect(() => {
        if (slides.length === 0) return
        startTimer()
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [slides])

    const goToPrevious = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        resetTimer()
    }

    const goToNext = () => {
        setCurrent((prev) => (prev + 1) % slides.length)
        resetTimer()
    }

    const goToSlide = (index: number) => {
        setCurrent(index)
        resetTimer()
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX
    }

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            // Swipe left - go to next
            goToNext()
        }

        if (touchStartX.current - touchEndX.current < -50) {
            // Swipe right - go to previous
            goToPrevious()
        }
    }

    if (slides.length === 0) return null

    return (
        <div
            className="relative w-full h-screen min-h-[500px] max-h-screen overflow-hidden group"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === current ? "opacity-100 scale-100" : "opacity-0 scale-105"
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    {/* Overlay negro oscuro */}
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-blue-900/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <div className="max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white mb-2 sm:mb-3 md:mb-4 lg:mb-6 tracking-tight leading-tight drop-shadow-2xl font-sans px-2">
                                {slide.title}
                            </h2>
                            {slide.description && (
                                <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-blue-100 font-light leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2 drop-shadow-lg">
                                    {slide.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Botón Anterior */}
            <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-95 z-10 touch-manipulation"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </button>

            {/* Botón Siguiente */}
            <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 active:scale-95 z-10 touch-manipulation"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </button>

            {/* Indicadores de navegación */}
            <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 md:space-x-3 lg:space-x-4 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-1.5 sm:h-2 md:h-2.5 lg:h-3 rounded-full transition-all duration-300 touch-manipulation ${index === current
                                ? "bg-white w-6 sm:w-8 md:w-10 lg:w-12"
                                : "bg-white/40 hover:bg-white/60 w-1.5 sm:w-2 md:w-2.5 lg:w-3"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}