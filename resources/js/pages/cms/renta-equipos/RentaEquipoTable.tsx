import { Link, router } from '@inertiajs/react';
import { Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';

import { default as Swal, SwalError2, SwalToast } from '@/lib/swal';
import { apiPatch } from '@/lib/axios';

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
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface RentaEquipoTableProps {
    equipos: PaginatedRentaEquipos;
    resourceRoute: string;
}

export default function RentaEquipoTable({ equipos, resourceRoute }: RentaEquipoTableProps) {
    const [localItems, setLocalItems] = useState<RentaEquipo[]>(equipos.data);

    useEffect(() => {
        setLocalItems(equipos.data);
    }, [equipos.data]);

    const truncateText = (text: string, maxLength: number = 50) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleSwitch = async (item: RentaEquipo) => {
        try {
            const url = route(`${resourceRoute}.activo`, item.id);
            const response = await apiPatch(url);
            setLocalItems((prevItems) =>
                prevItems.map((i) =>
                    i.id === item.id ? { ...i, activo: response.data.activo } : i
                )
            );
            SwalToast({
                title: 'Registro actualizado',
                text: response.data.activo ? 'Activo' : 'Inactivo',
                icon: 'success',
            });
        } catch (error) {
            SwalError2(error);
        }
    };

    const onDelete = async (item: RentaEquipo) => {
        const r = await Swal.fire({
            title: '¿Estás seguro?',
            html: `Estás a punto de <b class="text-red-500 uppercase">eliminar</b> el siguiente registro: <div class="my-4 font-bold">ID: ${item.id} (${item.title}).</div>Esta acción eliminará el equipo y todas sus imágenes. Esta acción es irreversible.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });

        if (r.isConfirmed) {
            router.delete(route(`${resourceRoute}.destroy`, item.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setLocalItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
                    SwalToast('¡Registro eliminado correctamente!');

                    if (localItems.length === 1 && equipos.links.length > 0) {
                        const currentPageIndex = equipos.links.findIndex(link => link.active);
                        if (currentPageIndex > 0 && equipos.links[currentPageIndex - 1].url) {
                            router.visit(equipos.links[currentPageIndex - 1].url);
                        }
                    }
                },
                onError: (errors) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: errors.message || 'No se pudo eliminar el registro',
                    });
                }
            });
        }
    };

    return (
        <div>
            <div className="bg-white dark:bg-neutral-800 shadow rounded-lg overflow-x-auto">
                <table className="min-w-full table-auto text-left text-sm">
                    <thead className="bg-slate-100 dark:bg-neutral-700 border-b border-slate-200 dark:border-neutral-600">
                        <tr>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">ID</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Título</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Subtítulo</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Descripción</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Imágenes</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Características</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Activo</th>
                            <th className="px-6 py-3 text-gray-900 dark:text-neutral-100 font-semibold">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {localItems.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-6 py-4 text-center text-slate-400 dark:text-neutral-500">
                                    Sin registros
                                </td>
                            </tr>
                        ) : (
                            localItems.map((item) => (
                                <tr key={item.id} className="border-b border-slate-200 dark:border-neutral-700 dark:hover:bg-neutral-750 transition-colors">
                                    <td className="px-6 py-4 text-gray-900 dark:text-neutral-100">{item.id}</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-neutral-100 font-medium">{item.title}</td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-neutral-100">
                                        {item.subtitle || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900 dark:text-neutral-100">
                                        <div className="max-w-xs">
                                            {item.description ? truncateText(item.description, 80) : '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.images && item.images.length > 0 ? (
                                            <div className="flex gap-1">
                                                <img
                                                    src={`/storage/${item.images[0]}`}
                                                    alt={item.title}
                                                    className="w-12 h-12 object-cover rounded border border-slate-300 dark:border-neutral-600"
                                                />
                                                {item.images.length > 1 && (
                                                    <span className="flex items-center px-2 text-xs font-medium text-gray-600 dark:text-neutral-400">
                                                        +{item.images.length - 1}
                                                    </span>
                                                )}
                                            </div>
                                        ) : (
                                            <span className="text-slate-400 dark:text-neutral-500">-</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1 max-w-xs">
                                            {item.caracteristicas && item.caracteristicas.length > 0 ? (
                                                <>
                                                    {item.caracteristicas.slice(0, 2).map((car, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                                        >
                                                            {truncateText(car, 20)}
                                                        </span>
                                                    ))}
                                                    {item.caracteristicas.length > 2 && (
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-600 dark:text-neutral-200">
                                                            +{item.caracteristicas.length - 2}
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="text-slate-400 dark:text-neutral-500">-</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Switch
                                            checked={item.activo}
                                            onCheckedChange={() => handleSwitch(item)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 space-x-2">
                                        <Link href={route(`${resourceRoute}.edit`, item.id)} className="text-orange-600 dark:text-orange-400 hover:underline">
                                            <Edit className="inline w-4 h-4 mr-1 cursor-pointer" />
                                        </Link>
                                        <button
                                            onClick={() => onDelete(item)}
                                            className="text-red-600 dark:text-red-400 hover:underline"
                                        >
                                            <Trash2 className="inline w-4 h-4 mr-1 cursor-pointer" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                {equipos.links && equipos.links.length > 0 && (
                    <div className="p-4 flex flex-wrap gap-2 justify-center border-t border-slate-200 dark:border-neutral-700 bg-slate-50 dark:bg-neutral-800">
                        {equipos.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => link.url && router.visit(link.url)}
                                className={`px-3 py-1 text-sm rounded transition-colors ${link.active
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white dark:bg-neutral-700 border border-slate-300 dark:border-neutral-600 text-slate-700 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-neutral-600'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}