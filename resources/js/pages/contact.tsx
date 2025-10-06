import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import * as Icons from "lucide-react"
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import { Phone, Mail } from "lucide-react"
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

interface Atencion {
    id: number
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
}

interface Citas {
    id: number
    title: string
    icon: keyof typeof Icons
    color: string
    descripcion: string
}

interface Social {
    id: number
    title: string
    description: string
    url: string
    color: string
    icon: string
    activo: boolean
}

interface ContactProps {
    atencion: Atencion[]
    citas: Citas[]
    sociales: Social[]
}

export default function ContactSection({ atencion, citas, sociales }: ContactProps) {
    const getColorClasses = (color: string) => {
        const colorMap: Record<string, { gradient: string; hover: string; text: string; bg: string }> = {
            pink: {
                gradient: 'from-pink-50 to-purple-50',
                hover: 'hover:border-pink-300',
                text: 'text-pink-600',
                bg: 'bg-gradient-to-br from-pink-500 to-purple-500'
            },
            blue: {
                gradient: 'from-blue-50 to-indigo-50',
                hover: 'hover:border-blue-300',
                text: 'text-blue-600',
                bg: 'bg-blue-600'
            },
            red: {
                gradient: 'from-red-50 to-orange-50',
                hover: 'hover:border-red-300',
                text: 'text-red-600',
                bg: 'bg-red-600'
            },
            green: {
                gradient: 'from-green-50 to-emerald-50',
                hover: 'hover:border-green-300',
                text: 'text-green-600',
                bg: 'bg-green-600'
            },
            purple: {
                gradient: 'from-purple-50 to-violet-50',
                hover: 'hover:border-purple-300',
                text: 'text-purple-600',
                bg: 'bg-purple-600'
            },
            yellow: {
                gradient: 'from-yellow-50 to-amber-50',
                hover: 'hover:border-yellow-300',
                text: 'text-yellow-600',
                bg: 'bg-yellow-600'
            },
            black: {
                gradient: 'from-gray-50 to-slate-50',
                hover: 'hover:border-gray-300',
                text: 'text-gray-900',
                bg: 'bg-gray-900'
            },
            gray: {
                gradient: 'from-gray-50 to-slate-50',
                hover: 'hover:border-gray-300',
                text: 'text-gray-600',
                bg: 'bg-gray-600'
            }
        };

        return colorMap[color] || colorMap.blue;
    };

    const renderSocialIcon = (iconName: string, className: string) => {
        let IconComponent = FaIcons[iconName as keyof typeof FaIcons];

        if (!IconComponent) {
            IconComponent = SiIcons[iconName as keyof typeof SiIcons];
        }

        if (IconComponent && typeof IconComponent === 'function') {
            return <IconComponent className={className} />;
        }

        return <FaIcons.FaGlobe className={className} />;
    };

    return (
        <NavbarLayout>
            <CarouselLayout slides={sliderContact} />

            <div className="min-h-screen bg-slate-50">
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
                            <Card className="group shadow-lg bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300">
                                <CardContent className="p-8 sm:p-12">
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Phone className="h-8 w-8 text-blue-600" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">Líneas telefónicas</h3>
                                            <p className="text-blue-600 font-medium mb-6">Llamadas y WhatsApp disponibles</p>

                                            <div className="space-y-4">
                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                                                    <div>
                                                        <a
                                                            href="https://wa.me/523223602224"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-lg sm:text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                                                        >
                                                            322 360 2224
                                                        </a>
                                                    </div>
                                                    <a
                                                        href="https://wa.me/523223602224"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full sm:w-auto text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>

                                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                                                    <div>
                                                        <a
                                                            href="https://wa.me/523223100019"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-lg sm:text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                                                        >
                                                            322 310 0019
                                                        </a>
                                                    </div>
                                                    <a
                                                        href="https://wa.me/523223100019"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="w-full sm:w-auto text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                                    >
                                                        WhatsApp
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group shadow-lg bg-white hover:shadow-2xl transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300">
                                <CardContent className="p-8 sm:p-12">
                                    <div className="flex flex-col sm:flex-row items-start gap-6">
                                        <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                            <Mail className="h-8 w-8 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 w-full">
                                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-2">Correo electrónico</h3>
                                            <p className="text-emerald-600 font-medium mb-6">Respuesta en menos de 24 horas</p>

                                            <div className="p-4 bg-slate-50 rounded-xl hover:bg-emerald-50 transition-colors duration-300">
                                                <a
                                                    href="mailto:delpuertoimagen@gmail.com"
                                                    className="text-base sm:text-lg font-semibold text-slate-900 hover:text-emerald-600 transition-colors break-all"
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

                        {sociales && sociales.length > 0 && (
                            <div className="max-w-4xl mx-auto">
                                <div className="text-center mb-12">
                                    <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 mb-3">
                                        Síguenos en redes sociales
                                    </h3>
                                    <p className="text-slate-600">
                                        Mantente al día con nuestras novedades y consejos de salud
                                    </p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {sociales.map((social) => {
                                        const colors = getColorClasses(social.color);

                                        return (
                                            <a
                                                key={social.id}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`group flex items-center gap-4 sm:gap-6 p-6 sm:p-8 bg-gradient-to-br ${colors.gradient} rounded-2xl hover:shadow-xl transition-all duration-300 border-2 border-transparent ${colors.hover}`}
                                            >
                                                <div className={`w-14 h-14 sm:w-16 sm:h-16 ${colors.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                                                    {renderSocialIcon(social.icon, 'h-7 w-7 sm:h-8 sm:w-8 text-white')}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm font-medium ${colors.text} mb-1`}>
                                                        {social.title}
                                                    </p>
                                                    <p className={`text-lg sm:text-xl font-semibold text-slate-900 group-hover:${colors.text} transition-colors truncate`}>
                                                        {social.description}
                                                    </p>
                                                </div>
                                                <div className={`text-slate-400 group-hover:${colors.text} transition-colors flex-shrink-0`}>
                                                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="py-20 sm:py-32 bg-blue-50 overflow-hidden relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-20">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Nuestros servicios
                            </div>
                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-medium text-slate-900 mb-6 text-balance">
                                Atención médica
                                <span className="block font-semibold text-emerald-600">profesional</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
                            {(citas || []).map((item) => {
                                const IconComponent = Icons[item.icon as keyof typeof Icons] || Icons.Calendar;

                                return (
                                    <Card
                                        key={item.id}
                                        className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-${item.color}-500`}
                                    >
                                        <CardContent className="p-8 sm:p-12 text-center">
                                            <div
                                                className={`w-20 h-20 sm:w-24 sm:h-24 bg-${item.color}-500 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                                            >
                                                <IconComponent className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-4 sm:mb-6">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 leading-relaxed text-pretty">{item.descripcion}</p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="py-20 sm:py-32 bg-white">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="mb-12">
                            <div className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">
                                Tu salud y comodidad, nuestra prioridad
                            </div>
                            <h3 className="text-4xl sm:text-5xl md:text-6xl font-medium text-slate-900 mb-6 sm:mb-8 text-balance">
                                ¿Necesitas atención
                                <span className="block font-semibold text-emerald-600">médica?</span>
                            </h3>
                            <p className="text-lg sm:text-xl text-slate-600 mb-12 sm:mb-16 text-pretty leading-relaxed max-w-2xl mx-auto">
                                No esperes más. Contáctanos ahora y recibe la atención médica profesional que mereces.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                            {(atencion || []).map((item) => {
                                const IconComponent = Icons[item.icon as keyof typeof Icons] || Icons.AlertCircle;

                                return (
                                    <div
                                        key={item.id}
                                        className={`flex flex-col items-center p-6 rounded-2xl bg-${item.color}-50 hover:bg-${item.color}-100 transition-colors duration-300`}
                                    >
                                        <div className={`w-16 h-16 bg-${item.color}-600 rounded-xl flex items-center justify-center mb-4`}>
                                            <IconComponent className="h-8 w-8 text-white" />
                                        </div>
                                        <h4 className="font-medium text-slate-900 mb-2">{item.title}</h4>
                                        <p className="text-sm text-slate-600 text-center">{item.descripcion}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>

            <FooterLayout />
        </NavbarLayout>
    )
}