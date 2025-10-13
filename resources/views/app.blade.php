<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Meta Tags Básicos --}}
    <meta name="description" content="{{ $metaDescription ?? 'Descripción de tu aplicación' }}">
    <meta name="keywords" content="{{ $metaKeywords ?? 'laravel, app' }}">
    <meta name="author" content="{{ config('app.name') }}">

    {{-- Open Graph (Facebook, WhatsApp, LinkedIn) --}}
    <meta property="og:site_name" content="{{ config('app.name') }}">
    <meta property="og:title" content="{{ $metaTitle ?? config('app.name') }}">
    <meta property="og:description" content="{{ $metaDescription ?? 'Descripción de tu aplicación' }}">
    <meta property="og:image" content="{{ $metaImage ?? asset('images/og-image.png') }}">
    <meta property="og:url" content="{{ $metaUrl ?? url()->current() }}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="{{ str_replace('_', '-', app()->getLocale()) }}">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $metaTitle ?? config('app.name') }}">
    <meta name="twitter:description" content="{{ $metaDescription ?? 'Descripción de tu aplicación' }}">
    <meta name="twitter:image" content="{{ $metaImage ?? asset('images/og-image.png') }}">
    <meta name="twitter:site" content="@tu_usuario">

    {{-- Theme Color --}}
    <meta name="theme-color" content="#2563eb" media="(prefers-color-scheme: light)">
    <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)">

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

        /* Loading Screen Styles */
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

        html.dark #initial-loader {
            background: oklch(0.145 0 0);
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

        html.dark .path {
            animation: dash 1.4s ease-in-out infinite, colorsDark 5.6s ease-in-out infinite;
        }

        @keyframes colorsDark {
            0% {
                stroke: #3b82f6;
            }

            25% {
                stroke: #60a5fa;
            }

            50% {
                stroke: #93c5fd;
            }

            75% {
                stroke: #60a5fa;
            }

            100% {
                stroke: #3b82f6;
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

        html.dark .loader-title,
        html.dark .loader-subtitle {
            color: oklch(1 0 0);
        }
    </style>

    <title inertia>{{ $metaTitle ?? config('app.name', 'Laravel') }}</title>

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

<body class="font-sans antialiased loading">
    {{-- Loading Screen Inicial --}}
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
                        loader.remove();
                        body.classList.remove('loading');
                    }, 500);
                }
            }
        }
    </script>
</body>

</html>