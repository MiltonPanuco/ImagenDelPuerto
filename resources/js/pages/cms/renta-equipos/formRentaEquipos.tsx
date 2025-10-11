import { Head, useForm, Link, router } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import { colorOptions } from '@/pages/cms/catalogos';
import TagsInput from '@/components/ui/TagsInput';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Gestionar Renta de Equipos', href: 'cms.renta-equipos.index' },
    { title: 'Formulario' }
];

interface RentaEquipo {
    id?: number;
    title: string;
    subtitle?: string;
    description?: string;
    images?: string[];
    caracteristicas?: string[];
    color?: string;
    activo: boolean;
    orden: number;
}

interface FormData {
    title: string;
    subtitle: string;
    description: string;
    caracteristicas: string[];
    color: string;
    activo: boolean;
    orden: number;
    images: File[];
    imagenes_existentes: string[];
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; 
const MAX_IMAGES = 5;

export default function FormRentaEquipos({ rentaEquipo }: { rentaEquipo?: RentaEquipo }) {
    const isEdit = !!rentaEquipo?.id;

    const { data, setData, post, processing, errors } = useForm<FormData>({
        title: rentaEquipo?.title || '',
        subtitle: rentaEquipo?.subtitle || '',
        description: rentaEquipo?.description || '',
        caracteristicas: rentaEquipo?.caracteristicas || [],
        color: rentaEquipo?.color || '',
        activo: rentaEquipo?.activo ?? true,
        orden: rentaEquipo?.orden || 0,
        images: [],
        imagenes_existentes: rentaEquipo?.images?.map(img => {
            try {
                const url = new URL(img, window.location.origin);
                return url.pathname.replace('/storage/', '');
            } catch {
                return img.replace(/^.*\/storage\//, '');
            }
        }) || [],
    });

    const [caracteristicas, setCaracteristicas] = useState<string[]>(rentaEquipo?.caracteristicas || []);
    const [previews, setPreviews] = useState<string[]>([]);
    const [showError, setShowError] = useState(true);

    useEffect(() => {
        setData('caracteristicas', caracteristicas);
    }, [caracteristicas]);

    useEffect(() => {
        if (errors.error) setShowError(true);
    }, [errors.error]);

    const formatFileSize = (bytes: number): string => {
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = Array.from(e.target.files || []);
        const totalImages = data.imagenes_existentes.length + data.images.length + newFiles.length;

        if (totalImages > MAX_IMAGES) {
            Swal.fire({
                icon: 'warning',
                title: 'Límite de imágenes',
                text: `Solo puedes subir un máximo de ${MAX_IMAGES} imágenes en total`,
            });
            e.target.value = '';
            return;
        }

        const invalidFiles = newFiles.filter(file => file.size > MAX_FILE_SIZE);

        if (invalidFiles.length > 0) {
            const filesList = invalidFiles.map(f =>
                `• ${f.name} (${formatFileSize(f.size)})`
            ).join('\n');

            Swal.fire({
                icon: 'error',
                title: 'Imágenes demasiado grandes',
                html: `Las siguientes imágenes exceden el tamaño máximo permitido de ${formatFileSize(MAX_FILE_SIZE)}:<br><br>
                       <div style="text-align: left; font-family: monospace; font-size: 0.9em;">
                           ${filesList.replace(/\n/g, '<br>')}
                       </div>`,
                confirmButtonText: 'Entendido'
            });
            e.target.value = '';
            return;
        }

        setData('images', [...data.images, ...newFiles]);
        setPreviews([...previews, ...newFiles.map(f => URL.createObjectURL(f))]);
        e.target.value = '';
    };

    const removeExistingImage = (index: number) => {
        const newImages = [...data.imagenes_existentes];
        newImages.splice(index, 1);
        setData('imagenes_existentes', newImages);
    };

    const removeNewImage = (index: number) => {
        const newImages = [...data.images];
        newImages.splice(index, 1);
        setData('images', newImages);

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
        formData.append('description', data.description || '');
        formData.append('color', data.color || '');
        formData.append('activo', data.activo ? '1' : '0');
        formData.append('orden', data.orden.toString());
        data.caracteristicas.forEach((c, i) => formData.append(`caracteristicas[${i}]`, c));
        data.imagenes_existentes.forEach((img, i) => formData.append(`imagenes_existentes[${i}]`, img));
        data.images.forEach(file => formData.append('images[]', file));
        if (isEdit) formData.append('_method', 'PUT');

        const url = isEdit
            ? route('cms.renta-equipos.update', rentaEquipo!.id)
            : route('cms.renta-equipos.store');

        router.post(url, formData as any, {
            forceFormData: true,
            onSuccess: () => {
                Swal.fire({
                    icon: 'success',
                    title: isEdit ? 'Equipo actualizado' : 'Equipo creado',
                    text: isEdit
                        ? 'El equipo ha sido actualizado correctamente.'
                        : 'El equipo ha sido creado correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                }).then(() => {
                    if (!isEdit) window.location.href = route('cms.renta-equipos.index');
                });
            }
        });
    };

    useEffect(() => () => previews.forEach(p => URL.revokeObjectURL(p)), [previews]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Equipo' : 'Crear Equipo'} />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Renta de Equipo' : 'Crear Nueva Renta de Equipo'}
                    </h1>
                    <Link href={route('cms.renta-equipos.index')}>
                        <button className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {errors.error && showError && (
                        <div className="relative py-4 px-6 mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900 dark:text-red-300 rounded-lg">
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
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Título *</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.title}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Subtítulo</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                        />
                        {errors.subtitle && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.subtitle}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Descripción</label>
                        <textarea
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows={5}
                        />
                        {errors.description && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.description}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Color
                        </label>
                        <div className="flex overflow-x-auto space-x-3 pb-2">
                            {colorOptions.map((colorClass) => {
                                const isSelected = data.color === colorClass;
                                return (
                                    <button
                                        key={colorClass}
                                        type="button"
                                        onClick={() => setData('color', colorClass)}
                                        className={`w-10 h-10 cursor-pointer rounded-full border-2 transition duration-150 shrink-0
                                            ${isSelected ? 'ring ring-blue-300 dark:ring-blue-500 border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-neutral-500'}
                                            ${colorClass}
                                        `}
                                        title={colorClass}
                                    />
                                );
                            })}
                        </div>

                        {data.color && (
                            <div className="mt-4 flex items-center space-x-2">
                                <div
                                    className={`w-6 h-6 rounded ${data.color} border border-gray-300 dark:border-neutral-500`}
                                />
                                <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                                    {data.color}
                                </span>
                            </div>
                        )}
                        {errors.color && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.color}</div>
                        )}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Imágenes (Máximo {MAX_IMAGES}, {formatFileSize(MAX_FILE_SIZE)} por imagen)
                        </label>

                        {data.imagenes_existentes.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">Imágenes actuales:</p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {data.imagenes_existentes.map((img, i) => (
                                        <div key={i} className="relative group">
                                            <img
                                                src={img.startsWith('http') ? img : `/storage/${img}`}
                                                alt={`Imagen ${i}`}
                                                className="w-full h-32 object-cover rounded border border-gray-300 dark:border-neutral-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingImage(i)}
                                                className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <LucideIcons.X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {previews.length > 0 && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-neutral-400 mb-2">Nuevas imágenes:</p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                    {previews.map((preview, i) => (
                                        <div key={i} className="relative group">
                                            <img src={preview} alt={`Preview ${i}`} className="w-full h-32 object-cover rounded border border-gray-300 dark:border-neutral-600" />
                                            <button type="button" onClick={() => removeNewImage(i)} className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <LucideIcons.X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {data.imagenes_existentes.length + data.images.length < MAX_IMAGES && (
                            <div className="border-2 border-dashed border-gray-300 dark:border-neutral-600 rounded-lg p-6 text-center">
                                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" id="images" />
                                <label htmlFor="images" className="cursor-pointer inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400">
                                    <LucideIcons.Upload className="w-5 h-5" />
                                    Seleccionar imágenes
                                </label>
                                <p className="text-sm text-gray-500 dark:text-neutral-400 mt-2">
                                    {MAX_IMAGES - data.imagenes_existentes.length - data.images.length} imágenes disponibles
                                </p>
                                <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                                    Tamaño máximo por imagen: {formatFileSize(MAX_FILE_SIZE)}
                                </p>
                            </div>
                        )}
                        {errors.images && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.images}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Características</label>
                        <TagsInput
                            value={caracteristicas}
                            onChange={setCaracteristicas}
                            placeholder="Escribe una característica y presiona Enter"
                            textButton="Agregar"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                        {errors.caracteristicas && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.caracteristicas}</div>}
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">Orden</label>
                        <input
                            type="number"
                            className="w-24 border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.orden}
                            onChange={(e) => setData('orden', parseInt(e.target.value))}
                        />
                        {errors.orden && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.orden}</div>}
                    </div>

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

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideIcons.Save /> {processing ? 'Guardando...' : isEdit ? 'Actualizar Equipo' : 'Crear Equipo'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}