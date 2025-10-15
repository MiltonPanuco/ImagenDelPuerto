<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Información general -->
<title>Imagen Del Puerto</title>
<meta name="description" content="En Imagen Del Puerto cuidamos de ti con precisión y calidez. Realizamos radiografías, electrocardiogramas y ofrecemos renta de equipo médico en Puerto Vallarta. Tu salud y comodidad, nuestra prioridad.">
<meta name="keywords" content="Rayos X, Puerto Vallarta, Radiografías, Electrocardiogramas, Renta de equipo médico, Imagen Del Puerto, Estudios médicos, Salud, Diagnóstico, Hospital en Vallarta">
<meta name="author" content="Imagen Del Puerto">
<meta name="robots" content="index, follow">

<!-- Open Graph (para Facebook, WhatsApp, etc.) -->
<meta property="og:type" content="website">
<meta property="og:url" content="{{ url()->current() }}">
<meta property="og:title" content="Imagen Del Puerto">
<meta property="og:description" content="Radiografías, electrocardiogramas y renta de equipo médico en Puerto Vallarta. En Imagen Del Puerto te atendemos con tecnología moderna y atención humana.">
<meta property="og:image" content="{{ asset('og-image.jpg') }}">
<meta property="og:site_name" content="Imagen Del Puerto">
<meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Imagen Del Puerto">
<meta name="twitter:description" content="Atención profesional, tecnología moderna y un trato cálido. En Imagen Del Puerto realizamos estudios médicos de calidad.">
<meta name="twitter:image" content="{{ asset('og-image.jpg') }}">
<meta name="twitter:site" content="@imagen_del_puerto">

<!-- Favicon dinámico (modo claro/oscuro) -->
<link rel="icon" href="{{ asset('favicon-light.svg') }}" type="image/svg+xml" media="(prefers-color-scheme: light)">
<link rel="icon" href="{{ asset('favicon-dark.svg') }}" type="image/svg+xml" media="(prefers-color-scheme: dark)">
<link rel="alternate icon" href="{{ asset('favicon-light.ico') }}" sizes="32x32" media="(prefers-color-scheme: light)">
<link rel="alternate icon" href="{{ asset('favicon-dark.ico') }}" sizes="32x32" media="(prefers-color-scheme: dark)">

<!-- Apple Touch Icon (para iPhone/iPad) -->
<link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}" sizes="180x180">

    <!-- Información de contacto (opcional) -->
    <meta name="contact:phone" content="322 360 2224, 322 310 0019">
    <meta name="contact:facebook" content="https://www.facebook.com/p/Imagen-del-Puerto-61560994465369/">
    <meta name="contact:instagram" content="https://www.instagram.com/imagen_del_puerto/">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function () {
            const appearance = '{{ $appearance ?? "system" }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }

        /* Bloquear scroll cuando el loader está activo */
        body.loading {
            overflow: hidden;
            height: 100vh;
        }

        /* Loading Screen Styles - Solo light mode */
        #initial-loader {
            position: fixed;
            inset: 0;
            background: oklch(1 0 0);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease-out;
        }

        .spinner {
            animation: rotator 1.4s linear infinite;
        }

        @keyframes rotator {
            0% {
                transform: rotate(0deg);
            }

            100% {
                transform: rotate(270deg);
            }
        }

        .path {
            stroke-dasharray: 187;
            stroke-dashoffset: 0;
            transform-origin: center;
            animation: dash 1.4s ease-in-out infinite, colors 5.6s ease-in-out infinite;
        }

        @keyframes colors {
            0% {
                stroke: #2563eb;
            }

            25% {
                stroke: #3b82f6;
            }

            50% {
                stroke: #60a5fa;
            }

            75% {
                stroke: #3b82f6;
            }

            100% {
                stroke: #2563eb;
            }
        }

        @keyframes dash {
            0% {
                stroke-dashoffset: 187;
            }

            50% {
                stroke-dashoffset: 46.75;
                transform: rotate(135deg);
            }

            100% {
                stroke-dashoffset: 187;
                transform: rotate(450deg);
            }
        }

        .loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 3rem;
        }

        .loader-title {
            color: oklch(0.145 0 0);
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 0.75rem;
            font-family: 'Instrument Sans', system-ui, -apple-system, sans-serif;
        }

        .loader-subtitle {
            color: oklch(0.145 0 0);
            font-size: 0.875rem;
            opacity: 0.6;
            font-family: 'Instrument Sans', system-ui, -apple-system, sans-serif;
        }

        /* Ocultar loader después de la carga inicial */
        body:not(.initial-load) #initial-loader {
            display: none;
        }
    </style>

    <title>Imagen Del Puerto</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased loading initial-load">
    <div id="initial-loader">
        <div class="loader-content">
            <svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30">
                </circle>
            </svg>
        </div>
    </div>

    @inertia

    <script>
        // Solo mostrar el loader en la carga inicial
        (function () {
            // Verificar si ya hemos cargado antes en esta sesión
            const hasLoadedBefore = sessionStorage.getItem('app-loaded');

            if (hasLoadedBefore) {
                document.body.classList.remove('initial-load', 'loading');
                const loader = document.getElementById('initial-loader');
                if (loader) {
                    loader.style.display = 'none';
                }
                return;
            }

            // Primera carga: mostrar el loader normalmente
            let minimumTimePassed = false;
            let appReady = false;

            setTimeout(function () {
                minimumTimePassed = true;
                hideLoaderIfReady();
            }, 2000);

            document.addEventListener('DOMContentLoaded', function () {
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        appReady = true;
                        hideLoaderIfReady();
                    });
                });
            });

            function hideLoaderIfReady() {
                if (minimumTimePassed && appReady) {
                    const loader = document.getElementById('initial-loader');
                    const body = document.body;

                    if (loader) {
                        loader.style.opacity = '0';
                        setTimeout(function () {
                            loader.style.display = 'none';
                            body.classList.remove('loading', 'initial-load');
                            sessionStorage.setItem('app-loaded', 'true');
                        }, 500);
                    }
                }
            }
        })();
    </script>
</body>

</html>
