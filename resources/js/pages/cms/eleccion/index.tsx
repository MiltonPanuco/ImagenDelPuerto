import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react'
import { Link } from '@inertiajs/react';
import DataTable from '@/components/ui/datatable';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Elecciones',
    },
];

interface Eleccion {
    eleccion: Array[];
}

export default function Eleccion({ eleccion }: Eleccion) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Elecciones" />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">Listado de Elecciones</h1>
                    <Link href={route('cms.eleccion.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-neutral-800 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nueva Elección
                        </button>
                    </Link>
                </div>
                <DataTable items={eleccion} resourceRoute="cms.eleccion" />
            </div>
        </AppLayout>
    );
}