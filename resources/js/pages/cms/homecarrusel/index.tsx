import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import DataTable from '@/components/ui/datatable';
import AppLayout from '@/layouts/app-layout';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Carrusel Home',
    },
];

interface Carrusel {
    id: number;
    title: string;
    descripcion: string;
    image: string;
    orden: number;
    activo: boolean;
}

interface PaginatedCarruseles {
    data: Carrusel[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    [key: string]: any;
}

interface Props {
    carruseles: PaginatedCarruseles;
}

export default function HomeCarrusel({ carruseles }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Carrusel Home" />

            <div className="mb-6 md:p-15 p-10">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6">Listado de Slides del Carrusel</h1>
                    <Link href={route('cms.homecarrusel.create')}>
                        <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        >
                            <Icons.Plus className="w-4 h-4 mr-2" />
                            Nueva Slide
                        </button>
                    </Link>
                </div>

                <DataTable items={carruseles} resourceRoute="cms.homecarrusel" />
            </div>
        </AppLayout>
    );
}