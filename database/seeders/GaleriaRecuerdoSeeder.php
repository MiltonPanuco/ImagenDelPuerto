<?php

namespace Database\Seeders;

use App\Models\GaleriaRecuerdo;
use Illuminate\Database\Seeder;

class GaleriaRecuerdoSeeder extends Seeder
{
    public function run()
    {
        GaleriaRecuerdo::truncate();

        GaleriaRecuerdo::insert([
            [
                'id' => 1,
                'src' => "gallery/carrusel-1.jpg",
                'title' => "Recuerdos Digitales",
                'date' => null,
                'descripcion' => "Guardamos y atesoramos cada momento siempre",
                'activo' => true,
                'carrete' => true,
            ],
            [
                'id' => 2,
                'src' => "gallery/carrusel-2.jpg",
                'title' => "Nuestro Equipo",
                'date' => null,
                'descripcion' => "Contamos con tecnología de última generación para garantizar la mejor calidad en cada captura.",
                'activo' => true,
                'carrete' => true,
            ],
            [
                'id' => 3,
                'src' => "gallery/carrusel-3.jpg",
                'title' => "Tu salud y comodidad",
                'date' => null,
                'descripcion' => "Nuestra prioridad",
                'activo' => true,
                'carrete' => true,
            ],
            [
                'id' => 4,
                'src' => "gallery/recuerdos-1.jpg",
                'title' => "Servicio a Domicilio",
                'date' => "Noviembre 2024",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 5,
                'src' => "gallery/recuerdos-2.jpg",
                'title' => "Servicio a Domicilio",
                'date' => "Diciembre 2024",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 6,
                'src' => "gallery/recuerdos-3.jpg",
                'title' => "Atendemos a tus mascotas",
                'date' => "Enero 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 7,
                'src' => "gallery/recuerdos-4.jpeg",
                'title' => "Atención Personalizada",
                'date' => "Marzo 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 8,
                'src' => "gallery/recuerdos-5.jpeg",
                'title' => "Profesionalismo",
                'date' => "Abril 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 9,
                'src' => "gallery/recuerdos-6.jpeg",
                'title' => "Atención Animales",
                'date' => "Mayo 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 10,
                'src' => "gallery/recuerdos-7.jpeg",
                'title' => "Consulta Domiciliaria",
                'date' => "Enero 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 11,
                'src' => "gallery/recuerdos-8.jpg",
                'title' => "Equipos Avanzados",
                'date' => "Enero 2025",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
            [
                'id' => 12,
                'src' => "gallery/recuerdos-9.jpg",
                'title' => "Cuidado Animal",
                'date' => "Julio 2024",
                'descripcion' => null,
                'activo' => true,
                'carrete' => false,
            ],
        ]);
    }
}
