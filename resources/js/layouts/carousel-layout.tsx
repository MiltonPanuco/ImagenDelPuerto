"use client"

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

    if (slides.length === 0) return null

    return (
        <div className="relative w-full h-screen overflow-hidden group">
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-blue-900/40 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-center p-8 md:p-12">
                        <div className="max-w-4xl">
                            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-none font-sans">
                                {slide.title}
                            </h2>
                            {slide.description && (
                                <p className="text-xl md:text-2xl lg:text-3xl text-blue-100 font-light leading-relaxed max-w-3xl mx-auto">
                                    {slide.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={goToPrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-7 h-7" />
            </button>

            <button
                onClick={goToNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Next slide"
            >
                <ChevronRight className="w-7 h-7" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${index === current ? "bg-white w-12" : "bg-white/40 hover:bg-white/60 w-3"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
