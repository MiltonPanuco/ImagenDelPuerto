import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Separator } from '@/components/ui/separator';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <Separator className="mb-3"/>
            <SidebarMenu>
                {items.map((item) => {
                    // Si el item es un label con hijos
                    if (item.type === 'label' && item.children?.length) {
                        return (
                            <div key={item.title}>
                                <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                                {item.children.map((child) => (
                                    <SidebarMenuItem key={child.title}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={page.url.startsWith(
                                                typeof child.href === 'string'
                                                    ? child.href
                                                    : child.href.url
                                            )}
                                            tooltip={{ children: child.title }}
                                        >
                                            <Link href={child.href} prefetch>
                                                {child.icon && <child.icon className="mr-2" />}
                                                <span>{child.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </div>
                        );
                    }

                    // Si es un ítem individual (normal)
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={page.url.startsWith(
                                    typeof item.href === 'string'
                                        ? item.href
                                        : item.href.url
                                )}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="mr-2" />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>

                            {/* Submenú si tiene hijos (aunque sea tipo item) */}
                            {item.children?.length > 0 && (
                                <SidebarMenu className="pl-4 border-l border-slate-200 ml-2 mt-1">
                                    {item.children.map((child) => (
                                        <SidebarMenuItem key={child.title}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={page.url.startsWith(
                                                    typeof child.href === 'string'
                                                        ? child.href
                                                        : child.href.url
                                                )}
                                                tooltip={{ children: child.title }}
                                            >
                                                <Link href={child.href} prefetch>
                                                    {child.icon && <child.icon className="mr-2" />}
                                                    <span>{child.title}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            )}
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
