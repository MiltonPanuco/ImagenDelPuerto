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

    const services = ["Rayos X Digitales", "Electrocardiogramas", "Renta de Equipo Médico"]

    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            {/* Main footer content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12">
                    {/* Brand section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-700 rounded-xl shadow-lg">
                                <img src="/idp-white.png" alt="Imagen del Puerto Logo" className="w-8 h-8 object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-foreground">Imagen del Puerto</h3>
                                <p className="text-sm text-muted-foreground font-medium">SERVICIOS MÉDICOS</p>
                            </div>
                        </div>

                        <p className="text-muted-foreground leading-relaxed text-pretty max-w-md">
                            Brindamos servicios médicos de excelencia con tecnología de vanguardia y atención humana especializada. Tu
                            salud es nuestra prioridad.
                        </p>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">Nuestros Servicios</h4>
                        <ul className="space-y-3">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <a
                                        href="#"
                                        className="flex items-center gap-3 text-muted-foreground hover:text-blue-700 transition-colors duration-200"
                                    >
                                        <div className="w-1.5 h-1.5 bg-blue-700 rounded-full"></div>
                                        <span className="text-sm">{service}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-foreground">Contacto</h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, index) => {
                                const Icon = contact.icon
                                const ContactElement = contact.href ? "a" : "div"
                                const contactProps = contact.href ? { href: contact.href } : {}

                                return (
                                    <ContactElement
                                        key={index}
                                        {...contactProps}
                                        className={`flex items-center gap-3 transition-colors duration-200 ${contact.href
                                                ? "text-muted-foreground hover:text-blue-700 cursor-pointer"
                                                : "text-muted-foreground"
                                            }`}
                                    >
                                        <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                                            <Icon className="w-4 h-4 text-blue-700" />
                                        </div>
                                        <span className="text-sm">{contact.text}</span>
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
                            <a
                                href="/privacy"
                                className="text-sm text-muted-foreground hover:text-blue-700 transition-colors duration-200"
                            >
                                Aviso de privacidad
                            </a>
                            <a
                                href="/terms"
                                className="text-sm text-muted-foreground hover:text-blue-700 transition-colors duration-200"
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
