import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';

import { index as cmsServicios } from '@/routes/cms/servicios';
import { index as cmsEleccion} from '@/routes/cms/eleccion';
import { index as cmsMision} from '@/routes/cms/mision';
import { index as cmsVision } from '@/routes/cms/vision';
import { index as cmsOfrecemos} from '@/routes/cms/ofrecemos';
import { index as cmsGaleriaRecuerdos } from '@/routes/cms/galeria/recuerdos';

import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Shrink, LayoutGrid, BookUser, Target, Eye, Image, Hand } from 'lucide-react';
import AppLogo from './app-logo';

const homeItems: NavItem[] = [
    {
        title: 'Servicios',
        icon: Shrink,
        href: cmsServicios(),
    },
    {
        title: 'Elecciones',
        icon: BookUser,
        href: cmsEleccion(),
    }
];

const aboutItems: NavItem[] = [
    {
        title: 'Mision',
        icon: Target,
        href: cmsMision(),
    },
    {
        title: 'Vision',
        icon: Eye,
        href: cmsVision(),
    },
    {
        title: 'Ofrecemos',
        icon: Hand,
        href: cmsOfrecemos(),
    }
];

const GalleryItems: NavItem[] = [
    {
        title: 'Carrusel / Recuerdos',
        icon: Image,
        href: cmsGaleriaRecuerdos(),
    },
];

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Inicio',
        type: 'label',
        children: homeItems,
    },
    {
        title: 'About Us',
        type: 'label',
        children: aboutItems,
    },
    {
        title: 'Gallery',
        type: 'label',
        children: GalleryItems,
    },
];

const footerNavItems: NavItem[] = [
    // {
    //     title: 'Repository',
    //     href: 'https://github.com/laravel/react-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits#react',
    //     icon: BookOpen,
    // },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
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

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
