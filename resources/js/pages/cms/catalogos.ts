import { index as cmsServicios } from '@/routes/cms/servicios';
import * as LucideIcons from 'lucide-react';

export const secciones = [
    {
        seccion: 'Servicios',
        icon: LucideIcons.Shrink,
        color: 'blue',
        url: cmsServicios.url(),
    },
];

// Lista de íconos que quieras permitir (puedes ampliarla)
export const iconOptions = [
    'Activity',
    'AlarmClock',
    'Aperture',
    'Book',
    'Briefcase',
    'Calendar',
    'Camera',
    'CheckCircle',
    'ClipboardList',
    'Cloud',
    'Code',
    'DollarSign',
    'Heart',
    'Home',
    'Layers',
    'Mail',
    'MapPin',
    'Phone',
    'Settings',
    'ShoppingCart',
    'Star',
    'User',
];

// Lista de colores Tailwind (puedes personalizar según tu paleta)
export const colorOptions = [
    'bg-red-500',
    'bg-orange-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-gray-500',
    'bg-zinc-500',
    'bg-neutral-500',
    'bg-stone-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-sky-500',
    'bg-fuchsia-500',
    'bg-lavender-500',
];

