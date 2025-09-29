import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Card, CardContent } from "@/components/ui/card";
import { Link } from '@inertiajs/react';
import { secciones } from './cms/catalogos';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard' },
];


export default function Profile() {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="CMS" />

            <div className="relative h-screen w-screen overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://i.pinimg.com/1200x/fc/56/61/fc5661a10791784bac5a42a4f07bbd62.jpg"
                        alt="Equipos médicos Imagen del Puerto"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70"></div>
                </div>

                <div className="relative z-10 h-full flex items-center justify-center px-6">
                    <div className="text-center max-w-5xl mx-auto">
                        <div className="space-y-12">
                            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold text-white text-balance text-shadow-elegant tracking-wide leading-none">
                                Imagen del Puerto
                            </h1>
                            <div className="w-24 h-px bg-white mx-auto"></div>
                            <p className="mb-0 font-sans text-xl md:text-2xl lg:text-3xl text-white/85 text-pretty font-bold tracking-widest uppercase text-shadow-elegant">
                                Centro de Diagnóstico Médico
                            </p>
                            <p className="text-white/85 text-lg font-light">Bienvenido, {auth.user?.name}</p>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-px h-16 bg-white"></div>
                </div>
            </div>
        </AppLayout>
    );
}
