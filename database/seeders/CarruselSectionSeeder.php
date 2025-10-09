<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CarruselSection;

class CarruselSectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Carrusel HOME
        $homeItems = [
            [
                'section' => 'home',
                'image' => 'carrusel/home/carrusel1.jpg',
                'title1' => '',
                'title2' => '',
                'order' => 1,
                'activo' => true,
            ],
            [
                'section' => 'home',
                'image' => 'carrusel/home/carrusel2.jpg',
                'title1' => 'Cuidado al Alcance',
                'title2' => 'Resuelve tus dudas y accede a nuestros servicios de salud sin complicaciones, rápido y seguro',
                'order' => 2,
                'activo' => true,
            ],
            [
                'section' => 'home',
                'image' => 'carrusel/home/carrusel3.jpg',
                'title1' => 'Bienestar para ti',
                'title2' => 'Explora consejos, recomendaciones y acompañamiento médico que se adaptan a tu estilo de vida',
                'order' => 3,
                'activo' => true,
            ],
        ];

        // Carrusel ABOUT
        $aboutItems = [
            [
                'section' => 'about',
                'image' => 'carrusel/about/carrusel1.jpg',
                'title1' => 'Quiénes Somos',
                'title2' => 'Somos un equipo comprometido con brindar servicios de salud confiables y de la más alta calidad',
                'order' => 1,
                'activo' => true,
            ],
            [
                'section' => 'about',
                'image' => 'carrusel/about/carrusel2.jpg',
                'title1' => 'Nuestra Misión',
                'title2' => 'Cuidar de tu bienestar ofreciendo atención profesional, tecnología avanzada y un trato humano',
                'order' => 2,
                'activo' => true,
            ],
            [
                'section' => 'about',
                'image' => 'carrusel/about/carrusel3.jpg',
                'title1' => 'Nuestros Valores',
                'title2' => 'Trabajamos con honestidad, respeto y dedicación para garantizar tu confianza y seguridad',
                'order' => 3,
                'activo' => true,
            ],
        ];

        // Carrusel SERVICE
        $serviceItems = [
            [
                'section' => 'service',
                'image' => 'carrusel/service/carrusel1.jpg',
                'title1' => 'Rayos X',
                'title2' => 'Tu centor de confianza para radiografías especializadas',
                'order' => 1,
                'activo' => true,
            ],
            [
                'section' => 'service',
                'image' => 'carrusel/service/carrusel2.jpg',
                'title1' => 'Electrocardiogramas',
                'title2' => 'Monitoreo preciso detu corazón para un diagnostico seguro',
                'order' => 2,
                'activo' => true,
            ],
            [
                'section' => 'service',
                'image' => 'carrusel/service/carrusel3.jpg',
                'title1' => 'Equipo Médico',
                'title2' => 'Tecnología de calidad para el cuidado y bienestar de tu salud',
                'order' => 3,
                'activo' => true,
            ],
        ];

        // Carrusel GALLERY
        $galleryItems = [
            [
                'section' => 'gallery',
                'image' => 'carrusel/gallery/carrusel1.jpg',
                'title1' => 'Recuerdos Digitales',
                'title2' => 'Guardamos y atesoramos cada momento siempre',
                'order' => 1,
                'activo' => true,
            ],
            [
                'section' => 'gallery',
                'image' => 'carrusel/gallery/carrusel2.jpg',
                'title1' => 'Nuestro Equipo',
                'title2' => 'Contamos con tecnología de última generación para garantizar la mejor calidad en cada captura',
                'order' => 2,
                'activo' => true,
            ],
            [
                'section' => 'gallery',
                'image' => 'carrusel/gallery/carrusel3.jpg',
                'title1' => 'Tu salud y comodidad',
                'title2' => 'Nuestra prioridad',
                'order' => 3,
                'activo' => true,
            ],
        ];

        // Carrusel CONTACT
        $contactItems = [
            [
                'section' => 'contact',
                'image' => 'carrusel/contact/carrusel1.jpeg',
                'title1' => 'Escríbenos',
                'title2' => 'Envíanos un mensaje y recive la atención que necesitas de forma rápida y personalizada',
                'order' => 1,
                'activo' => true,
            ],
            [
                'section' => 'contact',
                'image' => 'carrusel/contact/carrusel2.jpg',
                'title1' => 'Llámanos',
                'title2' => 'Comunícate con nuestro equipo para resolver tus dudas o agendar una cita fácilmente',
                'order' => 2,
                'activo' => true,
            ],
            [
                'section' => 'contact',
                'image' => 'carrusel/contact/carrusel3.jpg',
                'title1' => 'Conócenos',
                'title2' => 'Descubre más sobre nuestros servicios y la manera en que podemos ayudarte',
                'order' => 3,
                'activo' => true,
            ],
        ];

        // Insertar todos los items
        $allItems = array_merge(
            $homeItems,
            $aboutItems,
            $serviceItems,
            $galleryItems,
            $contactItems
        );

        foreach ($allItems as $item) {
            CarruselSection::create($item);
        }

    }
}