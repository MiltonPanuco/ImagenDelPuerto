import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import ServicioVarioTable from './ServicioVarioTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Servicios Varios',
    },
];

interface ServicioVario {
    id: number;
    title: string;
    subtitle?: string;
    descripcion: string;
    imagenes: string[];
    caracteristicas: string[];
    activo: boolean;
    orden: number;
}

interface PaginatedServiciosVarios {
    data: ServicioVario[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface ServiciosVariosProps {
    servicios: PaginatedServiciosVarios;
}

export default function ServiciosVarios({ servicios }: ServiciosVariosProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios Varios" />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">
                        Listado de Servicios Varios
                    </h1>
                    <Link href={route('cms.servicios-varios.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-neutral-800 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nuevo Servicio Varios
                        </button>
                    </Link>
                </div>

                <ServicioVarioTable
                    servicios={servicios}
                    resourceRoute="cms.servicios-varios"
                />
            </div>
        </AppLayout>
    );
}