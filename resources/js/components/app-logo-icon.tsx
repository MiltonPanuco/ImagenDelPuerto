import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/logo_idp.svg"
            alt="Imagen del Puerto Logo"
            {...props}
        />
    );
}
