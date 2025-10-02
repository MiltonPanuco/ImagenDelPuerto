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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Brand section */}
                    <div className="space-y-6 lg:pr-8">
                        <div className="flex items-center space-x-3 group">
                            <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-700 to-blue-800 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                                <img src="/idp-white.png" alt="Imagen del Puerto Logo" className="w-9 h-9 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground tracking-tight">Imagen del Puerto</h3>
                                <p className="text-xs text-blue-700 font-semibold tracking-wider">SERVICIOS MÉDICOS</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-pretty max-w-md text-sm">
                            Brindamos servicios médicos de excelencia con tecnología de vanguardia y atención humana especializada. Tu
                            salud es nuestra prioridad.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-700 rounded-full"></div>
                            Nuestros Servicios
                        </h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href={service.url}
                                        className="group flex items-center gap-3 text-muted-foreground hover:text-blue-700 transition-all duration-200"
                                    >
                                        <div className="w-2 h-2 bg-blue-700/40 group-hover:bg-blue-700 rounded-full transition-all duration-200 group-hover:scale-125"></div>
                                        <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">{service.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                            <div className="w-1 h-6 bg-blue-700 rounded-full"></div>
                            Contacto
                        </h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon
                                const ContactElement = contact.href ? "a" : "div"
                                const contactProps = contact.href ? { href: contact.href } : {}

                                return (
                                    <ContactElement
                                        key={index}
                                        {...contactProps}
                                        className={`group flex items-center gap-3 transition-all duration-200 ${contact.href
                                            ? "text-muted-foreground hover:text-blue-700 cursor-pointer"
                                            : "text-muted-foreground"
                                            }`}
                                    >
                                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${contact.href
                                            ? "bg-slate-100 group-hover:bg-blue-50 group-hover:scale-110"
                                            : "bg-slate-100"}`}>
                                            <Icon className={`w-5 h-5 transition-colors duration-200 ${contact.href ? "text-slate-600 group-hover:text-blue-700" : "text-slate-600"}`} />
                                        </div>
                                        <span className="text-sm font-medium">{contact.text}</span>
                                    </ContactElement>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-200 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} Imagen del Puerto. Todos los derechos reservados.
                        </p>

                        <div className="flex items-center gap-6">
                            <a href="/privacy" className="text-sm text-muted-foreground hover:text-blue-700 transition-colors duration-200">
                                Aviso de privacidad
                            </a>
                            <a href="/terms" className="text-sm text-muted-foreground hover:text-blue-700 transition-colors duration-200">
                                Términos y condiciones
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}