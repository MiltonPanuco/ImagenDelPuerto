import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react'
import { Link } from '@inertiajs/react';
import EquipamientoTable from './EquipamientoTable';

import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Equipamiento',
    },
];

interface Equipamiento {
    equipamiento: Array[];
}

export default function Equipamiento({ equipamiento }: Equipamiento) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipamiento" />

            <div className="mb-6 md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-neutral-100">
                        Secciones de Equipamiento
                    </h1>
                    <Link href={route('cms.galeria.equipamiento.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-neutral-800 focus:ring-emerald-500 dark:focus:ring-emerald-400 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nueva sección de equipamiento
                        </button>
                    </Link>
                </div>
                <EquipamientoTable items={equipamiento} resourceRoute="cms.galeria.equipamiento" />
            </div>
        </AppLayout>
    );
}