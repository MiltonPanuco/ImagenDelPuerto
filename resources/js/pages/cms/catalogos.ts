import { index as cmsServicios } from '@/routes/cms/servicios';
import { index as cmsEleccion } from '@/routes/cms/eleccion';
import { index as cmsMision } from '@/routes/cms/mision';

import * as LucideIcons from 'lucide-react';

export const secciones = [
    {
        seccion: 'Servicios',
        icon: LucideIcons.Shrink,
        color: 'blue',
        url: cmsServicios.url(),
    },
    {
        seccion: 'Elecciones',
        icon: LucideIcons.Shrink,
        color: 'blue',
        url: cmsEleccion.url(),
    },
    {
        seccion: 'Mision',
        icon: LucideIcons.Shrink,
        color: 'blue',
        url: cmsMision.url(),
    },
];

export const iconOptions = [
    'Activity',        
    'AlarmClock',     
    'Calendar',        
    'ClipboardList',   
    'Camera',          
    'CheckCircle',      
    'DollarSign',    
    'Heart',   
    'Home',     
    'Layers',           
    'Mail',   
    'MapPin',  
    'Phone',     
    'Settings',         
    'User',       
    'AlertCircle', 
    'Crosshair',        
    'Droplet',          
    'Microscope',   
    'Stethoscope',     
    'Thermometer',  
    'Bandage',          
    'Syringe',     
    'X',
    'Shield',
    'Users',
    'Award',
    'Zap',
    'Eye',
    
];

export const colorOptions = [
    'bg-blue-500',
    'bg-sky-500',
    'bg-blue-600',
    'bg-teal-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-yellow-500',
    'bg-amber-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-rose-500',
    'bg-pink-500',
    'bg-fuchsia-500',
    'bg-purple-500',
    'bg-gray-500',
    'bg-slate-500',
    'bg-neutral-500',
    'bg-white',
    'bg-black',
];


