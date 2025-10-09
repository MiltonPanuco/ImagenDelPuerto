import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center">
                <AppLogoIcon className="size-full object-contain" />
            </div>
            <div className="ml-2 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Imagen Del Puerto</span>
                <span className="truncate text-xs text-muted-foreground">Panel de Control</span>
            </div>
        </>
    );
}