<?php

namespace Database\Seeders;

use App\Models\Ofrecemos;
use Illuminate\Database\Seeder;

class OfrecemosSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        Ofrecemos::truncate();

        Ofrecemos::insert([
            [
                'icon' => 'Stethoscope',
                'color' => 'blue',
                'title' => 'Rayos X',
                'descripcion' => 'Estudios radiológicos completos en la comodidad de tu hogar',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Heart',
                'color' => 'emerald',
                'title' => 'Electrocardiogramas',
                'descripcion' => 'Monitoreo cardíaco profesional con equipos de última generación',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Truck',
                'color' => 'pink',
                'title' => 'Renta de Equipo',
                'descripcion' => 'Sillas de ruedas, muletas, camillas y más equipo médico',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Shield',
                'color' => 'purple',
                'title' => 'Atención 24/7',
                'descripcion' => 'Disponibles para emergencias y citas programadas',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
