import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';
import { Switch } from '@/components/ui/switch';
interface CarruselItem {
    id: number;
    section: string;
    image: string;
    title1: string;
    title2?: string;
    description?: string;
    order: number;
    activo: boolean;
    created_at: string;
    updated_at: string;
}

interface IndexCarruselSectionProps {
    items: CarruselItem[];
    section: string;
    sectionTitle?: string;
}

export default function Index({
    items,
    section,
    sectionTitle = section.charAt(0).toUpperCase() + section.slice(1)
}: IndexCarruselSectionProps) {

    const breadcrumbs: BreadcrumbItem[] = [
        { title: `Carrusel ${sectionTitle}` }
    ];

    const [sortedItems, setSortedItems] = useState(items);

    const handleToggleActive = (id: number) => {
        router.patch(
            route('cms.carrusel.activo', { section, id }),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Estado actualizado',
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
            }
        );
    };

    const handleDelete = (id: number, title: string) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `Se eliminará el item "${title}"`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('cms.carrusel.destroy', { section, id }), {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Eliminado',
                            text: 'El item ha sido eliminado correctamente.',
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Carrusel ${sectionTitle}`} />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                            Carrusel - {sectionTitle}
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 mt-1">
                            Gestiona los items del carrusel de la sección {sectionTitle}
                        </p>
                    </div>
                    <Link href={route('cms.carrusel.create', section)}>
                        <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                            <LucideIcons.Plus className="w-4 h-4 mr-2" />
                            Nuevo Item
                        </button>
                    </Link>
                </div>

                {/* Lista de Items */}
                {sortedItems.length === 0 ? (
                    <div className="text-center py-12 bg-gray-50 dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-neutral-600">
                        <LucideIcons.ImageOff className="w-16 h-16 mx-auto text-gray-400 dark:text-neutral-500 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-neutral-100 mb-2">
                            No hay items en el carrusel
                        </h3>
                        <p className="text-gray-600 dark:text-neutral-400 mb-4">
                            Comienza agregando tu primer item al carrusel
                        </p>
                        <Link href={route('cms.carrusel.create', section)}>
                            <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition">
                                <LucideIcons.Plus className="w-4 h-4 mr-2" />
                                Crear Primer Item
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {sortedItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-neutral-700 rounded-lg border border-gray-200 dark:border-neutral-600 overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                {/* Imagen */}
                                <div className="relative h-48 bg-gray-100 dark:bg-neutral-800">
                                    {item.image ? (
                                        <img
                                            src={`/storage/${item.image}`}
                                            alt={item.title1}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <LucideIcons.ImageOff className="w-12 h-12 text-gray-400 dark:text-neutral-500" />
                                        </div>
                                    )}

                                    {/* Badge de orden */}
                                    <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                        #{item.order}
                                    </div>


                                </div>

                                {/* Contenido */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-neutral-100 mb-1 line-clamp-1">
                                        {item.title1}
                                    </h3>
                                    {item.title2 && (
                                        <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2 line-clamp-1">
                                            {item.title2}
                                        </p>
                                    )}
                                    {item.description && (
                                        <p className="text-xs text-gray-500 dark:text-neutral-500 line-clamp-2">
                                            {item.description}
                                        </p>
                                    )}
                                </div>

                                {/* Acciones */}
                                <div className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-600 flex items-center justify-between gap-2">
                                    {/* Botones izquierda */}
                                    <div className="flex gap-2">

                                        <Link href={route('cms.carrusel.edit', { section, id: item.id })}>
                                            <button
                                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-600 transition cursor-pointer"
                                                title="Editar"
                                            >
                                                <LucideIcons.Edit className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() => handleDelete(item.id, item.title1)}
                                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-600 transition cursor-pointer"
                                            title="Eliminar"
                                        >
                                            <LucideIcons.Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </button>

                                    </div>

                                    <Switch
                                        checked={item.activo}
                                        onCheckedChange={() => handleToggleActive(item.id)}
                                    />


                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}