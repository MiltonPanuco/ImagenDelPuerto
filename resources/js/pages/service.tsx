import "@styles/global.css"

import NavbarLayout from '../layouts/navbar-layout';
import CarouselLayout from '../layouts/carousel-layout';
import FooterLayout from '../layouts/footer-layout';

import { useState } from "react"
import { Droplets, Bed, ArrowUp, Church as Crutch, Wind, Armchair as Wheelchair, Stethoscope, Activity, ChevronLeft, ChevronRight, Star, Clock, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"


const sliderService = [
    {
        image: "",
        title: "Rayos X",
        description: "Tu centro de confianza para radiografías especializadas",
    },
    {
        image: "",
        title: "Electrocardiogramas",
        description: "Monitoreo preciso de tu corazón para un diagnóstico seguro",
    },
    {
        image: "",
        title: "Equipo Médico",
        description: "Tecnología de calidad para el cuidado y bienestar de tu salud",
    },
]


function ImageCarousel({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (

        <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-2xl transition-all duration-500">
            <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Navigation buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </>
            )}

            {/* Navigation dots */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

function ImageCarouselEquipment({ images, title }: { images: string[]; title: string }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextImage = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length)
    }

    const prevImage = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    return (
        <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-2xl transition-all duration-500">
            <img
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`${title} - Imagen ${currentIndex + 1}`}
                className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Navigation buttons */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevImage}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button
                        onClick={nextImage}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-700 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </>
            )}

            {/* Navigation dots */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${index === currentIndex ? "bg-white scale-125 shadow-lg" : "bg-white/60 hover:bg-white/80"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default function ServicesSection() {
    const diagnosticServices = [
        {
            icon: Stethoscope,
            title: "Rayos X",
            subtitle: "Estudios Radiológicos Completos",
            images: [
                "/portable-x-ray-machine-in-medical-setting.jpg",
                "/chest-x-ray-being-taken-at-home.jpg",
                "/digital-x-ray-equipment-portable.jpg",
                "/x-ray-technician-with-portable-equipment.jpg",
            ],
            description:
                "Realizamos estudios radiológicos de tórax, abdomen, extremidades y columna vertebral con equipos portátiles de última generación.",
            features: [
                "Rayos X de tórax y abdomen",
                "Estudios de extremidades",
                "Radiografías de columna",
                "Entrega de resultados en 24 horas",
                "Interpretación por radiólogos certificados",
            ],
            color: "bg-blue-600",
            bgColor: "bg-blue-50",
            hoverColor: "hover:bg-blue-100",
            rating: 4.9,
            deliveryTime: "24h",
        },
        {
            icon: Activity,
            title: "Electrocardiogramas",
            subtitle: "Monitoreo Cardíaco Profesional",
            images: [
                "/ecg-electrocardiogram-machine-portable.jpg",
                "/patient-getting-ecg-test-at-home.jpg",
                "/digital-ecg-monitor-12-lead.jpg",
                "/holter-monitor-cardiac-device.jpg",
            ],
            description:
                "Evaluación completa de la actividad eléctrica del corazón con electrocardiógrafos digitales de 12 derivaciones.",
            features: [
                "ECG de 12 derivaciones",
                "Monitoreo Holter 24 horas",
                "Pruebas de esfuerzo básicas",
                "Interpretación cardiológica",
                "Reportes digitales inmediatos",
            ],
            color: "bg-emerald-600",
            bgColor: "bg-emerald-50",
            hoverColor: "hover:bg-emerald-100",
            rating: 4.8,
            deliveryTime: "Inmediato",
        },
    ]

    const medicalEquipment = [
        {
            icon: Droplets,
            title: "Bombas de Infusión",
            subtitle: "Administración Precisa de Medicamentos",
            images: [
                "/medical-infusion-pump-iv-drip.jpg",
                "/programmable-infusion-pump-hospital-grade.jpg",
                "/portable-iv-infusion-pump-with-display.jpg",
                "/infusion-pump-setup-home-care.jpg",
            ],
            description:
                "Bombas de infusión programables para administración controlada de medicamentos, sueros y nutrición parenteral.",
            features: [
                "Control de flujo programable",
                "Alarmas de seguridad integradas",
                "Batería de larga duración",
                "Compatible con múltiples medicamentos",
                "Capacitación incluida para familiares",
            ],
            color: "bg-pink-600",
            bgColor: "bg-pink-50",
            hoverColor: "hover:bg-pink-100",
            badgeColor: "bg-pink-600",
            rating: 4.9,
            availability: "Disponible",
        },
        {
            icon: Bed,
            title: "Camas de Hospital",
            subtitle: "Confort y Funcionalidad Médica",
            images: [
                "/storage/app/public/service/camilla-1.jpeg",
                "/storage/app/public/service/camilla-2.jpeg",
                "/storage/app/public/service/camilla-3.jpeg",
                "/storage/app/public/service/camilla-4.jpeg",
            ],
            description:
                "Camas hospitalarias eléctricas y manuales con colchones antiescaras. Diseñadas para brindar comodidad al paciente.",
            features: [
                "Altura y posición ajustables",
                "Colchones antiescaras incluidos",
                "Barandales de seguridad",
                "Ruedas con frenos",
                "Fácil limpieza y desinfección",
            ],
            color: "bg-purple-600",
            bgColor: "bg-purple-50",
            hoverColor: "hover:bg-purple-100",
            badgeColor: "bg-purple-600",
            rating: 4.7,
            availability: "Disponible",
        },
        {
            icon: ArrowUp,
            title: "Eleva Piernas",
            subtitle: "Mejora la Circulación y Comodidad",
            images: [
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
            ],
            description:
                "Dispositivos ergonómicos para elevación de extremidades inferiores, ideales para problemas circulatorios.",
            features: [
                "Múltiples ángulos de elevación",
                "Acolchado ergonómico",
                "Estructura resistente y ligera",
                "Fácil transporte y almacenamiento",
                "Recomendado por fisioterapeutas",
            ],
            color: "bg-indigo-600",
            bgColor: "bg-indigo-50",
            hoverColor: "hover:bg-indigo-100",
            badgeColor: "bg-indigo-600",
            rating: 4.6,
            availability: "Disponible",
        },
        {
            icon: Crutch,
            title: "Muletas",
            subtitle: "Apoyo Seguro para la Movilidad",
            images: [
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
            ],
            description:
                "Muletas axilares y de antebrazo en diferentes tamaños, fabricadas con materiales ligeros y resistentes.",
            features: [
                "Altura totalmente ajustable",
                "Empuñaduras ergonómicas acolchadas",
                "Puntas antideslizantes",
                "Materiales ligeros y resistentes",
                "Disponibles en diferentes tamaños",
            ],
            color: "bg-teal-600",
            bgColor: "bg-teal-50",
            hoverColor: "hover:bg-teal-100",
            badgeColor: "bg-teal-600",
            rating: 4.5,
            availability: "Disponible",
        },
        {
            icon: Wind,
            title: "Concentradores de Oxígeno",
            subtitle: "Oxigenoterapia Domiciliaria Confiable",
            images: [
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
            ],
            description:
                "Concentradores de oxígeno de alta eficiencia para terapia respiratoria continua. Equipos silenciosos con alarmas.",
            features: [
                "Concentración de oxígeno hasta 95%",
                "Funcionamiento silencioso",
                "Alarmas de seguridad integradas",
                "Bajo consumo energético",
                "Mantenimiento técnico incluido",
            ],
            color: "bg-cyan-600",
            bgColor: "bg-cyan-50",
            hoverColor: "hover:bg-cyan-100",
            badgeColor: "bg-cyan-600",
            rating: 4.8,
            availability: "Limitado",
        },
        {
            icon: Wheelchair,
            title: "Sillas de Ruedas",
            subtitle: "Movilidad e Independencia",
            images: [
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
            ],
            description:
                "Sillas de ruedas manuales y eléctricas para diferentes necesidades de movilidad. Desde modelos básicos hasta especializadas.",
            features: [
                "Modelos manuales y eléctricos",
                "Asientos y respaldos ajustables",
                "Reposapiés removibles",
                "Frenos de seguridad",
                "Accesorios adicionales disponibles",
            ],
            color: "bg-orange-600",
            bgColor: "bg-orange-50",
            hoverColor: "hover:bg-orange-100",
            badgeColor: "bg-orange-600",
            rating: 4.7,
            availability: "Disponible",
        },
    ]

    const sendWhatsAppMessage = (productName: string, isService = false) => {
        const phoneNumber = "523223602224"
        const message = `Hola, me interesa ${productName}, quisiera información sobre ${isService ? "el servicio" : "el producto"}`
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
    }

    return (

        <NavbarLayout>
            <CarouselLayout slides={sliderService} />

            <div className="min-h-screen bg-slate-50">
                {/* Hero Services Section */}
                <section className="min-h-screen bg-white flex items-center justify-center">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                            Nuestros Servicios
                        </div>
                        <h1 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                            Equipos médicos y
                            <span className="block font-normal text-emerald-600">
                                estudios especializados
                            </span>
                        </h1>
                        <p className="text-xl text-slate-600 text-pretty font-light leading-relaxed max-w-4xl mx-auto">
                            Ofrecemos una amplia gama de servicios médicos domiciliarios, renta y venta de
                            equipo especializado. Cada servicio está respaldado por profesionales
                            certificados y tecnología de vanguardia para garantizar la mejor atención
                            en la comodidad de tu hogar.
                        </p>
                    </div>
                </section>


                {/* Diagnostic Services */}
                <section className="py-32 bg-blue-50" id="services">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Estudios Diagnósticos
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Diagnósticos precisos
                                <span className="block font-normal text-emerald-600">en tu hogar</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Realizamos estudios médicos especializados con la misma calidad y precisión que encontrarías en cualquier
                                hospital, pero en la comodidad de tu casa.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {diagnosticServices.map((service, index) => (
                                <Card
                                    key={index}
                                    className="group relative overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-700 rounded-3xl hover:scale-[1.02]"
                                >
                                    {/* Floating icon */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <div
                                            className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                                        >
                                            <service.icon className="h-8 w-8 text-white" />
                                        </div>
                                    </div>

                                    <CardContent className="p-0">
                                        {/* Image section with overlay */}
                                        <div className="relative p-6 pb-4">
                                            <ImageCarousel images={service.images} title={service.title} />
                                        </div>

                                        {/* Content section */}
                                        <div className="px-6 pb-6">
                                            {/* Rating and delivery time */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="text-sm font-medium text-slate-700">{service.rating}</span>
                                                </div>
                                                <div className="flex items-center space-x-1 text-emerald-600">
                                                    <Clock className="h-4 w-4" />
                                                    <span className="text-sm font-medium">{service.deliveryTime}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-light text-slate-900 mb-2">{service.title}</h3>
                                            <p className="text-lg font-medium text-emerald-600 mb-4">{service.subtitle}</p>
                                            <p className="text-slate-600 leading-relaxed text-pretty mb-6">{service.description}</p>

                                            {/* Features with enhanced styling */}
                                            <div className="space-y-3">
                                                <h4 className="text-lg font-medium text-slate-900 mb-4 flex items-center">
                                                    <Shield className="h-5 w-5 text-emerald-500 mr-2" />
                                                    Incluye:
                                                </h4>
                                                <div className="grid grid-cols-1 gap-2">
                                                    {service.features.map((feature, featureIndex) => (
                                                        <div
                                                            key={featureIndex}
                                                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200"
                                                        >
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0"></div>
                                                            <span className="text-slate-600 text-sm">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action button */}
                                            <button
                                                onClick={() => sendWhatsAppMessage(service.title, true)}
                                                className={`w-full mt-6 ${service.color} text-white py-3 px-6 rounded-2xl font-medium hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 cursor-pointer`}
                                            >
                                                <span>Solicitar Servicio</span>
                                                <Zap className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Medical Equipment Rental */}
                <section className="py-32 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20" id="products">
                            <div className="inline-block text-sm font-medium text-blue-600 uppercase tracking-wider mb-4">
                                Renta de Equipo Médico
                            </div>
                            <h2 className="text-5xl md:text-6xl font-light text-slate-900 mb-6 text-balance">
                                Todo el equipo que
                                <span className="block font-normal text-emerald-600">necesitas</span>
                            </h2>
                            <p className="text-xl text-slate-600 mb-16 text-pretty font-light leading-relaxed max-w-3xl mx-auto">
                                Contamos con el equipo médico más completo para cuidados domiciliarios, rehabilitación y tratamientos
                                especializados. Todos nuestros equipos están certificados y reciben mantenimiento regular.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {medicalEquipment.map((equipment, index) => (
                                <Card
                                    key={index}
                                    className="group relative overflow-hidden bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-3xl hover:scale-105"
                                >
                                    <CardContent className="p-0">
                                        {/* Image section */}
                                        <div className="relative p-4 pb-2">
                                            <div className="relative">
                                                <ImageCarouselEquipment images={equipment.images} title={equipment.title} />
                                                <div className="absolute top-3 right-3 z-20">
                                                    <div
                                                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${equipment.availability === "Disponible"
                                                            ? "bg-emerald-500/90 text-white"
                                                            : "bg-orange-500/90 text-white"
                                                            }`}
                                                    >
                                                        <div
                                                            className={`w-2 h-2 rounded-full ${equipment.availability === "Disponible" ? "bg-white" : "bg-white"
                                                                }`}
                                                        ></div>
                                                        <span>{equipment.availability}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content section */}
                                        <div className="px-4 pb-4">
                                            {/* Rating */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-1">
                                                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-medium text-slate-600">{equipment.rating}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-light text-slate-900 mb-1">{equipment.title}</h3>
                                            <p className="text-sm font-medium text-emerald-600 mb-3">{equipment.subtitle}</p>
                                            <p className="text-slate-600 leading-relaxed text-pretty mb-4 text-xs">{equipment.description}</p>

                                            {/* Features */}
                                            <div className="space-y-2 mb-4">
                                                <h4 className="text-xs font-medium text-slate-900 mb-2">Características principales:</h4>
                                                <div className="space-y-1">
                                                    {equipment.features.slice(0, 3).map((feature, featureIndex) => (
                                                        <div key={featureIndex} className="flex items-start space-x-2">
                                                            <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5"></div>
                                                            <span className="text-slate-600 text-xs leading-relaxed">{feature}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Action buttons */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => sendWhatsAppMessage(equipment.title)}
                                                    className={`flex-1 ${equipment.color} text-white py-2 px-3 rounded-xl text-xs font-medium hover:opacity-90 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer`}
                                                >
                                                    Rentar
                                                </button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

            </div>

            <FooterLayout />
        </NavbarLayout>


    )
}
