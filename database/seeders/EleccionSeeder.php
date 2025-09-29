<?php

namespace Database\Seeders;

use App\Models\Eleccion;
use Illuminate\Database\Seeder;

class EleccionSeeder extends Seeder
{
    public function run()
    {
        Eleccion::truncate();

        Eleccion::insert([
            [
                'title' => 'Tecnología certificada',
                'icon' => 'Shield',
                'color' => 'blue',
                'descripcion' => 'Equipos médicos de última generación con certificaciones internacionales y mantenimiento preventivo constante.',
                'activo' => true,
                'caracteristicas' => json_encode(['Disponible 24/7']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Equipo especializado',
                'icon' => 'Users',
                'color' => 'emerald',
                'descripcion' => 'Profesionales certificados con años de experiencia que garantizan la excelencia en cada procedimiento médico.',
                'activo' => true,
                'caracteristicas' => json_encode(['Servicio móvil']),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Resultados inmediatos',
                'icon' => 'Award',
                'color' => 'amber',
                'descripcion' => 'Diagnósticos rápidos y precisos con reportes detallados entregados en el menor tiempo posible.',
                'activo' => true,
                'caracteristicas' => json_encode(['Resultados inmediatos']),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}