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
            ]
        ]);
    }
}
