import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { useState } from "react"
import { Heart, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
const sliderGallery = [
    {
        image: "",
        title: "Nuestro Equipo",
        description: "Contamos con tecnología de última generación para garantizar la mejor calidad en cada captura.",
    },
    {
        image: "",
        title: "Recuerdos Digitales",
        description: "Guardamos y atesoramos cada momento siempre.",
    },
    {
        image: "",
        title: "",
        description: "",
    },
]


const xrayTools = [
    {
        id: 1,
        name: "Equipo de Rayos X Portátil",
        description: "Sistema de radiografía digital de alta resolución para estudios domiciliarios",
        image: "https://i.pinimg.com/736x/73/f7/fe/73f7fec6c4061b06435ccd568ae30ea4.jpg",
        specs: ["Resolución: 3000x3000 DPI", "Peso: 15kg", "Batería: 8 horas"],
    },
    {
        id: 2,
        name: "Detector Digital",
        description: "Panel detector inalámbrico para captura instantánea de imágenes",
        image: "https://i.pinimg.com/736x/34/5d/ef/345def90862a95bc4a3806d64e263972.jpg",
        specs: ["Tamaño: 35x43cm", "Resolución: 150μm", "Conexión: WiFi"],
    },
    {
        id: 3,
        name: "Chasis Radiográfico",
        description: "Sistema de protección y posicionamiento para estudios precisos",
        image: "https://i.pinimg.com/736x/d4/fe/a4/d4fea40ca0708bbd50c246b659d9f2ea.jpg",
        specs: ["Material: Fibra de carbono", "Tamaños: 18x24, 24x30cm", "Peso: 2kg"],
    },
]

const ekgTools = [
    {
        id: 1,
        name: "Electrocardiógrafo 12 Derivaciones",
        description: "Monitor cardíaco profesional con análisis automático e interpretación",
        image: "https://i.pinimg.com/736x/6d/41/5f/6d415febe20315930d382d339c3a4330.jpg",
        specs: ["12 derivaciones", 'Pantalla táctil 10"', "Impresora térmica"],
    },
    {
        id: 2,
        name: "Electrodos Desechables",
        description: "Electrodos de alta conductividad para estudios cardíacos precisos",
        image: "https://i.pinimg.com/736x/bb/3e/1f/bb3e1fbf0e70d0c72249e95dd67537e9.jpg",
        specs: ["Gel conductor", "Adhesivo hipoalergénico", "Pack 100 unidades"],
    },
    {
        id: 3,
        name: "Monitor Holter 24h",
        description: "Sistema de monitoreo cardíaco continuo para estudios prolongados",
        image: "https://i.pinimg.com/736x/f9/53/af/f953afe1f34a7d14f1f986aa7da8ff8f.jpg",
        specs: ["Grabación 24-48h", "Memoria 1GB", "Análisis automático"],
    },
]

const digitalMemories = [
    {
        id: 1,
        image: "https://i.pinimg.com/1200x/40/37/ac/4037acca2e9bc0997db3d6b4df1cedef.jpg",
        title: "Servicio a Domicilio",
        date: "Marzo 2024",
    },
    {
        id: 2,
        image: "https://i.pinimg.com/736x/60/c4/40/60c4405c95cae7e84c6b525961b6e202.jpg",
        title: "Atención Personalizada",
        date: "Febrero 2024",
    },
    {
        id: 3,
        image: "https://i.pinimg.com/736x/6b/89/5a/6b895a3271904c43ca998a953a148207.jpg",
        title: "Tecnología Avanzada",
        date: "Enero 2024",
    },
    {
        id: 4,
        image: "https://i.pinimg.com/736x/e0/1e/ff/e01eff09ae245f30ad467f10be82c00a.jpg",
        title: "Cuidado Familiar",
        date: "Diciembre 2023",
    },
    {
        id: 5,
        image: "https://i.pinimg.com/736x/5d/b0/62/5db062de797bdd63314f3674133df4b9.jpg",
        title: "Profesionalismo",
        date: "Noviembre 2023",
    },
    {
        id: 6,
        image: "https://i.pinimg.com/736x/df/f6/3c/dff63cfe150341f00837941cd15a9a7d.jpg",
        title: "Resultados Exitosos",
        date: "Octubre 2023",
    },
    {
        id: 7,
        image: "https://i.pinimg.com/736x/fa/f7/6c/faf76c84afb97b9372d41975c885874b.jpg",
        title: "Consulta Domiciliaria",
        date: "Septiembre 2023",
    },
    {
        id: 8,
        image: "https://i.pinimg.com/1200x/2c/0f/a7/2c0fa7f8b4afe0f5b9c5d5ecfc858a0e.jpg",
        title: "Equipos Avanzados",
        date: "Agosto 2023",
    },
    {
        id: 9,
        image: "https://i.pinimg.com/736x/13/9a/5a/139a5a3685de20c57d64999788a5770a.jpg",
        title: "Cuidado Especializado",
        date: "Julio 2023",
    },
]

export default function MedicalGallery() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
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
                <section className="pt-32 pb-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Galería Médica
                            </div>
                            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Nuestro
                                <span className="block font-normal text-emerald-600">equipamiento</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-4xl mx-auto">
                                Tecnología médica de vanguardia llevada directamente a tu hogar. Conoce los equipos que hacen posible
                                nuestros servicios de diagnóstico domiciliario con la más alta calidad y profesionalismo.
                            </p>
                        </div>
                    </div>
                </section>

                {/* X-Ray Tools Section */}
                <section id="xray" className="py-32 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Equipos de Diagnóstico
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Rayos X<span className="block font-normal text-emerald-600">profesionales</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Equipos de radiografía digital de última generación que garantizan estudios precisos y seguros en la
                                comodidad de tu hogar.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {xrayTools.map((tool) => (
                                <Card key={tool.id} className="group shadow-lg bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl overflow-hidden border border-slate-200">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={tool.image || "/placeholder.svg"}
                                            alt={tool.name}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                    </div>
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-all duration-300 shadow-lg">
                                            <Stethoscope className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-slate-900 mb-4">{tool.name}</h3>
                                        <p className="text-slate-600 leading-relaxed text-pretty mb-6 text-left">{tool.description}</p>
                                        <div className="space-y-2 text-left">
                                            {tool.specs.map((spec, index) => (
                                                <div key={index} className="text-sm text-slate-600 flex items-center">
                                                    <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3" />
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* EKG Tools Section */}
                <section id="ekg" className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Monitoreo Cardíaco
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Electrocardiogramas
                                <span className="block font-normal text-emerald-600">avanzados</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Tecnología de monitoreo cardíaco de precisión médica para estudios completos y análisis detallados del
                                corazón.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {ekgTools.map((tool) => (
                                <Card key={tool.id} className="group shadow-lg bg-white hover:shadow-xl hover:scale-[1.02] transition-all duration-300 rounded-3xl overflow-hidden border border-slate-200">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={tool.image || "/placeholder.svg"}
                                            alt={tool.name}
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                    </div>
                                    <CardContent className="p-8 text-center">
                                        <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-105 transition-all duration-300 shadow-lg">
                                            <Heart className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-slate-900 mb-4">{tool.name}</h3>
                                        <p className="text-slate-600 leading-relaxed text-pretty mb-6 text-left">{tool.description}</p>
                                        <div className="space-y-2 text-left">
                                            {tool.specs.map((spec, index) => (
                                                <div key={index} className="text-sm text-slate-600 flex items-center">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3" />
                                                    {spec}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Digital Memories Section */}
                <section id="memories" className="py-32 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Nuestra Historia
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Recuerdos
                                <span className="block font-normal text-emerald-600">digitales</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Momentos especiales capturados durante nuestros servicios médicos domiciliarios. Cada imagen cuenta la
                                historia de nuestro compromiso con tu salud y bienestar.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                                            className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500 grayscale group-hover:grayscale-0"
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
                            <div className="text-center mt-12">
                                <Button onClick={handleShowMore} variant="outline" className="px-8 py-3 text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-900 transition-colors duration-200 rounded-full bg-transparent">
                                    Mostrar Más...
                                </Button>
                            </div>
                        )}
                    </div>
                </section>

                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-[98vw] sm:max-w-7xl w-full p-0 bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden max-h-[98vh] shadow-2xl">
                        <div className="relative">
                            <button onClick={() => navigateImage("prev")} className="absolute left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/5 backdrop-blur-md hover:bg-white/15 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <ChevronLeft className="h-7 w-7 text-white group-hover:text-white/90 transition-colors duration-200" />
                            </button>

                            <button onClick={() => navigateImage("next")} className="absolute right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 bg-white/5 backdrop-blur-md hover:bg-white/15 border border-white/10 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                <ChevronRight className="h-7 w-7 text-white group-hover:text-white/90 transition-colors duration-200" />
                            </button>

                            <div className="relative rounded-3xl overflow-hidden">
                                <img
                                    src={currentImage?.image || "/placeholder.svg"}
                                    alt={currentImage?.title}
                                    className={`w-full h-auto max-h-[85vh] object-contain rounded-3xl transition-all duration-300 ${imageTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"
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
