import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import { Phone, Mail, Clock, Calendar, AlertCircle, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const sliderContact = [
    {
        image: "storage/contact/carrusel-1.jpeg",
        title: "Escríbenos",
        description: "Envíanos un mensaje y recibe la atención que necesitas de forma rápida y personalizada.",
    },
    {
        image: "storage/contact/carrusel-2.jpg",
        title: "Llámanos",
        description: "Comunícate con nuestro equipo para resolver tus dudas o agendar una cita fácilmente.",
    },
    {
        image: "storage/contact/carrusel-3.jpg",
        title: "Conócenos",
        description: "Descubre más sobre nuestros servicios y la manera en que podemos ayudarte.",
    },
]


export default function ContactSection() {
    return (

        <NavbarLayout>
            <CarouselLayout slides={sliderContact} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero Contact Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Contáctanos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Estamos aquí
                                <span className="block font-semibold text-emerald-600">para ayudarte</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-3xl mx-auto">
                                Múltiples formas de contactarnos. Elige la que más te convenga y recibe atención personalizada.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
                            {/* Phone Card */}
                            <Card className="group shadow-lg bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300">
                                <CardContent className="p-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Phone className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Líneas telefónicas</h3>
                                            <p className="text-blue-600 font-medium mb-6">Llamadas y WhatsApp disponibles</p>
                                            
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                                                    <div>
                                                        <a
                                                            href="https://wa.me/523223602224"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                                                        >
                                                            322 360 2224
                                                        </a>
                                                    </div>
                                                    <a
                                                        href="https://wa.me/523223602224"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>

                                                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                                                    <div>
                                                        <a
                                                            href="https://wa.me/523222222222"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                                                        >
                                                            322 310 0019
                                                        </a>
                                                    </div>
                                                    <a
                                                        href="https://wa.me/523223100019"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Email Card */}
                            <Card className="group shadow-lg bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300">
                                <CardContent className="p-12">
                                    <div className="flex items-start gap-6">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Mail className="h-8 w-8 text-emerald-600" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Correo electrónico</h3>
                                            <p className="text-emerald-600 font-medium mb-6">Respuesta en menos de 24 horas</p>
                                            
                                            <div className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors duration-300">
                                                <a
                                                    href="mailto:delpuertoimagen@gmail.com"
                                                    className="text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors break-all"
                                                >
                                                    delpuertoimagen@gmail.com
                                                </a>
                                                <p className="text-sm text-slate-600 mt-2">Consultas generales y citas</p>
                                            </div>

                                            <a
                                                href="mailto:delpuertoimagen@gmail.com"
                                                className="mt-4 block w-full text-center px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
                                            >
                                                Enviar correo
                                            </a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Social Media Section */}
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-semibold text-slate-900 mb-3">Síguenos en redes sociales</h3>
                                <p className="text-slate-600">Mantente al día con nuestras novedades y consejos de salud</p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <a
                                    href="https://www.instagram.com/imagen_del_puerto/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-pink-300"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Instagram className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-pink-600 mb-1">Instagram</p>
                                        <p className="text-xl font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">
                                            @imagen_del_puerto
                                        </p>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-pink-600 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>

                                <a
                                    href="https://www.facebook.com/p/Imagen-del-Puerto-61560994465369/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-6 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-300"
                                >
                                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-blue-600 mb-1">Facebook</p>
                                        <p className="text-xl font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                            Imagen del Puerto
                                        </p>
                                    </div>
                                    <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-32 bg-blue-50 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Nuestros servicios
                            </div>
                            <h2 className="text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Atención médica
                                <span className="block font-semibold text-emerald-600">profesional</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12">
                            {[
                                {
                                    icon: Calendar,
                                    title: "Citas programadas",
                                    description:
                                        "Agenda tu consulta con anticipación para recibir la mejor atención personalizada y profesional.",
                                    color: "bg-blue-600",
                                    hoverColor: "hover:border-blue-300",
                                },
                                {
                                    icon: AlertCircle,
                                    title: "Emergencias médicas",
                                    description:
                                        "Atención inmediata las 24 horas para situaciones que requieren intervención médica urgente.",
                                    color: "bg-emerald-600",
                                    hoverColor: "hover:border-emerald-300",
                                },
                            ].map((service, index) => (
                                <Card
                                    key={index}
                                    className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 ${service.hoverColor}`}
                                >
                                    <CardContent className="p-12 text-center">
                                        <div
                                            className={`w-24 h-24 ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                                        >
                                            <service.icon className="h-12 w-12 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-semibold text-slate-900 mb-6">{service.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-pretty">{service.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-12">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Tu salud y comodidad, nuestra prioridad
                            </div>
                            <h3 className="text-5xl md:text-6xl font-medium text-slate-900 mb-8 text-balance">
                                ¿Necesitas atención
                                <span className="block font-semibold text-emerald-600">médica?</span>
                            </h3>
                            <p className="text-xl text-slate-600 mb-16 text-pretty leading-relaxed max-w-2xl mx-auto">
                                No esperes más. Contáctanos ahora y recibe la atención médica profesional que mereces.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="flex flex-col items-center p-6 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <Clock className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Respuesta inmediata</h4>
                                <p className="text-sm text-slate-600 text-center">Atención rápida cuando más lo necesitas</p>
                            </div>

                            <div className="flex flex-col items-center p-6 rounded-2xl bg-emerald-50 hover:bg-emerald-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-emerald-600 rounded-xl flex items-center justify-center mb-4">
                                    <AlertCircle className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Profesionales certificados</h4>
                                <p className="text-sm text-slate-600 text-center">Equipo médico altamente calificado</p>
                            </div>

                            <div className="flex flex-col items-center p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
                                    <Phone className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Disponibilidad 24/7</h4>
                                <p className="text-sm text-slate-600 text-center">Siempre listos para ayudarte</p>
                            </div>

                            <div className="flex flex-col items-center p-6 rounded-2xl bg-purple-50 hover:bg-purple-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Citas flexibles</h4>
                                <p className="text-sm text-slate-600 text-center">Horarios que se adaptan a ti</p>
                            </div>

                            <div className="flex flex-col items-center p-6 rounded-2xl bg-rose-50 hover:bg-rose-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-rose-600 rounded-xl flex items-center justify-center mb-4">
                                    <Mail className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Seguimiento personalizado</h4>
                                <p className="text-sm text-slate-600 text-center">Cuidamos tu salud paso a paso</p>
                            </div>

                            <div className="flex flex-col items-center p-6 rounded-2xl bg-teal-50 hover:bg-teal-100 transition-colors duration-300">
                                <div className="w-16 h-16 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                                    <Instagram className="h-8 w-8 text-white" />
                                </div>
                                <h4 className="font-medium text-slate-900 mb-2">Tecnología avanzada</h4>
                                <p className="text-sm text-slate-600 text-center">Equipos médicos de última generación</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <FooterLayout />
        </NavbarLayout>
    )
}