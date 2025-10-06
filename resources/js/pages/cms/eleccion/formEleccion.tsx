import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { iconOptions, colorOptions } from '@/pages/cms/catalogos';
import * as LucideIcons from 'lucide-react';
import TagsInput from '@/components/ui/TagsInput';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Elección' }];

interface Eleccion {
    id?: number;
    title: string;
    icon?: string;
    color: string;
    descripcion: string;
    caracteristicas: Array<string>;
    activo: boolean;
}

export default function FormEleccion({ eleccion }: { eleccion: Eleccion }) {
    const [caracteristicas, setCaracteristicas] = useState<string[]>([]);
    const isEdit = !!eleccion?.id;

    useEffect(() => {
        setData('caracteristicas', caracteristicas);
    }, [caracteristicas]);

    useEffect(() => {
        if (isEdit && eleccion.caracteristicas) {
            setCaracteristicas(eleccion.caracteristicas);
        }
    }, [isEdit, eleccion.caracteristicas]);

    const { data, setData, post, put, processing, errors } = useForm<Eleccion>({
        title: eleccion.title || '',
        icon: eleccion.icon || '',
        color: eleccion.color || '',
        descripcion: eleccion.descripcion || '',
        caracteristicas: eleccion.caracteristicas || [],
        activo: eleccion.activo || false,
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
                title: isEdit ? 'Elección actualizada' : 'Elección creada',
                text: isEdit
                    ? 'La elección ha sido actualizada correctamente.'
                    : 'La elección ha sido creada correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        };

        if (isEdit) {
            put(route('cms.eleccion.update', eleccion.id), { onSuccess: successCallback });
        } else {
            post(route('cms.eleccion.store'), { onSuccess: successCallback });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Elección' : 'Crear Elección'} />

            <div className="mb-6 md:p-15 p-10 bg-white dark:bg-neutral-800 rounded-lg shadow">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Elección' : 'Crear Nueva Elección'}
                    </h1>
                    <Link href={route('cms.eleccion.index')}>
                        <button className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.error && showError && (
                        <div className="relative py-4 px-6 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg" role="alert">
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

                    {/* Título */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Título de la elección</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    {/* Icono */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Ícono</label>
                        <div className="grid grid-cols-6 gap-3 max-h-48 overflow-y-auto pr-2 border rounded p-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600">
                            {iconOptions.map((icon) => {
                                const IconComponent = LucideIcons[icon as keyof typeof LucideIcons];
                                const isSelected = data.icon === icon;
                                const color = data.color && data.color.includes('-') ? data.color.split('-')[1] : data.color || 'blue';

                                return (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setData('icon', icon)}
                                        className={`cursor-pointer group transition duration-150 ease-in-out border rounded p-2 flex items-center justify-center
                                            ${isSelected ? `ring-2 ring-${color}-500 bg-gray-100 dark:bg-neutral-600` : 'border-gray-300 dark:border-neutral-600'}
                                            hover:scale-105 hover:shadow-md
                                        `}
                                        title={icon}
                                    >
                                        <IconComponent
                                            className={`w-6 h-6 transition duration-200 ${isSelected ? `text-${color}-500` : 'text-gray-700 dark:text-neutral-100 group-hover:text-gray-900 dark:group-hover:text-neutral-50'}`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                        {errors.icon && <div className="text-red-500 text-sm">{errors.icon}</div>}
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Color</label>
                        <div className="flex overflow-x-auto space-x-3 pb-2">
                            {colorOptions.map((colorClass) => {
                                const isSelected = data.color === colorClass;
                                return (
                                    <button
                                        key={colorClass}
                                        type="button"
                                        onClick={() => setData('color', colorClass)}
                                        className={`w-10 h-10 cursor-pointer rounded-full border-2 transition duration-150 shrink-0
                                            ${isSelected ? 'ring ring-blue-300 border-blue-500' : 'border-gray-300 dark:border-neutral-600'}
                                            ${colorClass}
                                        `}
                                        title={colorClass}
                                    />
                                );
                            })}
                        </div>
                        {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Descripción</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            rows={4}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>

                    {/* Características */}
                    <div>
                        <TagsInput
                            label="Características"
                            value={caracteristicas}
                            onChange={setCaracteristicas}
                            placeholder="Escribe una característica y presiona Enter"
                            textButton="Agregar"
                        />
                        {errors.caracteristicas && <div className="text-red-500 text-sm mt-1">{errors.caracteristicas}</div>}
                    </div>

                    {/* Activo */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="accent-blue-500"
                        />
                        <label htmlFor="activo" className="text-gray-700 dark:text-neutral-200">Activo</label>
                    </div>

                    {/* Botón */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideIcons.Save /> {processing ? 'Guardando...' : isEdit ? 'Actualizar Elección' : 'Crear Elección'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}