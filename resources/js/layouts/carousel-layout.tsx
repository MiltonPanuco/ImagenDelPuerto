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
            className="relative w-full h-screen overflow-hidden group"
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
                    <div className="absolute inset-0 flex items-center justify-center text-center px-4 py-8 sm:px-6 md:px-8 lg:px-12">
                        <div className="max-w-4xl w-full">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-white mb-3 sm:mb-4 md:mb-6 tracking-tight leading-tight sm:leading-tight md:leading-none font-sans">
                                {slide.title}
                            </h2>
                            {slide.description && (
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto px-2">
                                    {slide.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={goToPrevious}
                className="absolute left-3 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-70 md:opacity-0 md:group-hover:opacity-100 active:scale-95 hidden [@media(hover:hover)]:flex"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-3 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-70 md:opacity-0 md:group-hover:opacity-100 active:scale-95 hidden [@media(hover:hover)]:flex"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 md:space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-300 ${index === current ? "bg-white w-8 sm:w-10 md:w-12" : "bg-white/40 hover:bg-white/60 w-2 sm:w-2.5 md:w-3"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
