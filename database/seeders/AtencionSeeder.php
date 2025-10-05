<?php

namespace Database\Seeders;

use App\Models\Atencion;
use Illuminate\Database\Seeder;

class AtencionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Atencion::truncate();

        Atencion::insert([
            [
                'id' => 1,
                'icon' => 'Clock',
                'color' => 'blue',
                'title' => 'Respuesta inmediata',
                'descripcion' => 'Atención rápida cuando más lo necesitas',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'icon' => 'AlertCircle',
                'color' => 'emerald',
                'title' => 'Profesionales certificados',
                'descripcion' => 'Equipo médico altamente calificado',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'icon' => 'Phone',
                'color' => 'amber',
                'title' => 'Disponibilidad 24/7',
                'descripcion' => 'Siempre listos para ayudarte',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'icon' => 'Calendar',
                'color' => 'purple',
                'title' => 'Citas flexibles',
                'descripcion' => 'Horarios que se adaptan a ti',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'icon' => 'Mail',
                'color' => 'rose',
                'title' => 'Seguimiento personalizado',
                'descripcion' => 'Cuidamos tu salud paso a paso',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 6,
                'icon' => 'Instagram',
                'color' => 'teal',
                'title' => 'Tecnología avanzada',
                'descripcion' => 'Equipos médicos de última generación',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
