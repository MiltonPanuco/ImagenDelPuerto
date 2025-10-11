import "@styles/global.css"

import NavbarLayout from "@/layouts/navbar-layout"
import CarouselLayout from "@/layouts/carousel-layout"
import FooterLayout from "@/layouts/footer-layout"

import * as Icons from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface CarruselItem {
    id: number
    image: string
    title1?: string
    title2?: string
    description?: string
    activo: boolean
}

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

interface Estadisticas {
    title: string
    color: string
    descripcion: string
}

interface AboutProps {
    carruselAbout: CarruselItem[]
    mision: Mision[]
    vision: Vision[]
    ofrecemos: Ofrecemos[]
    estadisticas: Estadisticas[]
}

export default function AboutSection({ carruselAbout = [], mision, vision, ofrecemos, estadisticas }: AboutProps) {
    return (

        <NavbarLayout>
            <CarouselLayout slides={carruselAbout} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero About Section */}
                <section className="py-12 sm:py-20 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 sm:mb-4">
                                Nuestra Historia
                            </div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-2">
                                Imagen del Puerto,
                                <span className="block font-semibold text-emerald-600">cuidando tu salud</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-12 sm:mb-16 text-pretty leading-relaxed max-w-4xl mx-auto px-2">
                                Nacimos con una visión clara: acercar los servicios médicos especializados a tu hogar. Sabemos que la
                                salud no espera, y por eso llevamos más de una década brindando atención médica domiciliaria de calidad en
                                Puerto Vallarta y sus alrededores.
                            </p>
                        </div>

                        {/* Story Section */}
                        <div className="max-w-6xl mx-auto mb-16 sm:mb-24 md:mb-32">
                            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                                <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
                                    <div className="space-y-4 sm:space-y-6">
                                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-slate-900 mb-4 sm:mb-6 text-center lg:text-left px-2">
                                            Una historia de <span className="text-emerald-600 font-semibold">cuidado y compromiso</span>
                                        </h2>
                                        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-justify px-2">
                                            Todo comenzó con un deseo muy simple: ayudar a quienes más lo necesitan. Nos dimos cuenta de que muchas personas enfrentaban la dificultad de trasladarse a centros médicos, perdiendo días de trabajo, esfuerzo y tiempo valioso junto a sus seres queridos. Adultos mayores con movilidad limitada, familias preocupadas por la salud de sus hijos, pacientes que necesitaban atención rápida y confiable… cada historia nos tocaba el corazón.
                                        </p>
                                        <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-justify px-2">
                                            Fue así como nació <strong className="text-slate-900 font-semibold">Imagen del Puerto</strong>, un servicio que lleva la atención médica directamente a tu hogar. Desde rayos X hasta electrocardiogramas y todo el equipo que puedas necesitar, trabajamos para que recibir cuidados de calidad no sea un sacrificio, sino un alivio. <strong className="text-emerald-600 font-semibold">Tu salud y comodidad, nuestra prioridad</strong>, porque queremos que cada paciente se sienta seguro, acompañado y valorado.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 px-2">
                                        {estadisticas.map((item: any) => (
                                            <div
                                                key={item.id}
                                                className={`text-center p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl transition-colors duration-300 bg-${item.color}-50 hover:bg-${item.color}-100`}
                                            >
                                                <div className={`text-xl sm:text-2xl md:text-3xl font-medium mb-1 sm:mb-2 text-${item.color}-500`}>
                                                    {item.title}+
                                                </div>
                                                <div className="text-xs md:text-sm text-slate-600">
                                                    {item.descripcion}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                <div className="relative order-1 lg:order-2 mt-0">
                                    <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl group">
                                        <img src="storage/about/especialista.jpeg" alt="Dr. Radiólogo de Imagen del Puerto" className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6">
                                            <div className="bg-white rounded-lg p-2.5 sm:p-3 shadow-md">
                                                <div className="text-center">
                                                    <h3 className="text-xs sm:text-sm md:text-base font-medium text-slate-900">Lic. Fidel Correa Rodríguez</h3>
                                                    <p className="text-slate-500 text-[10px] sm:text-xs">Licenciado En Radiología</p>
                                                    <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-slate-100">
                                                        <p className="text-slate-600 text-[10px] sm:text-xs italic">
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

                {/* Mision Section */}
                <section className="py-12 sm:py-20 md:py-32 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 sm:mb-4">
                                Nuestros Valores
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-2">
                                Nuestra <span className="font-semibold text-emerald-600">Misión</span> y <span className="font-semibold text-emerald-600">Visión</span>
                            </h2>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20">
                            {mision.map((item, index) => {
                                const IconComponent = Icons[item.icon];

                                return (
                                    <Card key={index} className={`group shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 hover:border-${item.color}-500`} >
                                        <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                                            <div className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-${item.color}-600 group-hover:bg-${item.color}-700 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                                {IconComponent ? <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white" /> : null}
                                            </div>
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-900 mb-3 sm:mb-4 md:mb-6">{item.title}</h3>
                                            <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed text-pretty">
                                                {item.descripcion}
                                            </p>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Services Overview */}
                <section className="py-12 sm:py-20 md:py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16 md:mb-20">
                            <div className="inline-block text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3 sm:mb-4">
                                Lo que ofrecemos
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-slate-900 mb-4 sm:mb-6 text-balance px-2">
                                Servicios médicos
                                <span className="block font-semibold text-emerald-600">a domicilio</span>
                            </h2>
                            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-12 sm:mb-16 text-pretty leading-relaxed max-w-3xl mx-auto px-2">
                                Llevamos la tecnología médica más avanzada directamente a tu hogar, con el mismo nivel de calidad que
                                encontrarías en cualquier hospital.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                            {ofrecemos.map((item, index) => {
                                const IconComponent = Icons[item.icon];

                                return (
                                    <div key={index} className={`text-center p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-${item.color}-50 hover:bg-${item.color}-100 transition-all duration-300 group hover:scale-105`}>
                                        <div
                                            className={`w-16 h-16 sm:w-20 sm:h-20 bg-${item.color}-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                                            {IconComponent ? <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-white" /> : null}
                                        </div>
                                        <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-3 sm:mb-4">{item.title}</h3>
                                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty">{item.descripcion}</p>
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