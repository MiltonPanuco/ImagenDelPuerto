import "../../css/global.css";
import "../../css/home.css";

import NavbarLayout from '../layouts/navbar-layout';
import FooterLayout from '../layouts/footer-layout';


import { Card, CardContent } from "@/components/ui/card"
import { Activity, Stethoscope, Shield, Users, Zap, Star, Award } from "lucide-react"

export default function Home() {

    return (
        <NavbarLayout>

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
                            <Card className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                        <Zap className="h-12 w-12 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-light text-slate-900 mb-4">Rayos X</h3>
                                    <h4 className="text-lg font-medium text-blue-600 mb-6">Digitales</h4>
                                    <p className="text-slate-600 leading-relaxed mb-8 text-pretty">
                                        Tecnología de imagen digital avanzada para diagnósticos precisos con menor exposición a radiación.
                                    </p>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                                            Resultados inmediatos
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                                            Alta resolución
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                                            Menor radiación
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                        <Activity className="h-12 w-12 text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-light text-slate-900 mb-4">Electrocardiogramas</h3>
                                    <h4 className="text-lg font-medium text-emerald-600 mb-6">Especializados</h4>
                                    <p className="text-slate-600 leading-relaxed mb-8 text-pretty">
                                        Monitoreo cardíaco completo con equipos de última generación y análisis médico especializado.
                                    </p>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
                                            ECG en reposo
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
                                            Interpretación médica
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-sm animate-pulse"></div>
                                            Reporte detallado
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-300">
                                <CardContent className="p-12 text-center">
                                    <div className="w-24 h-24 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                                        <Stethoscope className="h-12 w-12 text-amber-600" />
                                    </div>
                                    <h3 className="text-2xl font-light text-slate-900 mb-4">Equipos</h3>
                                    <h4 className="text-lg font-medium text-amber-600 mb-6">Médicos</h4>
                                    <p className="text-slate-600 leading-relaxed mb-8 text-pretty">
                                        Renta de equipos médicos certificados para rehabilitación y cuidado domiciliario.
                                    </p>
                                    <div className="space-y-3 text-left">
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm"></div>
                                            Sillas de ruedas
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm"></div>
                                            Camillas especializadas
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-600">
                                            <div className="w-2 h-2 bg-amber-500 rounded-full shadow-sm"></div>
                                            Muletas y andadores
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
                            <div className="absolute -left-16  top-0 bottom-0 w-80 bg-gradient-to-r from-blue-50 via-blue-50/90 to-transparent z-10 pointer-events-none blur-lg"></div>
                            <div className="absolute -right-16 top-0 bottom-0 w-80 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10 pointer-events-none blur-lg"></div>

                            <div className="flex animate-scroll-fast">
                                {[...Array(3)].map((_, setIndex) =>
                                    [
                                        {
                                            name: "Rafa Samaniego",
                                            role: "Paciente",
                                            content:
                                                "La precisión en los diagnósticos y la calidez humana del equipo médico superaron todas mis expectativas. Tecnología de vanguardia con trato personalizado.",
                                            rating: 5,
                                        },
                                        {
                                            name: "Carlos Rodríguez",
                                            role: "Cliente",
                                            content:
                                                "El servicio de renta de equipos médicos fue impecable. Equipos en perfecto estado y asesoría profesional durante todo el proceso de recuperación.",
                                            rating: 5,
                                        },
                                        {
                                            name: "Ana López",
                                            role: "Paciente",
                                            content:
                                                "Los electrocardiogramas fueron realizados con la más alta profesionalidad. Explicaciones claras y resultados que me dieron total tranquilidad.",
                                            rating: 5,
                                        },
                                        {
                                            name: "Roberto Silva",
                                            role: "Cliente",
                                            content:
                                                "Excelente atención y equipos de primera calidad. El personal siempre dispuesto a ayudar y explicar cada procedimiento con detalle.",
                                            rating: 5,
                                        },
                                        {
                                            name: "Laura Martínez",
                                            role: "Paciente",
                                            content:
                                                "Rapidez en los resultados y profesionalismo excepcional. Me sentí en las mejores manos desde el primer momento.",
                                            rating: 5,
                                        },
                                    ].map((testimonial, index) => (
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
                                                <p className="text-slate-600 leading-relaxed mb-6 text-pretty italic">"{testimonial.content}"</p>
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
                            {[
                                {
                                    icon: Shield,
                                    title: "Tecnología certificada",
                                    description:
                                        "Equipos médicos de última generación con certificaciones internacionales y mantenimiento preventivo constante.",
                                    color: "bg-blue-600",
                                },
                                {
                                    icon: Users,
                                    title: "Equipo especializado",
                                    description:
                                        "Profesionales certificados con años de experiencia que garantizan la excelencia en cada procedimiento médico.",
                                    color: "bg-emerald-600",
                                },
                                {
                                    icon: Award,
                                    title: "Resultados inmediatos",
                                    description:
                                        "Diagnósticos rápidos y precisos con reportes detallados entregados en el menor tiempo posible.",
                                    color: "bg-amber-600",
                                },
                            ].map((feature, index) => (
                                <Card
                                    key={index}
                                    className="group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300"
                                >
                                    <CardContent className="p-8 text-center">
                                        <div
                                            className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
                                        >
                                            <feature.icon className="h-10 w-10 text-white" />
                                        </div>
                                        <h3 className="text-2xl font-medium text-slate-900 mb-4">{feature.title}</h3>
                                        <p className="text-slate-600 leading-relaxed text-pretty">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center">
                            <div className="flex items-center justify-center gap-8 text-slate-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Disponible 24/7</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Servicio móvil</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm">Resultados inmediatos</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
        
        <FooterLayout />
        </NavbarLayout>

    )
}
