<?php

namespace Database\Seeders;

use App\Models\Vision;
use Illuminate\Database\Seeder;

class VisionSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        Vision::truncate();

        Vision::insert([
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
