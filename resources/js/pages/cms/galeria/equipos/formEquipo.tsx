import { Head, useForm, router } from '@inertiajs/react';
import { type FormEvent, useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import * as LucideIcons from 'lucide-react';
import { iconOptions, colorOptions } from '@/pages/cms/catalogos';
import Swal from 'sweetalert2';
import { Switch } from '@/components/ui/switch';
import TagsInput from '@/components/ui/TagsInput';
import FileUpload from '@/components/ui/file-upload';
import { SwalError2, SwalToast } from '@/lib/swal';
import { apiPost } from '@/lib/axios';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Equipo' }];

interface Equipo {
    id?: number;
    id_galeria_equipamiento: number;
    icon: string;
    color: string;
    servicio: string;
    descripcion: boolean;
    caracteristicas: string[];
    image: string | null;
    activo: boolean;
}

interface Equipamiento {
    id: number;
    titulo: string;
}

export default function FormEquipo({ equipamiento, equipo, backUrl }: { equipamiento: Equipamiento, equipo: Equipo, backUrl: string }) {
    const isEdit = !!equipo?.id;
    const [caracteristicas, setCaracteristicas] = useState<string[]>([]);
    const [showFileUpload, setShowFileUpload] = useState(true);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const { data, setData, post, put, processing, errors } = useForm<Equipo>({
        id_galeria_equipamiento: equipo.id_galeria_equipamiento || 0,
        icon: equipo.icon || '',
        color: equipo.color || '',
        servicio: equipo.servicio || '',
        descripcion: equipo.descripcion || '',
        caracteristicas: equipo.caracteristicas || [],
        activo: equipo.activo || false,
        image: equipo.image || null,
    });

    useEffect(() => {
        setData('caracteristicas', caracteristicas);
    }, [caracteristicas, setData]);

    /** Para mostrar etiquetas de las caracteristicas en bd */
    useEffect(() => {
        if (isEdit && equipo.caracteristicas) {
            setCaracteristicas(equipo.caracteristicas);
        }
    }, [isEdit, equipo.caracteristicas]);

    useEffect(() => {
        if (isEdit && equipo.image) {
            setCurrentImage(equipo.image);
        }
    }, [isEdit, equipo.image]);

    const handleSwitch = (v: boolean) => {
        setData('activo', v);
    }

    const handleFileAccepted = (archivos) => {
        /** El primero del arreglo [porque maxfiles = 1] */
        setData('image', archivos[0]);
    };

    /** Es edit y se reemplaza la imagen en bd */
    const replaceFile = async (archivos) => {
        const file = archivos[0];
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append('image', archivos[0]);
            const url = route('cms.galeria.equipamiento.equipo.replaceImage', { equipamiento: equipamiento.id, equipo: equipo.id });
            const r = await apiPost(url, formData);

            SwalToast('Exito', 'Imagen reemplazada correctamente', 'success')
            setCurrentImage(r.data.imageUrl);
        } catch (e) {
            SwalError2(e, 'Error al reemplazar la imagen')
        } finally {
            /** Se reinicia el componente */
            setShowFileUpload(false);
            setTimeout(() => setShowFileUpload(true), 1);
        }
    }

    const [showError, setShowError] = useState(true);
    /** Mostrar error si existe */
    useEffect(() => {
        if (errors.error) setShowError(true);

        /** Forzar al usuario a re subir la imagen si ocurre un error */
        if (errors) {
            setData('image', null);
            setShowFileUpload(false);
            setTimeout(() => setShowFileUpload(true), 1);
        }
    }, [errors, setData]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Equipo actualizado' : 'Equipo creado',
                text: isEdit ? 'El equipo ha sido actualizado correctamente.' : 'El equipo ha sido creado correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            })
        };

        if (isEdit) {
            put(route('cms.galeria.equipamiento.equipo.update', { equipamiento: equipamiento.id, equipo: equipo.id }), {
                onSuccess: successCallback,
            });
        } else {
            if (!(data.image instanceof File)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Imagen inválida',
                    text: 'Por favor, selecciona una imagen válida para el equipo.',
                });
                return;
            }
            post(route('cms.galeria.equipamiento.equipo.store', { equipamiento: equipamiento.id }), {
                forceFormData: true,
                onSuccess: successCallback,
            });
        }
    };

    const handleVolver = () => {
        router.visit(backUrl);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Equipo' : 'Crear Equipo'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {equipamiento.titulo}
                        <span className="text-sm font-normal text-gray-500"> / {isEdit ? 'Editar Equipo' : 'Crear Equipo'}</span>
                    </h1>
                    <button onClick={handleVolver} className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded">
                        <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                        Regresar
                    </button>
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
                        <label className="block mb-2 font-medium text-sm text-gray-700">Nombre del Equipo</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.servicio}
                            onChange={(e) => setData('servicio', e.target.value)}
                        />
                        {errors.servicio && <div className="text-red-500 text-sm">{errors.servicio}</div>}
                    </div>
                    {isEdit && (
                        <div className="my-4 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                            {showFileUpload && (
                                <FileUpload
                                    maxFiles={1}
                                    maxFileSizeMb={5}
                                    showPreview={false}
                                    acceptedFileTypes={['image/*']}
                                    onFileAccepted={replaceFile}
                                    onFileRejected={rejected => {
                                        console.error('Archivos rechazados:', rejected);
                                    }}
                                />
                            )}
                            <div className="flex flex-col items-center">
                                <label className="mb-2 text-sm text-gray-600">Imagen actual</label>
                                <div className="text-xs text-gray-500 mb-2">Si deseas cambiar la imagen, selecciona un nuevo archivo.</div>
                                <img src={currentImage || '/storage/default_card.svg'} alt={data.servicio} className="rounded shadow w-50 object-cover" />
                            </div>
                        </div>
                    )}
                    {!isEdit && showFileUpload && (
                        <FileUpload
                            maxFiles={1}
                            twoColumns={true}
                            maxFileSizeMb={5}
                            showPreview={true}
                            acceptedFileTypes={['image/*']}
                            onFileAccepted={handleFileAccepted}
                            onFileRejected={rejected => {
                            console.error('Archivos rechazados:', rejected);
                            }}
                        />
                        )}

                    {errors.image && <div className="text-red-500 text-sm">{errors.image}</div>}

                    {/* Ícono y Color */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            {/* Scrollable vertical color grid */}
                            <div className="grid grid-cols-6 gap-3 max-h-48 overflow-y-auto pr-2 border rounded p-2">
                                {colorOptions.map((colorClass) => {
                                    const isSelected = data.color === colorClass;

                                    return (
                                        <button
                                            key={colorClass}
                                            type="button"
                                            onClick={() => setData('color', colorClass)}
                                            className={`w-10 h-10 cursor-pointer rounded-full border-2 transition duration-150 flex items-center justify-center ${
                                                isSelected ? 'border-blue-500 ring ring-blue-300' : 'border-gray-300'
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
                        <label htmlFor="activo" className="font-bold">Activo</label>
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
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                        >
                            <LucideIcons.Save /> {processing ? 'Guardando...' : isEdit ? 'Actualizar Equipo' : 'Crear Equipo'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
