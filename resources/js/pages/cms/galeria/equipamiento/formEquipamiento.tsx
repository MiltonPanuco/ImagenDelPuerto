import { Head, useForm, Link, router } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import { default as Swal, SwalError2, SwalToast } from '@/lib/swal';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import DialogEquipo from '@/pages/cms/galeria/equipos/DialogEquipo';
import routesEquipos from '@/routes/cms/galeria/equipamiento/equipo';
import { apiDelete, apiPatch } from '@/lib/axios';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Equipamiento' }];

interface Equipamiento {
    id?: number;
    categoria: string;
    titulo: string;
    subtitulo: string;
    descripcion: string;
    activo: boolean;
}

interface Equipo {
    id: number;
    servicio: string;
    titulo: string;
    descripcion: string;
    caracteristicas: string[];
    image?: string;
    activo: boolean;
    icon?: keyof typeof LucideIcons;
}

export default function FormEquipamiento({ equipamiento }: { equipamiento: Equipamiento }) {
    const isEdit = !!equipamiento?.id;
    const [equipos, setEquipos] = useState<Equipo[]>(
        (equipamiento.equipos || []).map((e: Equipo) => ({
            ...e,
            activo: e.activo ?? false
        }))
    );

    const { data, setData, post, put, processing, errors } = useForm<Equipamiento>({
        categoria: equipamiento.categoria || '',
        titulo: equipamiento.titulo || '',
        subtitulo: equipamiento.subtitulo || '',
        descripcion: equipamiento.descripcion || '',
        caracteristicas: equipamiento.caracteristicas || [],
        activo: equipamiento.activo || false,
    });

    const handleSwitch = (v: boolean) => {
        setData('activo', v);
    }

    const [showError, setShowError] = useState(true);
    
    useEffect(() => {
        if (errors.error) {
            setShowError(true);
        }
    }, [errors.error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const html = isEdit
            ? `La sección <b>${data.titulo}</b> ha sido actualizada correctamente.`
            : `La seccion <b>${data.titulo}</b> ha sido creada correctamente.<div class="text-emerald-600 mt-3 uppercase font-bold">¡Ya puedes agregar equipos a esta sección!</div>`;
        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Sección actualizada' : 'Sección creada',
                html,
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            })
        };

        if (isEdit) {
            put(route('cms.galeria.equipamiento.update', equipamiento.id), {
                onSuccess: successCallback,
            });
        } else {
            post(route('cms.galeria.equipamiento.store'), {
                onSuccess: successCallback,
            });
        }
    };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedEquipo, setSelectedEquipo] = useState<Equipo | null>(null);

    const toShowDetalles = (equipo: Equipo) => () => {
        setSelectedEquipo(equipo);
        setDialogOpen(true);
    }

    const handleSwitchEquipo = async (equipo: Equipo) => {
        try {
            const url = routesEquipos.activo.url({ equipamiento: equipamiento.id, equipo: equipo.id });
            const response = await apiPatch(url);
            const updatedEquipos = equipos.map(item => {
                if (item.id === equipo.id) {
                    return { ...item, activo: response.data.newValue };
                }
                return item;
            });

            setEquipos(updatedEquipos);

            SwalToast({
                title: 'Registro actualizado',
                text: (response.data.newValue ? 'Activo' : 'Inactivo'),
                icon: 'success',
            });
        } catch (error) {
            equipo.activo = !equipo.activo;
            SwalError2(error, 'error al actualizar')
        }
    }

    const handleCrearEquipo = () => {
        const createUrl = route('cms.galeria.equipamiento.equipo.create', { equipamiento: equipamiento.id });
        const backUrl = route('cms.galeria.equipamiento.edit', { id: equipamiento.id });

        router.visit(`${createUrl}?backUrl=${encodeURIComponent(backUrl)}`);
    };

    const onDeleteEquipo = async (equipo: Equipo) => {
        const r = await Swal.fire({
            title: '¿Estás seguro?',
            html: `Estás a punto de <b class="text-red-500 uppercase">eliminar</b> el siguiente equipo de la sección <b>${equipamiento.titulo}</b>:<br>
            <div><img src="${equipo.image || '/storage/default_card.svg'}" alt="${equipo.servicio}" class="my-4 mx-auto rounded shadow w-32 h-32 object-cover" /></div>
            <div class="my-4 font-bold">ID: ${equipo.id} (${equipo.servicio}).</div>
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
                const url = routesEquipos.destroy.url({ equipamiento: equipamiento.id!, equipo: equipo.id! });
                await apiDelete(url)
                setEquipos(prevEquipos => prevEquipos.filter(e => e.id !== equipo.id));
                SwalToast('¡Registro eliminado correctamente!');
            } catch (error) {
                SwalError2(error, 'Error al eliminar el registro');
            }
        }
    }
    
    const toEditEquipo = (equipo: Equipo) => () => {
        const editUrl = route('cms.galeria.equipamiento.equipo.edit', { equipamiento: equipamiento.id, equipo: equipo.id });
        const backUrl = route('cms.galeria.equipamiento.edit', { id: equipamiento.id });

        router.visit(`${editUrl}?backUrl=${encodeURIComponent(backUrl)}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Sección' : 'Crear Sección'} />

            <div className="mb-6 md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Sección' : 'Crear Nueva Sección'}
                    </h1>
                    <Link href={route('cms.galeria.equipamiento.index')}>
                        <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {errors.error && showError && (
                        <div 
                            className="relative py-4 px-6 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg" 
                            role="alert"
                        >
                            {errors.error}
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                onClick={() => setShowError(false)}
                                aria-label="Cerrar alerta"
                            >
                                <LucideIcons.X className="w-4 h-4 mt-1 cursor-pointer" />
                            </button>
                        </div>
                    )}
                    
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Categoría
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.categoria}
                            onChange={(e) => setData('categoria', e.target.value)}
                        />
                        {errors.categoria && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.categoria}</div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Título
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                        />
                        {errors.titulo && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.titulo}</div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Subtítulo
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.subtitulo}
                            onChange={(e) => setData('subtitulo', e.target.value)}
                        />
                        {errors.subtitulo && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.subtitulo}</div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Descripción
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.descripcion}</div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <label htmlFor="activo" className="font-bold text-gray-700 dark:text-neutral-200">
                            Activo
                        </label>
                        <Switch
                            id="activo"
                            checked={data.activo}
                            onCheckedChange={handleSwitch}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-neutral-600 text-white px-6 py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideIcons.Save className="w-5 h-5" />
                            {processing ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear'}
                        </button>
                    </div>

                    {isEdit && (
                        <div>
                            <Separator className="mt-10" />
                            <div className="flex items-center justify-between mt-6 mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-neutral-100">
                                    Equipos en esta sección
                                </h2>
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded cursor-pointer"
                                    onClick={handleCrearEquipo}
                                >
                                    <LucideIcons.Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {equipos.length === 0 && (
                                    <div className="col-span-full text-center text-gray-500 dark:text-neutral-400 py-8">
                                        No hay equipos registrados en esta sección.
                                    </div>
                                )}

                                {equipos.map((equipo, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white dark:bg-neutral-700 rounded-lg shadow p-4 flex flex-col items-center group transition-all duration-300 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-400 border-2 border-transparent"
                                    >
                                        <div className="relative w-full h-48 mb-4 overflow-hidden group">
                                            <img
                                                onClick={() => { toShowDetalles(equipo)(); }}
                                                src={equipo.image || "/storage/default_card.svg"}
                                                loading='lazy'
                                                alt={equipo.servicio || 'Equipo'}
                                                className="w-full h-48 object-cover rounded cursor-pointer transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        <h2 className="text-lg font-semibold truncate w-full text-gray-900 dark:text-neutral-100" title={equipo.servicio || '-'}>
                                            {equipo.servicio || '-'}
                                        </h2>

                                        <Separator className="my-4 w-full dark:bg-neutral-600" />
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-gray-700 dark:text-neutral-200 mb-1">
                                                Activo
                                            </span>
                                            <Switch
                                                type="success"
                                                checked={equipo.activo}
                                                onCheckedChange={() => handleSwitchEquipo(equipo)}
                                            />
                                        </div>

                                        <div className="flex gap-2 mt-3">
                                            <button
                                                type="button"
                                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-600 transition cursor-pointer"
                                                title="Editar"
                                                onClick={() => toEditEquipo(equipo)()}
                                            >
                                                <LucideIcons.Edit className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                            </button>
                                            <button
                                                type="button"
                                                className="p-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-600 transition cursor-pointer"
                                                title="Eliminar"
                                                onClick={() => onDeleteEquipo(equipo)}
                                            >
                                                <LucideIcons.Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </form>

                {selectedEquipo && (
                    <DialogEquipo
                        open={dialogOpen}
                        onClose={() => {
                            setDialogOpen(false);
                            setSelectedEquipo(null);
                        }}
                        equipo={selectedEquipo}
                    />
                )}
            </div>
        </AppLayout>
    );
}