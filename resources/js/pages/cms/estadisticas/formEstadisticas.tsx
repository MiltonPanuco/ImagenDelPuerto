import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { colorOptions } from '@/pages/cms/catalogos';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Estadísticas' }];

interface Estadistica {
    id?: number;
    title: string;
    color: string;
    descripcion: string;
    activo: boolean;
}

export default function FormEstadisticas({ estadistica }: { estadistica: Estadistica }) {
    const isEdit = !!estadistica?.id;

    const { data, setData, post, put, processing, errors } = useForm<Estadistica>({
        title: estadistica.title || '',
        color: estadistica.color 
            ? (estadistica.color.startsWith('bg-') 
                ? estadistica.color 
                : `bg-${estadistica.color}-500`)
            : '',
        descripcion: estadistica.descripcion || '',
        activo: estadistica.activo ?? false,
    });

    const [showError, setShowError] = useState(true);
    
    useEffect(() => {
        if (errors.error) {
            setShowError(true);
        }
    }, [errors.error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Estadística actualizada' : 'Estadística creada',
                text: isEdit ? 'La estadística ha sido actualizada correctamente.' : 'La estadística ha sido creada correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        };

        if (isEdit) {
            put(route('cms.estadisticas.update', estadistica.id), {
                onSuccess: successCallback,
            });
        } else {
            post(route('cms.estadisticas.store'), {
                onSuccess: successCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Estadística' : 'Crear Estadística'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEdit ? 'Editar Estadística' : 'Crear Nueva Estadística'}
                    </h1>
                    <Link href={route('cms.estadisticas.index')}>
                        <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.error && showError && (
                        <div className="relative py-4 px-6 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
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
                        <label className="block mb-2 font-medium text-sm text-gray-700">Título (Número)</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Ej: 10, 100+, 500"
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Color</label>

                        <div className="flex overflow-x-auto space-x-3 pb-2">
                            {colorOptions.map((colorClass) => {
                                const isSelected = data.color === colorClass;

                                return (
                                    <button
                                        key={colorClass}
                                        type="button"
                                        onClick={() => setData('color', colorClass)}
                                        className={`w-10 h-10 cursor-pointer rounded-full border-2 transition duration-150 shrink-0 ${
                                            isSelected ? 'border-blue-500 ring ring-blue-300' : 'border-gray-300'
                                        } ${colorClass}`}
                                        title={colorClass}
                                    />
                                );
                            })}
                        </div>

                        {data.color && (
                            <div className="mt-4 flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded ${data.color} border border-gray-300`} />
                                <span className="text-sm font-medium text-gray-700">{data.color}</span>
                            </div>
                        )}
                        {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Descripción</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            rows={3}
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            placeholder="Ej: Años de experiencia, Pacientes atendidos"
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
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
                            <LucideIcons.Save /> 
                            {processing ? 'Guardando...' : isEdit ? 'Actualizar Estadística' : 'Crear Estadística'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}