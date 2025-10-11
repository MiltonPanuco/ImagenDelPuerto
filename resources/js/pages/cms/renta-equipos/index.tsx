import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import RentaEquipoTable from './RentaEquipoTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Renta de Equipos',
    },
];

interface RentaEquipo {
    id: number;
    title: string;
    subtitle?: string;
    description?: string;
    images?: string[];
    caracteristicas?: string[];
    color?: string;
    activo: boolean;
    orden: number;
}

interface PaginatedRentaEquipos {
    data: RentaEquipo[];
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

interface RentaEquiposProps {
    equipos: PaginatedRentaEquipos;
}

export default function RentaEquipos({ equipos }: RentaEquiposProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Renta de Equipos" />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">
                        Listado de Equipos en Renta
                    </h1>
                    <Link href={route('cms.renta-equipos.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-neutral-800 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nuevo Equipo
                        </button>
                    </Link>
                </div>

                <RentaEquipoTable
                    equipos={equipos}
                    resourceRoute="cms.renta-equipos"
                />
            </div>
        </AppLayout>
    );
}