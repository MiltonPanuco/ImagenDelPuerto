import { Link } from '@inertiajs/react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import AppLogo from './app-logo';

import { dashboard } from '@/routes';
import { index as cmsServicios } from '@/routes/cms/servicios';
import { index as cmsEleccion } from '@/routes/cms/eleccion';
import { index as cmsMision } from '@/routes/cms/mision';
import { index as cmsOfrecemos } from '@/routes/cms/ofrecemos';
import { index as cmsEstadisticas } from '@/routes/cms/estadisticas';
import { index as cmsGaleriaRecuerdos } from '@/routes/cms/galeria/recuerdos';
import { index as cmsEquipamiento } from '@/routes/cms/galeria/equipamiento';
import { index as cmsAtencion } from '@/routes/cms/atencion';
import { index as cmsCitas } from '@/routes/cms/citas';
import { index as cmsSociales } from '@/routes/cms/sociales';

import { type NavItem } from '@/types';
import {
    Briefcase,
    ClipboardCheck,
    Target,
    Eye,
    Package,
    BarChart,
    Image,
    Images,
    LayoutGrid,
    Users,
    FileText,
    Share2
} from 'lucide-react';

const homeItems: NavItem[] = [
    { title: 'Carrusel Home', icon: Images, href: route('cms.carrusel.index', 'home') },
    { title: 'Servicios', icon: Briefcase, href: cmsServicios() },
    { title: 'Elecciones', icon: ClipboardCheck, href: cmsEleccion() },
];

const aboutItems: NavItem[] = [
    { title: 'Carrusel About', icon: Images, href: route('cms.carrusel.index', 'about') },
    { title: 'Misión / Visión', icon: Target, href: cmsMision() },
    { title: 'Ofrecemos', icon: Package, href: cmsOfrecemos() },
    { title: 'Estadísticas', icon: BarChart, href: cmsEstadisticas() },
];

const galleryItems: NavItem[] = [
    { title: 'Equipamiento', icon: Briefcase, href: cmsEquipamiento() },
    { title: 'Recuerdos y carrusel', icon: Image, href: cmsGaleriaRecuerdos() },
];

const serviceItems: NavItem[] = [
    { title: 'Carrusel Service', icon: Images, href: route('cms.carrusel.index', 'service') },
];

const contactItems: NavItem[] = [
    { title: 'Carrusel Contact', icon: Images, href: route('cms.carrusel.index', 'contact') },
    { title: 'Atención', icon: Users, href: cmsAtencion() },
    { title: 'Citas', icon: FileText, href: cmsCitas() },
    { title: 'Social', icon: Share2, href: cmsSociales() },
];

const mainNavItems: NavItem[] = [
    { title: 'Dashboard', icon: LayoutGrid, href: dashboard() },
    { title: 'Inicio', type: 'label', children: homeItems },
    { title: 'About Us', type: 'label', children: aboutItems },
    { title: 'Servicios', type: 'label', children: serviceItems },
    { title: 'Galería', type: 'label', children: galleryItems },
    { title: 'Contacto', type: 'label', children: contactItems },
];

// Footer vacío
const footerNavItems: NavItem[] = [];

//  Sidebar

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">

            {/* Header con logo */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Contenido principal */}
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* Footer con usuario y otros items */}
            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}