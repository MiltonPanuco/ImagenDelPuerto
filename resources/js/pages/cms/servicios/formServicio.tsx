import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { iconOptions, colorOptions } from '@/pages/cms/catalogos';
import * as LucideIcons from 'lucide-react';
import TagsInput from '@/components/ui/TagsInput';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Servicios' }];

interface Servicio {
    id?: number;
    servicio: string;
    icon?: string;
    color: string;
    categoria: string;
    descripcion: string;
    caracteristicas: Array<string>;
    activo: boolean;
}

export default function FormServicio({ servicio }: { servicio: Servicio }) {
    const isEdit = !!servicio?.id;

    // Inicializar el formulario PRIMERO
    const { data, setData, post, put, processing, errors } = useForm<Servicio>({
        servicio: servicio.servicio || '',
        icon: servicio.icon || '',
        color: servicio.color || '',
        categoria: servicio.categoria || '',
        descripcion: servicio.descripcion || '',
        caracteristicas: servicio.caracteristicas || [],
        activo: servicio.activo || false,
    });

    // Estados locales DESPUÉS
    const [caracteristicas, setCaracteristicas] = useState<string[]>(
        servicio.caracteristicas || []
    );
    const [showError, setShowError] = useState(true);

    // Sincronizar características con el formulario
    useEffect(() => {
        setData('caracteristicas', caracteristicas);
    }, [caracteristicas]);

    // Mostrar error si existe
    useEffect(() => {
        if (errors.error) {
            setShowError(true);
        }
    }, [errors.error]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        // Verificar datos antes de enviar
        console.log('Datos a enviar:', data);

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Servicio actualizado' : 'Servicio creado',
                text: isEdit ? 'El servicio ha sido actualizado correctamente.' : 'El servicio ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                if (!isEdit) {
                    window.location.href = route('cms.servicios.index');
                }
            });
        };

        const errorCallback = (errors: any) => {
            console.log('Errores de validación:', errors);
        };

        if (isEdit) {
            put(route('cms.servicios.update', servicio.id), {
                onSuccess: successCallback,
                onError: errorCallback,
            });
        } else {
            post(route('cms.servicios.store'), {
                onSuccess: successCallback,
                onError: errorCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Servicio' : 'Crear Servicio'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEdit ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
                    </h1>
                    <Link href={route('cms.servicios.index')}>
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
                        <label className="block mb-2 font-medium text-sm text-gray-700">Nombre del Servicio</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.servicio}
                            onChange={(e) => setData('servicio', e.target.value)}
                        />
                        {errors.servicio && <div className="text-red-500 text-sm">{errors.servicio}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Ícono</label>

                        {/* Scrollable vertical icon grid */}
                        <div className="grid grid-cols-6 gap-3 max-h-48 overflow-y-auto pr-2 border rounded p-2">
                            {iconOptions.map((icon) => {
                                const IconComponent = LucideIcons[icon as keyof typeof LucideIcons];
                                const isSelected = data.icon === icon;
                                const color = data.color && data.color.includes('-') ? data.color.split('-')[1] : data.color || 'default';

                                return (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => setData('icon', icon)}
                                        className={`
                                            cursor-pointer group transition duration-150 ease-in-out
                                            border rounded p-2 flex items-center justify-center
                                            hover:scale-105 hover:shadow-md
                                            ${isSelected ? `ring-2 ring-${color}-500 bg-blue-50` : 'border-gray-300'}
                                        `}
                                        title={icon}
                                    >
                                        <IconComponent
                                            className={`
                                                w-6 h-6 transition duration-200
                                                ${isSelected ? `text-${color}-500` : 'text-gray-700 group-hover:text-gray-900'}
                                            `}
                                        />
                                    </button>
                                );
                            })}
                        </div>


                        {/* Previsualización */}
                        {data.icon && (
                            <div className="mt-4 flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Seleccionado:</span>
                                {(() => {
                                    const SelectedIcon = LucideIcons[data.icon as keyof typeof LucideIcons];
                                    const color = data.color && data.color.includes('-') ? data.color.split('-')[1] : data.color || 'default';
                                    return (
                                        <div className="flex items-center space-x-2">
                                            <SelectedIcon
                                                className={`w-8 h-8 text-${color}-500 transition`}
                                            />
                                            <span className={`text-sm font-medium text-${color}-500`}>{data.icon}</span>
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                        {errors.icon && <div className="text-red-500 text-sm">{errors.icon}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Color</label>

                        {/* Scrollable horizontal grid */}
                        <div className="flex overflow-x-auto space-x-3 pb-2">
                            {colorOptions.map((colorClass) => {
                                const isSelected = data.color === colorClass;

                                return (
                                    <button
                                        key={colorClass}
                                        type="button"
                                        onClick={() => setData('color', colorClass)}
                                        className={`w-10 h-10 cursor-pointer rounded-full border-2 transition duration-150 shrink-0 ${isSelected ? 'border-blue-500 ring ring-blue-300' : 'border-gray-300'
                                            } ${colorClass}`}
                                        title={colorClass}
                                    />
                                );
                            })}
                        </div>

                        {/* Previsualización del color */}
                        {data.color && (
                            <div className="mt-4 flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded ${data.color} border border-gray-300`} />
                                <span className="text-sm font-medium text-gray-700">{data.color}</span>
                            </div>
                        )}
                        {errors.color && <div className="text-red-500 text-sm">{errors.color}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Categoría</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.categoria}
                            onChange={(e) => setData('categoria', e.target.value)}
                        />
                        {errors.categoria && <div className="text-red-500 text-sm">{errors.categoria}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">Descripción</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <div className="text-red-500 text-sm">{errors.descripcion}</div>}
                    </div>

                    <div>
                        <TagsInput
                            label="Características"
                            value={caracteristicas}
                            onChange={setCaracteristicas}
                            placeholder="Escribe una característica y presiona Enter"
                            maxTagLength={100}
                            textButton="+"
                            maxTags={30}
                        />
                        {errors.caracteristicas && <div className="text-red-500 text-sm">{errors.caracteristicas}</div>}
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
                            <LucideIcons.Save /> {processing ? 'Guardando...' : isEdit ? 'Actualizar Servicio' : 'Crear Servicio'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}