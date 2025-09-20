import "@styles/home.css"
import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import FooterLayout from "@/layouts/footer-layout"

import { Phone, Mail, Clock, Calendar, AlertCircle, Instagram } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactSection() {
    return (
        
        <NavbarLayout>
            
            <div className="min-h-screen bg-slate-50">
                {/* Hero Contact Section */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Contáctanos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Tu salud y comodidad,
                                <span className="block font-normal text-emerald-600">nuestra prioridad</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Atendemos por citas programadas y emergencias médicas. Estamos aquí para brindarte la mejor atención
                                cuando más lo necesitas.
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
                                {/* Phone Numbers */}
                                <div className="text-center space-y-6 group">
                                    <div className="w-20 h-20 bg-blue-100 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <Phone className="h-10 w-10 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-slate-900 mb-3 group-hover:text-blue-600 transition-all duration-300 group-hover:scale-105 transform cursor-default">
                                            Líneas telefónicas
                                        </h3>
                                        <p className="text-blue-600 font-medium mb-6 group-hover:scale-105 transition-all duration-300 cursor-default">
                                            Llamadas y WhatsApp
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <a
                                                    href="https://wa.me/523223602224"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block font-medium text-xl text-slate-900 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-blue-200 rounded-lg py-3 px-4"
                                                >
                                                    322 360 2224
                                                </a>
                                                <p className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300">
                                                    Línea principal
                                                </p>
                                            </div>
                                            <div>
                                                <a
                                                    href="https://wa.me/523222222222"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block font-medium text-xl text-slate-900 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-blue-200 rounded-lg py-3 px-4"
                                                >
                                                    322 222 2222
                                                </a>
                                                <p className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300">
                                                    Línea secundaria
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="text-center space-y-6 group">
                                    <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <Mail className="h-10 w-10 text-emerald-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-slate-900 mb-3 group-hover:text-emerald-600 transition-all duration-300 group-hover:scale-105 transform cursor-default">
                                            Correo electrónico
                                        </h3>
                                        <p className="text-emerald-600 font-medium mb-6 group-hover:scale-105 transition-all duration-300 cursor-default">
                                            Respuesta en 24 horas
                                        </p>
                                        <a
                                            href="mailto:delpuertoimagen@gmail.com"
                                            className="block font-medium text-xl text-slate-900 hover:text-emerald-600 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-emerald-200 rounded-lg py-3 px-4"
                                        >
                                            delpuertoimagen@gmail.com
                                        </a>
                                        <p className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300">
                                            Consultas y citas
                                        </p>
                                    </div>
                                </div>

                                {/* Social Media */}
                                <div className="text-center space-y-6 md:col-span-2 lg:col-span-1 group">
                                    <div className="w-20 h-20 bg-pink-100 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <Instagram className="h-10 w-10 text-pink-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-light text-slate-900 mb-3 group-hover:text-pink-600 transition-all duration-300 group-hover:scale-105 transform cursor-default">
                                            Redes sociales
                                        </h3>
                                        <p className="text-pink-600 font-medium mb-6 group-hover:scale-105 transition-all duration-300 cursor-default">
                                            Síguenos
                                        </p>
                                        <div className="space-y-4">
                                            <div>
                                                <a
                                                    href="https://www.instagram.com/imagen_del_puerto/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block font-medium text-lg text-slate-900 hover:text-pink-600 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-pink-200 rounded-lg py-3 px-4"
                                                >
                                                    @imagen_del_puerto
                                                </a>
                                                <p className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300">
                                                    Instagram
                                                </p>
                                            </div>
                                            <div>
                                                <a
                                                    href="https://www.facebook.com/p/Imagen-del-Puerto-61560994465369/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block font-medium text-lg text-slate-900 hover:text-blue-600 transition-all duration-300 hover:scale-105 transform border-2 border-transparent hover:border-blue-200 rounded-lg py-3 px-4"
                                                >
                                                    Imagen del Puerto
                                                </a>
                                                <p className="text-sm text-slate-600 hover:text-slate-800 transition-colors duration-300">
                                                    Facebook
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="py-32 bg-blue-50 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Nuestros servicios
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Atención médica
                                <span className="block font-normal text-emerald-600">profesional</span>
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
                                        <h3 className="text-2xl font-light text-slate-900 mb-6">{service.title}</h3>
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
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Tu salud y comodidad, nuestra prioridad
                            </div>
                            <h3 className="text-5xl md:text-6xl font-light text-slate-900 mb-8 text-balance">
                                ¿Necesitas atención
                                <span className="block font-normal text-emerald-600">médica?</span>
                            </h3>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-2xl mx-auto">
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
