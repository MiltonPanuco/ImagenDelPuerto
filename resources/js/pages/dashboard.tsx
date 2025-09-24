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

            <div className="mb-6 md:p-15 p-10">
                <h1 className="text-2xl font-semibold mb-6">Bienvenido, {auth.user?.name}</h1>
                <p className="mb-10 text-lg text-slate-700">Desde el panel de administración puedes gestionar los contenidos del sitio web.</p>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {secciones.map((seccion, idx) => {
                        const IconComponent = seccion.icon;

                        return (
                            <Link href={seccion.url} key={idx}>
                                <Card className={`group shadow-lg cursor-pointer bg-white hover:shadow-2xl hover:scale-105 transition-all duration-500 rounded-3xl overflow-hidden border border-slate-200 hover:border-${seccion.color}-300`}>
                                    <CardContent className="text-center">
                                        <h4 className={`text-lg font-medium text-${seccion.color}-500 mb-6`}>Gestionar</h4>
                                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg bg-${seccion.color}-100 border border-${seccion.color}-300 text-${seccion.color}-500`}>
                                            {IconComponent ? <IconComponent className={`h-10 w-10 text-${seccion.color}-500`} /> : null}
                                        </div>
                                        <h3 className="text-2xl font-light text-slate-900 mb-4">{seccion.seccion}</h3>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </AppLayout>
    );
}
