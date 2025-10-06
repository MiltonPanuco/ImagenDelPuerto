import { Head, useForm, Link } from '@inertiajs/react'
import { type FormEvent, useState, useEffect } from 'react'
import AppLayout from '@/layouts/app-layout'
import { type BreadcrumbItem } from '@/types'
import * as LucideIcons from 'lucide-react'
import * as FaIcons from 'react-icons/fa'
import * as SiIcons from 'react-icons/si'
import Swal from 'sweetalert2'

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Gestionar Redes Sociales' }]

const socialIconOptions = [
    'FaFacebook',
    'FaInstagram',
    'FaTwitter',
    'FaXTwitter',
    'FaTiktok',
    'FaYoutube',
    'FaWhatsapp',
    'FaTelegram',
]

const colorOptions = [
    'blue',
    'pink',
    'red',
    'green',
    'purple',
    'yellow',
    'black',
    'gray',
]

interface Social {
    id?: number
    title: string
    icon?: string
    color: string
    description: string
    url: string
    activo: boolean
}

export default function FormSocial({ social }: { social: Social }) {
    const isEdit = !!social?.id

    const { data, setData, post, put, processing, errors } = useForm<Social>({
        title: social.title || '',
        icon: social.icon || '',
        color: social.color || '',
        description: social.description || '',
        url: social.url || '',
        activo: social.activo || false,
    })

    const [showError, setShowError] = useState(true)

    useEffect(() => {
        if (errors.error) {
            setShowError(true)
        }
    }, [errors.error])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        const successCallback = () => {
            Swal.fire({
                icon: 'success',
                title: isEdit ? 'Red social actualizada' : 'Red social creada',
                text: isEdit
                    ? 'La red social ha sido actualizada correctamente.'
                    : 'La red social ha sido creada correctamente.',
                timer: 2000,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
            })
        }

        if (isEdit) {
            put(route('cms.sociales.update', social.id), { onSuccess: successCallback })
        } else {
            post(route('cms.sociales.store'), { onSuccess: successCallback })
        }
    }

    // Renderizar ícono de React Icons
    const renderIcon = (iconName: string, className: string) => {
        let IconComponent = FaIcons[iconName as keyof typeof FaIcons]

        if (!IconComponent) {
            IconComponent = SiIcons[iconName as keyof typeof SiIcons]
        }

        if (IconComponent && typeof IconComponent === 'function') {
            return <IconComponent className={className} />
        }

        return <FaIcons.FaGlobe className={className} />
    }

    // Obtener clases de color
    const getColorClass = (color: string) => {
        const colorMap: Record<string, string> = {
            blue: 'bg-blue-500',
            pink: 'bg-pink-500',
            red: 'bg-red-500',
            green: 'bg-green-500',
            purple: 'bg-purple-500',
            yellow: 'bg-yellow-500',
            black: 'bg-gray-900',
            gray: 'bg-gray-500',
        }
        return colorMap[color] || 'bg-blue-500'
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Red Social' : 'Crear Red Social'} />

            <div className="mb-6 md:p-15 p-10">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-semibold">
                        {isEdit ? 'Editar Red Social' : 'Crear Nueva Red Social'}
                    </h1>
                    <Link href={route('cms.sociales.index')}>
                        <button className="cursor-pointer inline-flex items-center px-4 py-2 bg-red-400 hover:bg-red-300 text-white rounded">
                            <LucideIcons.ArrowBigLeft className="w-4 h-4 mr-2" />
                            Regresar
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Título */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Título
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && (
                            <div className="text-red-500 text-sm">{errors.title}</div>
                        )}
                    </div>

                    {/* Ícono */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Ícono de Red Social
                        </label>

                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
                            {socialIconOptions.map((iconName) => {
                                const isSelected = data.icon === iconName

                                return (
                                    <button
                                        key={iconName}
                                        type="button"
                                        onClick={() => setData('icon', iconName)}
                                        className={`cursor-pointer group transition duration-150 ease-in-out border rounded-lg p-4 flex flex-col items-center justify-center hover:scale-105 hover:shadow-md ${isSelected
                                                ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-500'
                                                : 'border-gray-300 hover:border-gray-400'
                                            }`}
                                        title={iconName}
                                    >
                                        <div className={`${isSelected ? getColorClass(data.color) : 'bg-gray-600'} p-2 rounded-lg mb-2`}>
                                            {renderIcon(iconName, 'w-6 h-6 text-white')}
                                        </div>
                                        <span className="text-xs text-center text-gray-600">
                                            {iconName.replace('Fa', '')}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>

                        {data.icon && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg flex items-center space-x-3">
                                <div className={`${getColorClass(data.color)} p-3 rounded-lg`}>
                                    {renderIcon(data.icon, 'w-8 h-8 text-white')}
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Ícono seleccionado:</p>
                                    <p className="text-base font-medium text-gray-900">{data.icon}</p>
                                </div>
                            </div>
                        )}
                        {errors.icon && (
                            <div className="text-red-500 text-sm">{errors.icon}</div>
                        )}
                    </div>

                    {/* Color */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Color de la red social
                        </label>
                        <div className="flex flex-wrap gap-3">
                            {colorOptions.map((color) => {
                                const isSelected = data.color === color
                                return (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setData('color', color)}
                                        className={`relative w-12 h-12 cursor-pointer rounded-lg transition duration-150 ${isSelected
                                                ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                                                : 'hover:scale-105'
                                            } ${getColorClass(color)}`}
                                        title={color}
                                    >
                                        {isSelected && (
                                            <LucideIcons.Check className="absolute inset-0 m-auto w-6 h-6 text-white" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>

                        {data.color && (
                            <div className="mt-4 flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded ${getColorClass(data.color)}`} />
                                <span className="text-sm font-medium text-gray-700 capitalize">
                                    {data.color}
                                </span>
                            </div>
                        )}
                        {errors.color && (
                            <div className="text-red-500 text-sm">{errors.color}</div>
                        )}
                    </div>

                    {/* Descripción */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            Descripción
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            placeholder="@usuario o nombre de página"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        {errors.description && (
                            <div className="text-red-500 text-sm">{errors.description}</div>
                        )}
                    </div>

                    {/* URL */}
                    <div>
                        <label className="block mb-2 font-medium text-sm text-gray-700">
                            URL
                        </label>
                        <input
                            type="url"
                            className="w-full border rounded px-3 py-2"
                            placeholder="https://ejemplo.com/tu-perfil"
                            value={data.url}
                            onChange={(e) => setData('url', e.target.value)}
                        />
                        {errors.url && (
                            <div className="text-red-500 text-sm">{errors.url}</div>
                        )}
                    </div>

                    {/* Activo */}
                    <div className="flex items-center space-x-2">
                        <input
                            id="activo"
                            type="checkbox"
                            className="w-4 h-4"
                            checked={data.activo}
                            onChange={(e) => setData('activo', e.target.checked)}
                        />
                        <label htmlFor="activo" className="text-sm font-medium text-gray-700">
                            Activo
                        </label>
                    </div>

                    {/* Botón Guardar */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium"
                        >
                            <LucideIcons.Save className="w-5 h-5" />
                            {processing
                                ? 'Guardando...'
                                : isEdit
                                    ? 'Actualizar Red Social'
                                    : 'Crear Red Social'}
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    )
}