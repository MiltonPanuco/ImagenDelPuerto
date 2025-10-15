"use client"
import { MapPin, Phone, Mail } from "lucide-react"

export default function FooterLayout() {
    const currentYear = new Date().getFullYear()

    const contactInfo = [
        {
            icon: MapPin,
            text: "Puerto Vallarta, México",
            href: null,
        },
        {
            icon: Phone,
            text: "+52 322 360 2224",
            href: "tel:+523223602224",
        },
        {
            icon: Mail,
            text: "delpuertoimagen@gmail.com",
            href: "mailto:delpuertoimagen@gmail.com",
        },
    ]

    const services = [
        {
            name: "Rayos X Digitales",
            url: "/service#services",
        },
        {
            name: "Electrocardiogramas",
            url: "/service#services",
        },
        {
            name: "Renta de Equipo Médico",
            url: "/service#products",
        },
    ]

    return (
        <footer className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
                    {/* Brand section */}
                    <div className="space-y-5 lg:pr-8">
                        <div className="flex items-center space-x-3 group">
                            <img
                                src="/logo_idp.png"
                                alt="Imagen del Puerto Logo"
                                className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-all duration-300 group-hover:scale-105"
                            />
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Imagen del Puerto</h3>
                                <p className="text-[10px] sm:text-xs text-blue-700 font-semibold tracking-wider">SERVICIOS MÉDICOS</p>
                            </div>
                        </div>

                        <p className="text-slate-600 leading-relaxed text-pretty max-w-md text-sm sm:text-base">
                            Brindamos servicios médicos de excelencia con tecnología de vanguardia y atención humana especializada. Tu
                            salud es nuestra prioridad.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="space-y-5">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-1 h-5 sm:h-6 bg-blue-700 rounded-full"></div>
                            Nuestros Servicios
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.url}
                                        className="group flex items-center gap-3 text-slate-600 hover:text-blue-700 transition-all duration-200"
                                    >
                                        <div className="w-2 h-2 bg-blue-700/40 group-hover:bg-blue-700 rounded-full transition-all duration-200 group-hover:scale-125"></div>
                                        <span className="text-sm sm:text-base group-hover:translate-x-1 transition-transform duration-200">
                                            {service.name}
                                        </span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-5">
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                            <div className="w-1 h-5 sm:h-6 bg-blue-700 rounded-full"></div>
                            Contacto
                        </h4>
                        <div className="space-y-3 sm:space-y-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon
                                const ContactElement = contact.href ? "a" : "div"
                                const contactProps = contact.href ? { href: contact.href } : {}

                                return (
                                    <ContactElement
                                        key={index}
                                        {...contactProps}
                                        className={`group flex items-center gap-3 transition-all duration-200 ${contact.href
                                            ? "text-slate-600 hover:text-blue-700 cursor-pointer"
                                            : "text-slate-600"
                                            }`}
                                    >
                                        <div
                                            className={`flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl transition-all duration-200 ${contact.href ? "bg-slate-100 group-hover:bg-blue-50 group-hover:scale-110" : "bg-slate-100"
                                                }`}
                                        >
                                            <Icon
                                                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${contact.href ? "text-slate-600 group-hover:text-blue-700" : "text-slate-600"}`}
                                            />
                                        </div>
                                        <span className="text-sm sm:text-base font-medium break-words">{contact.text}</span>
                                    </ContactElement>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 bg-white/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className="text-xs sm:text-sm text-slate-600 text-center sm:text-left">
                            © {currentYear} Imagen del Puerto. Todos los derechos reservados.
                        </p>

                        <div className="flex items-center gap-4 sm:gap-6">
                            <a
                                href="/privacy"
                                className="text-xs sm:text-sm text-slate-600 hover:text-blue-700 transition-colors duration-200 whitespace-nowrap"
                            >
                                Aviso de privacidad
                            </a>
                            <a
                                href="/terms"
                                className="text-xs sm:text-sm text-slate-600 hover:text-blue-700 transition-colors duration-200 whitespace-nowrap"
                            >
                                Términos y condiciones
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}