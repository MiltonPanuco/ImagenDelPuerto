import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { secciones } from './cms/catalogos';
import AppLayout from '@/layouts/app-layout';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard' },
];

export default function Profile() {
    const { auth } = usePage<SharedData>().props;
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="relative min-h-screen w-full overflow-hidden">
                {/* RX Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://i.pinimg.com/1200x/12/ba/08/12ba08fce6591362e1247da5600c0ac3.jpg"
                        alt="X-Ray Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/85 to-slate-900/90"></div>
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
                    <div className="max-w-5xl w-full text-center space-y-12">
                        {/* Welcome Message - Main Focus */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-center gap-4">
                                <div className="h-px w-24 bg-gradient-to-r from-transparent to-cyan-400"></div>
                                <Sparkles className="w-10 h-10 text-cyan-400 animate-pulse" />
                                <div className="h-px w-24 bg-gradient-to-l from-transparent to-cyan-400"></div>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight">
                                Bienvenido,<br />
                                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                                    {auth.user?.name}
                                </span>
                            </h1>
                            
                            <div className="space-y-3">
                                <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light">
                                    Panel de Gestión de Contenido
                                </p>
                                <p className="text-xl md:text-2xl lg:text-3xl text-cyan-300 font-medium">
                                    Imagen del Puerto
                                </p>
                            </div>
                        </div>

                        {/* Time Display - Secondary */}
                        <div className="pt-8 space-y-2">
                            <div className="text-4xl md:text-5xl font-bold text-white/70 tabular-nums">
                                {formatTime(currentTime)}
                            </div>
                            <p className="text-cyan-300/60 text-sm md:text-base tracking-wide">
                                {formatDate(currentTime)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            </div>
        </AppLayout>
    );
}