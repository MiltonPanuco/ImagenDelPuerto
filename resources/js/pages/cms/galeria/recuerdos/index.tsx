import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import * as Icons from 'lucide-react'

import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { default as Swal, SwalToast, SwalError2 } from '@/lib/swal';
import { apiDelete, apiPatch, apiPost } from '@/lib/axios';
import routesRecuerdos from '@/routes/cms/galeria/recuerdos';
import DialogImage from './DialogImage';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Gestionar Servicios',
    },
];

interface GaleriaItem {
    id: number;
    title: string;
    src: string;
    date: string;
    activo: boolean;
    descripcion: string;
}

interface GaleriaRecuerdo {
    galeria: Array<GaleriaItem>;
}

export default function GaleriaRecuerdos({ galeria: initialGaleria }: GaleriaRecuerdo) {
    const [galeria, setGaleria] = useState<GaleriaItem[]>(initialGaleria);

    const handleSwitch = async (recuerdo: GaleriaItem, field: string) => {
        try {
            const url = routesRecuerdos.field.url({ id: recuerdo.id, field: field });
            const response = await apiPatch(url);

            const updatedGaleria = galeria.map(item => {
                if (item.id === recuerdo.id) {
                    return { ...item, [field]: response.data.newValue };
                }
                return item;
            });

            setGaleria(updatedGaleria);

            SwalToast({
                title: 'Registro actualizado',
                text: response.data.newValue ? 'Activo' : 'Inactivo',
                icon: 'success',
            });
        } catch (error) {
            recuerdo[field] = !recuerdo[field];
            SwalError2(error)
        }
    }

    const toEdit = (item: GaleriaItem) => () => {
        setInitialData(item);
        setDialogOpen(true);
    };

    const onDelete = async (item: GaleriaItem) => {
        const r = await Swal.fire({
            title: '¿Estás seguro?',
            html: `Estás a punto de <b class="text-red-500 uppercase">eliminar</b> la siguiente imagen:<br>
            <div><img src="${item.src}" alt="${item.title}" class="my-4 mx-auto rounded shadow w-32 h-32 object-cover" /></div>
            <div class="my-4 font-bold">ID: ${item.id} (${item.title}).</div>
            Esta acción es irreversible.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
        });
        if (r.isConfirmed) {
            try {
                const url = routesRecuerdos.destroy.url(item.id);
                await apiDelete(url);
                setGaleria((prevItems) => prevItems.filter((i) => i.id !== item.id));
                SwalToast('¡Registro eliminado correctamente!');
            } catch (error) {
                SwalError2(error);
            }
        }
    }

    const defaultInitialData: Partial<GaleriaItem> = {
        id: 0,
        title: '',
        src: '',
        date: '',
        descripcion: '',
        activo: false,
        image: null,
    };

    const resetData = () => {
        setInitialData(defaultInitialData);
    };

    const [initialData, setInitialData] = useState<Partial<GaleriaItem>>(defaultInitialData);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleCloseDialog = () => {
        setDialogOpen(false);
        resetData();
    };

    const handleDialogSubmit = async (data: {
        id: number;
        title: string;
        date: string;
        descripcion: string;
        activo: boolean;
        image: File | null
    }) => {
        try {
            let url;
            let response;
            if (data.id && data.id > 0) {
                url = routesRecuerdos.update.url(data.id);
                response = await apiPatch(url, {
                    title: data.title,
                    date: data.date,
                    descripcion: data.descripcion,
                    activo: data.activo ? 1 : 0,
                });
                setGaleria((prevItems) => prevItems.map((item) => item.id === data.id ? response.data : item));
            } else {
                const formData = new FormData();
                formData.append('title', data.title);
                formData.append('date', data.date);
                formData.append('descripcion', data.descripcion);
                formData.append('activo', data.activo ? '1' : '0');
                if (data.image) {
                    formData.append('image', data.image);
                }
                url = routesRecuerdos.store.url();
                response = await apiPost(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setGaleria((prevItems) => [response.data, ...prevItems]);
            }

            setDialogOpen(false);
            resetData();
            SwalToast('¡Imagen agregada correctamente!');
        } catch (error) {
            setDialogOpen(false);
            resetData();
            await new Promise((resolve) => setTimeout(resolve, 100));
            SwalError2(error);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galería de Recuerdos" />

            <div className="mb-6 md:p-15 p-10">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold mb-6">Listado de Galería de Recuerdos</h1>
                    <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 bg-emerald-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-25 transition ease-in-out duration-150 cursor-pointer"
                        onClick={() => setDialogOpen(true)}
                    >
                        <Icons.Plus className="w-4 h-4 mr-2" />
                        Agregar Imagen
                    </button>
                </div>

                <h2 className="text-xl font-bold uppercase text-blue-700">Recuerdos</h2>
                <Separator className="mb-7 mt-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {galeria.map((recuerdo: GaleriaItem, idx: number) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg shadow p-4 flex flex-col items-center group transition-all duration-300 hover:shadow-lg hover:border-blue-500 border-2 border-transparent"
                        >
                            <div className="relative w-full h-48 mb-4 overflow-hidden group">
                                <img
                                    onClick={() => window.open(recuerdo.src, '_blank')}
                                    src={recuerdo.src}
                                    loading='lazy'
                                    alt={recuerdo.title || 'Recuerdo'}
                                    className="w-full h-48 object-cover rounded cursor-pointer transition-transform duration-300 group-hover:scale-110"
                                />
                            </div>
                            <h2 className="text-lg font-semibold mb-2">{recuerdo.title || '-'}</h2>
                            <div className="text-gray-600">{recuerdo.date}</div>

                            <Separator className="my-4 w-full" />
                            <div className="flex flex-col items-center mt-3">
                                <span className="font-bold text-gray-700 mb-1">Activo</span>
                                <Switch
                                    type="success"
                                    checked={recuerdo.activo}
                                    onCheckedChange={() => handleSwitch(recuerdo, 'activo')}
                                />
                            </div>
                            <div className="flex gap-2 mt-3">
                                <button
                                    type="button"
                                    className="p-2 rounded hover:bg-gray-100 transition cursor-pointer"
                                    title="Editar"
                                    onClick={() => toEdit(recuerdo)()}
                                >
                                    <Icons.Edit className="w-5 h-5 text-blue-600" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 rounded hover:bg-gray-100 transition cursor-pointer"
                                    title="Eliminar"
                                    onClick={() => onDelete(recuerdo)}
                                >
                                    <Icons.Trash2 className="w-5 h-5 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <DialogImage open={dialogOpen} onClose={handleCloseDialog} onSubmit={handleDialogSubmit} initialData={initialData} />
        </AppLayout>
    );
}