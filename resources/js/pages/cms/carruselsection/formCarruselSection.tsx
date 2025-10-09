import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';

interface CarruselItem {
    id?: number;
    section: string;
    image?: string;
    title1?: string;
    title2?: string;
    description?: string;
    order: number;
    activo: boolean;
}

interface FormCarruselSectionProps {
    item?: CarruselItem;
    section: string;
    sectionTitle?: string;
}

export default function Form({
    item,
    section,
    sectionTitle = section.charAt(0).toUpperCase() + section.slice(1)
}: FormCarruselSectionProps) {
    const isEdit = !!item?.id;

    const { data, setData, post, processing, errors } = useForm<any>({
        section: section,
        image: null,
        title1: item?.title1 || '',
        title2: item?.title2 || '',
        description: item?.description || '',
        order: item?.order || 0,
        activo: item?.activo ?? true,
        _method: isEdit ? 'POST' : 'POST',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        { title: `Carrusel ${sectionTitle}`, href: route('cms.carrusel.index', section) },
        { title: isEdit ? 'Editar Item' : 'Crear Item' }
    ];

    const [showError, setShowError] = useState(true);
    const [imagePreview, setImagePreview] = useState<string | null>(
        item?.image ? `/storage/${item.image}` : null
    );

    useEffect(() => {
        if (errors.error) setShowError(true);
    }, [errors.error]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);

            // Crear preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setData('image', null);
        // Resetear el input file
        const fileInput = document.getElementById('image-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Item actualizado' : 'Item creado',
                text: isEdit
                    ? 'El item del carrusel ha sido actualizado correctamente.'
                    : 'El item del carrusel ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            });
        };

        if (isEdit) {
            post(route('cms.carrusel.update', { section, id: item.id }), {
                forceFormData: true,
                onSuccess: successCallback,
            });
        } else {
            post(route('cms.carrusel.store', section), {
                forceFormData: true,
                onSuccess: successCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${isEdit ? 'Editar' : 'Crear'} Item - Carrusel ${sectionTitle}`} />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Item' : 'Crear Nuevo Item'} - {sectionTitle}
                    </h1>
                    <Link href={route('cms.carrusel.index', section)}>
                        <button className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded transition">
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

                    {/* Imagen */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Imagen del Carrusel {!isEdit && <span className="text-red-500">*</span>}
                        </label>

                        <div className="flex items-start gap-4">
                            {/* Preview de la imagen */}
                            {imagePreview && (
                                <div className="relative w-40 h-24 rounded overflow-hidden border-2 border-gray-300 dark:border-neutral-600 flex-shrink-0">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition"
                                        title="Eliminar imagen"
                                    >
                                        <LucideIcons.X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            {/* Input de archivo */}
                            <div className="flex-1">
                                <input
                                    id="image-input"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full text-sm text-gray-900 dark:text-neutral-100 
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-blue-50 file:text-blue-700
                                        dark:file:bg-blue-900 dark:file:text-blue-300
                                        hover:file:bg-blue-100 dark:hover:file:bg-blue-800
                                        file:cursor-pointer cursor-pointer
                                        border border-gray-300 dark:border-neutral-600 rounded
                                        bg-gray-50 dark:bg-neutral-700"
                                />
                                {isEdit && imagePreview && (
                                    <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                                        Selecciona una nueva imagen para reemplazar la actual
                                    </p>
                                )}
                                {errors.image && (
                                    <div className="text-red-500 dark:text-red-400 text-sm mt-1">
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Título Principal */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Título Principal <span className="text-gray-400">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.title1}
                            onChange={(e) => setData('title1', e.target.value)}
                            placeholder="Ingrese el título principal"
                        />
                        {errors.title1 && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">
                                {errors.title1}
                            </div>
                        )}
                    </div>

                    {/* Título Secundario */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Título Secundario <span className="text-gray-400">(opcional)</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.title2 || ''}
                            onChange={(e) => setData('title2', e.target.value)}
                            placeholder="Ingrese el título secundario"
                        />
                        {errors.title2 && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">
                                {errors.title2}
                            </div>
                        )}
                    </div>

                    {/* Orden */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Orden de visualización
                        </label>
                        <input
                            type="number"
                            min="0"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.order}
                            onChange={(e) => setData('order', parseInt(e.target.value) || 0)}
                        />
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                            Menor número aparece primero
                        </p>
                        {errors.order && (
                            <div className="text-red-500 dark:text-red-400 text-sm mt-1">
                                {errors.order}
                            </div>
                        )}
                    </div>

                    {/* Activo */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="accent-blue-500 w-4 h-4 cursor-pointer"
                        />
                        <label htmlFor="activo" className="text-gray-700 dark:text-neutral-200 cursor-pointer">
                            Activo
                        </label>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-neutral-700">
                        <Link href={route('cms.carrusel.index', section)}>
                            <button
                                type="button"
                                className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded transition"
                            >
                                <LucideIcons.X className="w-4 h-4" />
                                Cancelar
                            </button>
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                            <LucideIcons.Save className="w-4 h-4" />
                            {processing
                                ? 'Guardando...'
                                : isEdit
                                    ? 'Actualizar Item'
                                    : 'Crear Item'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}