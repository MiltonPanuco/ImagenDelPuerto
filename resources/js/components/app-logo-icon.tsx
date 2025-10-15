import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/logo_idp.png" alt="Imagen del Puerto Logo" {...props} />
    );
}
