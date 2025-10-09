import { Head, useForm, Link } from '@inertiajs/react';
import { type FormEvent, useState, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import Swal from 'sweetalert2';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Carrusel Home' }];

interface Carrusel {
    id?: number;
    title: string;
    descripcion: string;
    image?: string;
    image_url?: string;
    orden: number;
    activo: boolean;
}

export default function FormHomeCarrusel({ carrusel }: { carrusel: Carrusel }) {
    const isEdit = !!carrusel?.id;
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Inicializar el preview con la imagen existente si estamos editando
    const [previewImage, setPreviewImage] = useState<string | null>(
        isEdit && carrusel?.image_url ? carrusel.image_url : null
    );

    const { data, setData, post, processing, errors } = useForm({
        title: carrusel?.title || '',
        descripcion: carrusel?.descripcion || '',
        image: null as File | null,
        orden: carrusel?.orden || 0,
        activo: carrusel?.activo ?? false,
        _method: isEdit ? 'PUT' : 'POST',
    });

    const [showError, setShowError] = useState(true);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setData('image', file);

            // Crear preview de la nueva imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);

        // Si estamos editando, volver a mostrar la imagen original
        if (isEdit && carrusel?.image_url) {
            setPreviewImage(carrusel.image_url);
        } else {
            setPreviewImage(null);
        }

        // Limpiar el input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Carrusel actualizado' : 'Carrusel creado',
                text: isEdit
                    ? 'El slide ha sido actualizado correctamente.'
                    : 'El slide ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            }).then(() => {
                if (!isEdit) {
                    window.location.href = route('cms.homecarrusel.index');
                }
            });
        };

        const errorCallback = (errors: any) => {
            console.log('Errores de validación:', errors);
        };

        if (isEdit) {
            post(route('cms.homecarrusel.update', carrusel.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: successCallback,
                onError: errorCallback,
            });
        } else {
            post(route('cms.homecarrusel.store'), {
                forceFormData: true,
                onSuccess: successCallback,
                onError: errorCallback,
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Slide' : 'Crear Slide'} />

            <div className="md:p-15 p-10 bg-white dark:bg-neutral-800">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold text-gray-900 dark:text-neutral-100">
                        {isEdit ? 'Editar Slide del Carrusel' : 'Crear Nuevo Slide'}
                    </h1>
                    <Link href={route('cms.homecarrusel.index')}>
                        <button type="button" className="inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded">
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
                        <label htmlFor="title" className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Título
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Título del slide"
                        />
                        {errors.title && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.title}</div>}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label htmlFor="descripcion" className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            rows={3}
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            placeholder="Descripción del slide"
                        />
                        {errors.descripcion && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.descripcion}</div>}
                    </div>

                    {/* Imagen */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Imagen {!isEdit && <span className="text-red-500 dark:text-red-400">*</span>}
                        </label>

                        <div className="space-y-3">
                            {/* Preview de la imagen */}
                            {previewImage && (
                                <div className="relative inline-block">
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="max-h-64 rounded-lg border-2 border-gray-300 dark:border-neutral-600"
                                    />
                                    {data.image && (
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition"
                                            title="Quitar imagen seleccionada"
                                        >
                                            <LucideIcons.X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Input para subir imagen */}
                            <div className="flex items-center gap-3">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="image-upload"
                                    name="image"
                                />
                                <label
                                    htmlFor="image-upload"
                                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
                                >
                                    <LucideIcons.Upload className="w-4 h-4 mr-2" />
                                    {previewImage ? 'Cambiar Imagen' : 'Seleccionar Imagen'}
                                </label>
                                <span className="text-sm text-gray-500 dark:text-neutral-400">
                                    Formatos: JPG, PNG, WEBP. Máx: 2MB
                                </span>
                            </div>
                        </div>

                        {errors.image && <div className="text-red-500 dark:text-red-400 text-sm mt-2">{errors.image}</div>}
                    </div>

                    {/* Orden */}
                    <div>
                        <label htmlFor="orden" className="block mb-2 font-medium text-sm text-gray-700 dark:text-neutral-200">
                            Orden de aparición
                        </label>
                        <input
                            id="orden"
                            name="orden"
                            type="number"
                            min="0"
                            className="w-full border rounded px-3 py-2 bg-gray-50 dark:bg-neutral-700 border-gray-300 dark:border-neutral-600 text-gray-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                            value={data.orden}
                            onChange={(e) => setData('orden', parseInt(e.target.value) || 0)}
                            placeholder="0"
                        />
                        <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                            Menor número aparece primero en el carrusel
                        </p>
                        {errors.orden && <div className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.orden}</div>}
                    </div>

                    {/* Activo */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            name="activo"
                            type="checkbox"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                            className="accent-blue-500 w-4 h-4"
                        />
                        <label htmlFor="activo" className="cursor-pointer text-gray-700 dark:text-neutral-200">Activo</label>
                    </div>

                    {/* Botón */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LucideIcons.Save />
                            {processing
                                ? 'Guardando...'
                                : isEdit
                                    ? 'Actualizar Slide'
                                    : 'Crear Slide'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}