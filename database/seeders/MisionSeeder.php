<?php

namespace Database\Seeders;

use App\Models\Mision;
use Illuminate\Database\Seeder;

class MisionSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        Mision::truncate();

        Mision::insert([
            [
                'icon' => 'Target',
                'color' => 'blue',
                'title' => 'Nuestra Misión',
                'descripcion' => 'Brindar servicios médicos especializados de alta calidad en la comodidad del hogar, eliminando barreras de acceso y garantizando atención oportuna y profesional para toda la familia. Nos comprometemos a ser el puente entre la tecnología médica avanzada y la calidez humana.',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Eye',
                'color' => 'green',
                'title' => 'Nuestra Visión',
                'descripcion' => 'Ser el centro de diagnóstico y renta de equipo médico de mayor confianza en la región, reconocido por la excelencia tecnológica, el trato ético y la mejora continua en cada servicio, impulsando el acceso a estudios médicos de calidad para toda la comunidad.',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
