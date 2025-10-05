import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Citas' }];

interface Cita {
    id?: number;
    nombre: string;
    fecha: string;
    hora: string;
    descripcion: string;
    activo: boolean;
}

export default function FormCita({ cita }: { cita: Cita }) {
    const isEdit = !!cita?.id;

    const { data, setData, post, put, processing, errors } = useForm<Cita>({
        nombre: cita.nombre || '',
        fecha: cita.fecha || '',
        hora: cita.hora || '',
        descripcion: cita.descripcion || '',
        activo: cita.activo || false,
    });

    const [showError, setShowError] = useState(true);

    useEffect(() => {
        if (errors.error) setShowError(true);
    }, [errors.error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Cita actualizada' : 'Cita creada',
                text: isEdit
                    ? 'La cita ha sido actualizada correctamente.'
                    : 'La cita ha sido creada correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        };

        if (isEdit) {
            put(route('cms.citas.update', cita.id), {
                onSuccess: successCallback,
            });
        } else {
            post(route('cms.citas.store'), {
                onSuccess: successCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Cita' : 'Crear Cita'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEdit ? 'Editar Cita' : 'Crear Nueva Cita'}
                    </h1>
                    <Link href={route('cms.citas.index')}>
                        <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.error && showError && (
                        <div
                            className="relative py-4 px-6 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                            role="alert"
                        >
                            {errors.error}
                            <button
                                type="button"
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                                onClick={() => setShowError(false)}
                                aria-label="Cerrar alerta"
                            >
                                <LucideIcons.X className="w-4 h-4 mt-1 cursor-pointer" />
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Nombre del Paciente
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                        />
                        {errors.nombre && (
                            <div className="text-red-500 text-sm">{errors.nombre}</div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium text-sm text-gray-700">
                                Fecha
                            </label>
                            <input
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={data.fecha}
                                onChange={(e) => setData('fecha', e.target.value)}
                            />
                            {errors.fecha && (
                                <div className="text-red-500 text-sm">{errors.fecha}</div>
                            )}
                        </div>

                        <div>
                            <label className="block mb-2 font-medium text-sm text-gray-700">
                                Hora
                            </label>
                            <input
                                type="time"
                                className="w-full border rounded px-3 py-2"
                                value={data.hora}
                                onChange={(e) => setData('hora', e.target.value)}
                            />
                            {errors.hora && (
                                <div className="text-red-500 text-sm">{errors.hora}</div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Descripción
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && (
                            <div className="text-red-500 text-sm">{errors.descripcion}</div>
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                        />
                        <label htmlFor="activo">Activo</label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            <LucideIcons.Save />{' '}
                            {processing
                                ? 'Guardando...'
                                : isEdit
                                    ? 'Actualizar Cita'
                                    : 'Crear Cita'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
