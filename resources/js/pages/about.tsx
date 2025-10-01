import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { Heart, Target, Eye, Stethoscope, Truck, Shield, Users, Award } from "lucide-react"
import * as Icons from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sliderAbout = [
    {
        image: "storage/about/carrusel1.jpg",
        title: "Quiénes Somos",
        description: "Somos un equipo comprometido con brindar servicios de salud confiables y de la más alta calidad.",
    },
    {
        image: "storage/about/carrusel2.jpg",
        title: "Nuestra Misión",
        description: "Cuidar de tu bienestar ofreciendo atención profesional, tecnología avanzada y un trato humano.",
    },
    {
        image: "storage/about/carrusel3.jpg",
        title: "Nuestros Valores",
        description: "Trabajamos con honestidad, respeto y dedicación para garantizar tu confianza y seguridad.",
    },
]

interface Mision {
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
}

interface Vision {
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
}

interface Ofrecemos {
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
}

interface AboutProps {
    mision: Mision[]
    vision: Vision[]
    ofrecemos: Ofrecemos[]
}

export default function AboutSection({ mision, vision, ofrecemos }: AboutProps) {
    return (

        <NavbarLayout>
            <CarouselLayout slides={sliderAbout} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero About Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Nuestra Historia
                            </div>
                            <h1 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Imagen del Puerto,
                                <span className="block font-semibold text-emerald-600">cuidando tu salud</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-4xl mx-auto">
                                Nacimos con una visión clara: acercar los servicios médicos especializados a tu hogar. Sabemos que la
                                salud no espera, y por eso llevamos más de una década brindando atención médica domiciliaria de calidad en
                                Puerto Vallarta y sus alrededores.
                            </p>
                        </div>

                        {/* Story Section */}
                        <div className="max-w-6xl mx-auto mb-32">
                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <h2 className="text-3xl md:text-4xl font-medium text-slate-900 mb-6 text-center lg:text-left">
                                            Una historia de <span className="text-emerald-600 font-semibold">cuidado y compromiso</span>
                                        </h2>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed text-justify">
                                            Todo comenzó con un deseo muy simple: ayudar a quienes más lo necesitan. Nos dimos cuenta de que muchas personas enfrentaban la dificultad de trasladarse a centros médicos, perdiendo días de trabajo, esfuerzo y tiempo valioso junto a sus seres queridos. Adultos mayores con movilidad limitada, familias preocupadas por la salud de sus hijos, pacientes que necesitaban atención rápida y confiable… cada historia nos tocaba el corazón.
                                        </p>
                                        <p className="text-base md:text-lg text-slate-600 leading-relaxed text-justify">
                                            Fue así como nació <strong className="text-slate-900 font-semibold">Imagen del Puerto</strong>, un servicio que lleva la atención médica directamente a tu hogar. Desde rayos X hasta electrocardiogramas y todo el equipo que puedas necesitar, trabajamos para que recibir cuidados de calidad no sea un sacrificio, sino un alivio. <strong className="text-emerald-600 font-semibold">Tu salud y comodidad, nuestra prioridad</strong>, porque queremos que cada paciente se sienta seguro, acompañado y valorado.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                                        <div className="text-center p-4 md:p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-300">
                                            <div className="text-2xl md:text-3xl font-medium text-blue-600 mb-2">X+</div>
                                            <div className="text-xs md:text-sm text-slate-600">Años de experiencia</div>
                                        </div>
                                        <div className="text-center p-4 md:p-6 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors duration-300">
                                            <div className="text-2xl md:text-3xl font-medium text-emerald-600 mb-2">XXX+</div>
                                            <div className="text-xs md:text-sm text-slate-600">Pacientes atendidos</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative mt-8 lg:mt-0">
                                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                                        <img
                                            src="storage/about/especialista.jpeg"
                                            alt="Dr. Radiólogo de Imagen del Puerto"
                                            className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
                                            <div className="bg-white rounded-lg p-3 shadow-md">
                                                <div className="text-center">
                                                    <h3 className="text-sm md:text-base font-medium text-slate-900">Dr. Nombre Apellido</h3>
                                                    <p className="text-slate-500 text-xs">Lorem Ipsum • XX+ años</p>
                                                    <div className="mt-2 pt-2 border-t border-slate-100">
                                                        <p className="text-slate-600 text-xs italic">
                                                            "Tu salud y comodidad, nuestra prioridad"
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mision & Vision Section */}
                <section className="py-32 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 ">
                                Nuestros Valores
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Misión y<span className="block font-semibold text-emerald-600">visión</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 mb-20">

                            {/* Mision */}
                            {mision.map((mision, index) => {
                                const IconComponent = Icons[mision.icon]
                                const colorClasses = {
                                    blue: "bg-blue-600",
                                    emerald: "bg-emerald-600",
                                    amber: "bg-amber-600",
                                    red: "bg-red-600",
                                    purple: "bg-purple-600",
                                    teal: "bg-teal-600",
                                }

                                const hoverBorderClasses = {
                                    blue: "hover:border-blue-500",
                                    emerald: "hover:border-emerald-500",
                                    amber: "hover:border-amber-500",
                                    red: "hover:border-red-500",
                                    purple: "hover:border-purple-500",
                                    teal: "hover:border-teal-500",
                                }

                                return (
                                    <Card
                                        key={index}
                                        className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 ${hoverBorderClasses[mision.color] || "hover:border-blue-500"}`}
                                    >
                                        <CardContent className="p-12 text-center">
                                            <div className={`w-24 h-24 ${colorClasses[mision.color] || "bg-blue-600"} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                                {IconComponent ? <IconComponent className="h-12 w-12 text-white" /> : null}
                                            </div>
                                            <h3 className="text-3xl font-semibold text-slate-900 mb-6">{mision.title}</h3>
                                            <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                                {mision.descripcion}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            })}

                            {/* Vision */}
                            {vision.map((vision, index) => {
                                const IconComponent = Icons[vision.icon]
                                const colorClasses = {
                                    blue: "bg-blue-600",
                                    emerald: "bg-emerald-600",
                                    amber: "bg-amber-600",
                                    red: "bg-red-600",
                                    purple: "bg-purple-600",
                                    teal: "bg-teal-600",
                                }

                                const hoverBorderClasses = {
                                    blue: "hover:border-blue-500",
                                    emerald: "hover:border-emerald-500",
                                    amber: "hover:border-amber-500",
                                    red: "hover:border-red-500",
                                    purple: "hover:border-purple-500",
                                    teal: "hover:border-teal-500",
                                }

                                return (
                                    <Card
                                        key={index}
                                        className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 ${hoverBorderClasses[vision.color] || "hover:border-blue-500"}`}
                                    >
                                        <CardContent className="p-12 text-center">
                                            <div className={`w-24 h-24 ${colorClasses[vision.color] || "bg-emerald-500"} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                                {IconComponent ? <IconComponent className="h-12 w-12 text-white" /> : null}
                                            </div>
                                            <h3 className="text-3xl font-semibold text-slate-900 mb-6">{vision.title}</h3>
                                            <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                                {vision.descripcion}
                                            </p>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Lo que ofrecemos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Servicios médicos
                                <span className="block font-semibold text-emerald-600">a domicilio</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-3xl mx-auto">
                                Llevamos la tecnología médica más avanzada directamente a tu hogar, con el mismo nivel de calidad que
                                encontrarías en cualquier hospital.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {ofrecemos.map((ofrecemos, index) => {
                                const IconComponent = Icons[ofrecemos.icon]
                                const colorClasses = {
                                    blue: "bg-blue-600",
                                    emerald: "bg-emerald-600",
                                    pink: "bg-pink-600",
                                    purple: "bg-purple-600",
                                }

                                const bgColorClasses = {
                                    blue: "bg-blue-50 hover:bg-blue-100",
                                    emerald: "bg-emerald-50 hover:bg-emerald-100",
                                    pink: "bg-pink-50 hover:bg-pink-100",
                                    purple: "bg-purple-50 hover:bg-purple-100",
                                }

                                return (
                                    <div
                                        key={index}
                                        className={`text-center p-8 rounded-3xl ${bgColorClasses[ofrecemos.color] || "bg-blue-50 hover:bg-blue-100"} transition-all duration-300 group hover:scale-105`}
                                    >
                                        <div
                                            className={`w-20 h-20 ${colorClasses[ofrecemos.color] || "bg-blue-600"} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                                        >
                                            {IconComponent ? <IconComponent className="h-10 w-10 text-white" /> : null}
                                        </div>
                                        <h3 className="text-xl font-semibold text-slate-900 mb-4">{ofrecemos.title}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed text-pretty">{ofrecemos.descripcion}</p>
                                    </div>
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