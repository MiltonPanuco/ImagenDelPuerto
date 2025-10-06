import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { iconOptions, colorOptions } from '@/pages/cms/catalogos';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Ofrecemos' }];

interface Ofrecemos {
    id?: number;
    title: string;
    icon?: string;
    color: string;
    descripcion: string;
    activo: boolean;
}

export default function FormOfrecemos({ ofrecemos }: { ofrecemos: Ofrecemos }) {
    const isEdit = !!ofrecemos?.id;

    const { data, setData, post, put, processing, errors } = useForm<Ofrecemos>({
        title: ofrecemos.title || '',
        icon: ofrecemos.icon || '',
        color: ofrecemos.color || '',
        descripcion: ofrecemos.descripcion || '',
        activo: ofrecemos.activo || false,
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
                title: isEdit ? 'Ofrecemos actualizado' : 'Ofrecemos creado',
                text: isEdit ? 'El ofrecemos ha sido actualizado correctamente.' : 'El ofrecemos ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        };

        if (isEdit) {
            put(route('cms.ofrecemos.update', ofrecemos.id), {
                onSuccess: successCallback,
            });
        } else {
            post(route('cms.ofrecemos.store'), {
                onSuccess: successCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Ofrecemos' : 'Crear Ofrecemos'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEdit ? 'Editar Ofrecemos' : 'Crear Nuevo Ofrecemos'}
                    </h1>
                    <Link href={route('cms.ofrecemos.index')}>
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
                        <label className="block mb-2 font-medium text-sm text-gray-700">Título</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="text-red-500 text-sm">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Ícono</label>

                        <div className="grid grid-cols-6 gap-3 max-h-48 overflow-y-auto pr-2 border rounded p-2">
                            {iconOptions.map((icon) => {
                                const IconComponent = LucideIcons[icon as keyof typeof LucideIcons];
                                const isSelected = data.icon === icon;

                                return (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setData('icon', icon)}
                                        className={`
                                            cursor-pointer group transition duration-150 ease-in-out
                                            border rounded p-2 flex items-center justify-center
                                            hover:scale-105 hover:shadow-md
                                            ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : 'border-gray-300'}
                                        `}
                                        title={icon}
                                    >
                                        <IconComponent
                                            className={`w-6 h-6 transition duration-200 ${
                                                isSelected ? 'text-blue-500' : 'text-gray-700 group-hover:text-gray-900'
                                            }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {data.icon && (
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Seleccionado:</span>
                                {(() => {
                                    const SelectedIcon = LucideIcons[data.icon as keyof typeof LucideIcons];
                                    return (
                                        <div className="flex items-center space-x-2">
                                            <SelectedIcon className="w-8 h-8 text-blue-500 transition" />
                                            <span className="text-sm font-medium text-gray-700">{data.icon}</span>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                        {errors.icon && <div className="text-red-500 text-sm">{errors.icon}</div>}
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
                            rows={4}
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="w-4 h-4"
                        />
                        <label htmlFor="activo" className="text-sm font-medium text-gray-700">Activo</label>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideIcons.Save className="w-4 h-4" /> 
                            {processing ? 'Guardando...' : isEdit ? 'Actualizar Ofrecemos' : 'Crear Ofrecemos'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}