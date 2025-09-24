import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { Heart, Target, Eye, Stethoscope, Truck, Shield, Users, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sliderAbout = [
    {
        image: "",
        title: "Quiénes Somos",
        description: "Somos un equipo comprometido con brindar servicios de salud confiables y de la más alta calidad.",
    },
    {
        image: "",
        title: "Nuestra Misión",
        description: "Cuidar de tu bienestar ofreciendo atención profesional, tecnología avanzada y un trato humano.",
    },
    {
        image: "",
        title: "Nuestros Valores",
        description: "Trabajamos con honestidad, respeto y dedicación para garantizar tu confianza y seguridad.",
    },
]


export default function AboutSection() {
    return (

        <NavbarLayout>
            <CarouselLayout slides={sliderAbout} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero About Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Nuestra Historia
                            </div>
                            <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Imagen del Puerto,
                                <span className="block font-normal text-emerald-600">cuidando tu salud</span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-4xl mx-auto">
                                Nacimos con una visión clara: acercar los servicios médicos especializados a tu hogar. Sabemos que la
                                salud no espera, y por eso llevamos más de una década brindando atención médica domiciliaria de calidad en
                                Puerto Vallarta y sus alrededores.
                            </p>
                        </div>

                        {/* Story Section */}
                        <div className="max-w-6xl mx-auto mb-32">
                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div className="space-y-8">
                                    <div className="space-y-6">
                                        <h2 className="text-4xl font-light text-slate-900 mb-6">
                                            Una historia de <span className="text-emerald-600 font-normal">compromiso</span>
                                        </h2>
                                        <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                            Todo comenzó cuando nos dimos cuenta de que muchas personas tenían dificultades para trasladarse a
                                            centros médicos para realizarse estudios básicos. Familias enteras que perdían días de trabajo,
                                            adultos mayores con movilidad limitada, y pacientes que necesitaban atención inmediata.
                                        </p>
                                        <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                            Así nació <strong className="text-slate-900">Imagen del Puerto</strong>: un servicio que revoluciona
                                            la atención médica llevando directamente a tu hogar rayos X, electrocardiogramas y todo el equipo
                                            médico que puedas necesitar.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="text-center p-6 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors duration-300">
                                            <div className="text-3xl font-light text-blue-600 mb-2">X+</div>
                                            <div className="text-sm text-slate-600">Años de experiencia</div>
                                        </div>
                                        <div className="text-center p-6 bg-emerald-50 rounded-2xl hover:bg-emerald-100 transition-colors duration-300">
                                            <div className="text-3xl font-light text-emerald-600 mb-2">XXX+</div>
                                            <div className="text-sm text-slate-600">Pacientes atendidos</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                                        <img
                                            src="/professional-radiologist-in-white-coat-with-medica.jpg"
                                            alt="Dr. Radiólogo de Imagen del Puerto"
                                            className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-white rounded-lg p-3 shadow-md">
                                                <div className="text-center">
                                                    <h3 className="text-base font-medium text-slate-900">Dr. Especialista</h3>
                                                    <p className="text-slate-500 text-xs">Radiólogo • 15+ años</p>
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

                {/* Mission & Vision Section */}
                <section className="py-32 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4 ">
                                Nuestros Valores
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Misión y<span className="block font-normal text-emerald-600">visión</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 mb-20">
                            {/* Mission */}
                            <Card className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                        <Target className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-medium text-slate-900 mb-6">Nuestra Misión</h3>
                                    <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                        Brindar servicios médicos especializados de alta calidad en la comodidad del hogar, eliminando
                                        barreras de acceso y garantizando atención oportuna y profesional para toda la familia. Nos
                                        comprometemos a ser el puente entre la tecnología médica avanzada y la calidez humana.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Vision */}
                            <Card className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                        <Eye className="h-12 w-12 text-white" />
                                    </div>
                                    <h3 className="text-3xl font-medium text-slate-900 mb-6">Nuestra Visión</h3>
                                    <p className="text-lg text-slate-600 leading-relaxed text-pretty">
                                        Ser la empresa líder en servicios médicos domiciliarios en la región, reconocida por nuestra
                                        excelencia, innovación y compromiso con la salud comunitaria. Aspiramos a transformar la experiencia
                                        de atención médica, haciendo que cada hogar sea un espacio de cuidado y bienestar.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Lo que ofrecemos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Servicios médicos
                                <span className="block font-normal text-emerald-600">a domicilio</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Llevamos la tecnología médica más avanzada directamente a tu hogar, con el mismo nivel de calidad que
                                encontrarías en cualquier hospital.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Stethoscope,
                                    title: "Rayos X",
                                    description: "Estudios radiológicos completos en la comodidad de tu hogar",
                                    color: "bg-blue-600",
                                    bgColor: "bg-blue-50",
                                    hoverColor: "hover:bg-blue-100",
                                },
                                {
                                    icon: Heart,
                                    title: "Electrocardiogramas",
                                    description: "Monitoreo cardíaco profesional con equipos de última generación",
                                    color: "bg-emerald-600",
                                    bgColor: "bg-emerald-50",
                                    hoverColor: "hover:bg-emerald-100",
                                },
                                {
                                    icon: Truck,
                                    title: "Renta de Equipo",
                                    description: "Sillas de ruedas, muletas, camillas y más equipo médico",
                                    color: "bg-pink-600",
                                    bgColor: "bg-pink-50",
                                    hoverColor: "hover:bg-pink-100",
                                },
                                {
                                    icon: Shield,
                                    title: "Atención 24/7",
                                    description: "Disponibles para emergencias y citas programadas",
                                    color: "bg-purple-600",
                                    bgColor: "bg-purple-50",
                                    hoverColor: "hover:bg-purple-100",
                                },
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className={`text-center p-8 rounded-3xl ${service.bgColor} ${service.hoverColor} transition-all duration-300 group hover:scale-105`}
                                >
                                    <div
                                        className={`w-20 h-20 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                                    >
                                        <service.icon className="h-10 w-10 text-white" />
                                    </div>
                                    <h3 className="text-xl font-medium text-slate-900 mb-4">{service.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed text-pretty">{service.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>

            <FooterLayout />
        </NavbarLayout>

    )
}
