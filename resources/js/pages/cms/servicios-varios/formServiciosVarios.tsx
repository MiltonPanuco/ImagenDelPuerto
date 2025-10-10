import { Head, useForm, Link, router } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import TagsInput from '@/components/ui/TagsInput';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Gestionar Servicios Varios', href: 'cms.servicios-varios.index' },
    { title: 'Formulario' }
];

interface ServicioVario {
    id?: number;
    title: string;
    subtitle?: string;
    descripcion: string;
    imagenes?: string[];
    caracteristicas: string[];
    activo: boolean;
    orden: number;
}

interface FormData {
    title: string;
    subtitle: string;
    descripcion: string;
    caracteristicas: string[];
    activo: boolean;
    orden: number;
    imagenes: File[];
    imagenes_existentes: string[];
}

export default function formServicioVario({ serviciosVario }: { serviciosVario?: ServicioVario }) {
    const isEdit = !!serviciosVario?.id;

    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: serviciosVario?.title || '',
        subtitle: serviciosVario?.subtitle || '',
        descripcion: serviciosVario?.descripcion || '',
        caracteristicas: serviciosVario?.caracteristicas || [],
        activo: serviciosVario?.activo ?? true,
        orden: serviciosVario?.orden || 0,
        imagenes: [],
        imagenes_existentes: serviciosVario?.imagenes || [],
    });

    const [caracteristicas, setCaracteristicas] = useState<string[]>(
        serviciosVario?.caracteristicas || []
    );
    const [previews, setPreviews] = useState<string[]>([]);
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        setData('caracteristicas', caracteristicas);
    }, [caracteristicas]);

    useEffect(() => {
        if (errors.error) {
            setShowError(true);
        }
    }, [errors.error]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        const totalImages = data.imagenes_existentes.length + data.imagenes.length + newFiles.length;

        if (totalImages > 5) {
            Swal.fire({
                icon: 'warning',
                title: 'Límite de imágenes',
                text: 'Solo puedes subir un máximo de 5 imágenes en total',
            });
            return;
        }

        // ✅ AGREGAR en lugar de reemplazar
        const updatedImages = [...data.imagenes, ...newFiles];
        setData('imagenes', updatedImages);

        // Crear nuevas previsualizaciones
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setPreviews([...previews, ...newPreviews]);

        // Limpiar el input para permitir subir el mismo archivo nuevamente
        e.target.value = '';
    };

    const removeExistingImage = (index: number) => {
        const newImages = [...data.imagenes_existentes];
        newImages.splice(index, 1);
        setData('imagenes_existentes', newImages);
    };

    const removeNewImage = (index: number) => {
        const newImages = Array.from(data.imagenes);
        newImages.splice(index, 1);
        setData('imagenes', newImages);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle || '');
        formData.append('descripcion', data.descripcion);
        formData.append('activo', data.activo ? '1' : '0');
        formData.append('orden', data.orden.toString());

        // Características
        data.caracteristicas.forEach((car, index) => {
            formData.append(`caracteristicas[${index}]`, car);
        });

        // Imágenes existentes
        data.imagenes_existentes.forEach((img, index) => {
            formData.append(`imagenes_existentes[${index}]`, img);
        });

        // Nuevas imágenes
        data.imagenes.forEach((file) => {
            formData.append('imagenes[]', file);
        });

        if (isEdit) {
            formData.append('_method', 'PUT');
        }

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Servicio actualizado' : 'Servicio creado',
                text: isEdit
                    ? 'El servicio ha sido actualizado correctamente.'
                    : 'El servicio ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                if (!isEdit) {
                    window.location.href = route('cms.servicios-varios.index');
                }
            });
        };

        const url = isEdit
            ? route('cms.servicios-varios.update', serviciosVario!.id)
            : route('cms.servicios-varios.store');

        router.post(url, formData as any, {
            onSuccess: successCallback,
            forceFormData: true,
        });
    };

    // Limpiar previews al desmontar
    useEffect(() => {
        return () => {
            previews.forEach(preview => URL.revokeObjectURL(preview));
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Servicio' : 'Crear Servicio'} />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Servicio Varios' : 'Crear Nuevo Servicio Varios'}
                    </h1>
                    <Link href={route('cms.servicios-varios.index')}>
                        <button className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded">
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
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                                onClick={() => setShowError(false)}
                                aria-label="Cerrar alerta"
                            >
                                <LucideIcons.X className="w-4 h-4 mt-1 cursor-pointer" />
                            </button>
                        </div>
                    )}

                    {/* Título */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Título *
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* Subtítulo */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Subtítulo
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                        />
                        {errors.subtitle && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.subtitle}</div>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Descripción *
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            rows={5}
                        />
                        {errors.descripcion && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.descripcion}</div>}
                    </div>

                    {/* Imágenes */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Imágenes (Máximo 5)
                        </label>

                        {/* Imágenes existentes */}
                        {data.imagenes_existentes.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">Imágenes actuales:</p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {data.imagenes_existentes.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={`/storage/${img}`}
                                                alt={`Imagen ${index + 1}`}
                                                className="w-full h-32 object-cover rounded border border-gray-300 dark:border-neutral-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <LucideIcons.X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Nuevas imágenes */}
                        {previews.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">Nuevas imágenes:</p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {previews.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-32 object-cover rounded border border-gray-300 dark:border-neutral-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeNewImage(index)}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <LucideIcons.X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input para subir imágenes */}
                        {data.imagenes_existentes.length + data.imagenes.length < 5 && (
                            <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-6 text-center">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="imagenes"
                                />
                                <label
                                    htmlFor="imagenes"
                                    className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                >
                                    <LucideIcons.Upload className="w-5 h-5" />
                                    Seleccionar imágenes
                                </label>
                                <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">
                                    {5 - data.imagenes_existentes.length - data.imagenes.length} imágenes disponibles
                                </p>
                            </div>
                        )}
                        {errors.imagenes && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.imagenes}</div>}
                    </div>

                    {/* Características */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Características
                        </label>
                        <TagsInput
                            value={caracteristicas}
                            onChange={setCaracteristicas}
                            placeholder="Escribe una característica y presiona Enter"
                            maxTagLength={100}
                            textButton="Agregar"
                            maxTags={30}
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.caracteristicas && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.caracteristicas}</div>}
                    </div>

                    {/* Orden */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Orden
                        </label>
                        <input
                            type="number"
                            min="0"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.orden}
                            onChange={(e) => setData('orden', parseInt(e.target.value) || 0)}
                        />
                        {errors.orden && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.orden}</div>}
                    </div>

                    {/* Activo */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="accent-blue-500 w-4 h-4"
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
                            <LucideIcons.Save />
                            {processing ? 'Guardando...' : isEdit ? 'Actualizar Servicio' : 'Crear Servicio'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}