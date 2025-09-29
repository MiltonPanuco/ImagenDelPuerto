import "@styles/home.css"
import "@styles/global.css"
import { testimonials } from "../data/testimonials"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { Card, CardContent } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { Star } from "lucide-react"

const getRandomTestimonials = () => {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 5)
}

const sliderHome = [
    {
        image: "",
        title: "Imagen del Puerto",
        description: "Tu salud y comodidad, nuestra prioridad",
    },
    {
        image: "",
        title: "Cuidado al Alcance",
        description: "Resuelve tus dudas y accede a nuestros servicios de salud sin complicaciones, rápido y seguro.",
    },
    {
        image: "",
        title: "Bienestar para ti",
        description: "Explora consejos, recomendaciones y acompañamiento médico que se adaptan a tu estilo de vida.",
    },
]

interface Servicio {
    icon: keyof typeof Icons
    title: string
    description: string
}

interface Eleccion {
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
    caracteristicas: string[]
}

interface HomeProps {
    servicios: Servicio[]
    elecciones: Eleccion[]
}

export default function Home({ servicios, elecciones = [] }: HomeProps) {
    const randomTestimonials = getRandomTestimonials()

    return (
        <NavbarLayout>
            <CarouselLayout slides={sliderHome} />

            <div className="min-h-screen bg-slate-50">
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Nuestros servicios
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Excelencia en cada
                                <span className="block font-normal text-blue-600">diagnóstico</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-8">
                            {servicios.map((servicio, index) => {
                                const IconComponent = Icons[servicio.icon]

                                return (
                                    <Card
                                        key={index}
                                        className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-${servicio.color}-500`}
                                    >
                                        <CardContent className="p-12 text-center">
                                            <div
                                                className={`w-24 h-24 bg-${servicio.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                                            >
                                                {IconComponent ? <IconComponent className={`h-12 w-12 text-${servicio.color}-500`} /> : null}
                                            </div>
                                            <h3 className="text-2xl font-light text-slate-900 mb-4">{servicio.servicio}</h3>
                                            <h4 className={`text-lg font-medium text-${servicio.color}-500 mb-6`}>{servicio.categoria}</h4>
                                            <p className="text-slate-600 leading-relaxed mb-8 text-pretty">{servicio.descripcion}</p>
                                            <div className="space-y-3 text-left">
                                                {servicio.caracteristicas.map((caracteristica, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                                                        <div className={`w-2 h-2 bg-${servicio.color}-500 rounded-full shadow-sm`}></div>
                                                        {caracteristica}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-blue-50 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Testimonios
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Confianza que
                                <span className="block font-normal text-emerald-600">trasciende</span>
                            </h2>
                        </div>

                        <div className="relative">
                            <div className="absolute -left-50 top-0 bottom-0 w-80 bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent z-10 pointer-events-none blur-lg"></div>
                            <div className="absolute -right-50 top-0 bottom-0 w-80 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10 pointer-events-none blur-lg"></div>

                            <div className="flex animate-scroll-fast">
                                {[...Array(3)].map((_, setIndex) =>
                                    randomTestimonials.map((testimonial, index) => (
                                        <Card
                                            key={`${setIndex}-${index}`}
                                            className="flex-shrink-0 w-96 shadow-lg bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer border border-slate-200 hover:border-emerald-300 mr-6"
                                        >
                                            <CardContent className="p-8">
                                                <div className="flex items-center gap-1 mb-6">
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    ))}
                                                </div>
                                                <p className="text-slate-600 leading-relaxed mb-6 text-pretty italic">
                                                    "{testimonial.content}"
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-medium text-sm">
                                                            {testimonial.name
                                                                .split(" ")
                                                                .map((n) => n[0])
                                                                .join("")}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-900">{testimonial.name}</p>
                                                        <p className="text-sm text-slate-600">{testimonial.role}</p>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )),
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Por qué elegirnos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 text-balance">
                                Innovación al
                                <span className="block font-normal text-emerald-600">servicio de tu salud</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Combinamos tecnología médica de vanguardia con un enfoque humano excepcional para brindarte la mejor
                                atención médica.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12 mb-20">
                            {elecciones && elecciones.length > 0 ? (
                                elecciones.map((eleccion, index) => {
                                    const IconComponent = Icons[eleccion.icon]
                                    const colorClasses = {
                                        blue: "bg-blue-600",
                                        emerald: "bg-emerald-600",
                                        amber: "bg-amber-600",
                                        red: "bg-red-600",
                                        purple: "bg-purple-600",
                                        teal: "bg-teal-600",
                                    }

                                    return (
                                        <Card
                                            key={index}
                                            className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300"
                                        >
                                            <CardContent className="p-8 text-center">
                                                <div
                                                    className={`w-20 h-20 ${colorClasses[eleccion.color] || "bg-blue-600"} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                                                >
                                                    {IconComponent ? <IconComponent className="h-10 w-10 text-white" /> : null}
                                                </div>
                                                {/* ✅ CAMBIADO: eleccion.eleccion -> eleccion.title */}
                                                <h3 className="text-2xl font-medium text-slate-900 mb-4">{eleccion.title}</h3>
                                                <p className="text-slate-600 leading-relaxed text-pretty">{eleccion.descripcion}</p>
                                            </CardContent>
                                        </Card>
                                    )
                                })
                            ) : (
                                <div className="col-span-3 text-center text-slate-500 py-12">
                                    <p>No hay elecciones disponibles en este momento.</p>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            {elecciones && elecciones.length > 0 && (
                                <div className="flex items-center justify-center gap-8 text-slate-500 flex-wrap">
                                    {elecciones.map((eleccion, index) => {
                                        const colorDot = {
                                            blue: "bg-blue-500",
                                            emerald: "bg-emerald-500",
                                            amber: "bg-amber-500",
                                            red: "bg-red-500",
                                            purple: "bg-purple-500",
                                            teal: "bg-teal-500",
                                        }

                                        return eleccion.caracteristicas && eleccion.caracteristicas.length > 0
                                            ? eleccion.caracteristicas.map((caracteristica, idx) => (
                                                <div key={`${index}-${idx}`} className="flex items-center gap-2">
                                                    <div
                                                        className={`w-2 h-2 ${colorDot[eleccion.color] || "bg-blue-500"} rounded-full animate-pulse`}
                                                    ></div>
                                                    <span className="text-sm">{caracteristica}</span>
                                                </div>
                                            ))
                                            : null
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </div>

            <FooterLayout />
        </NavbarLayout>
    )
}