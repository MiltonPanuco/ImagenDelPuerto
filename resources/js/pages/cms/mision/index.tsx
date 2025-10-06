import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react'
import { Link } from '@inertiajs/react';
import DataTable from '@/components/ui/datatable';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Misión/Visión',
    },
];

// Interfaz corregida para los datos paginados de Laravel
interface MisionItem {
    id: number;
    nombre: string;
    descripcion: string;
    activo: boolean;
}

interface PaginatedData {
    data: MisionItem[];
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

interface Props {
    mision: PaginatedData;
}

export default function Mision({ mision }: Props) {
    // Debug: Verifica qué datos estás recibiendo
    console.log('Datos de misión:', mision);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Misión" />

            <div className="mb-6 md:p-15 p-10">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6">Listado de Misión y Visión</h1>
                    <Link href={route('cms.mision.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nuevo Dato
                        </button>
                    </Link>
                </div>
                <DataTable items={mision} resourceRoute="cms.mision" />
            </div>
        </AppLayout>
    );
}