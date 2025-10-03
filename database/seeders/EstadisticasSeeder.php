<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Estadisticas; 

class EstadisticasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Limpiar tabla antes de insertar
        Estadisticas::truncate();

        // Insertar registros
        Estadisticas::insert([
            [
                'color' => 'blue',
                'title' => '10',
                'descripcion' => 'Años de experiencia',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'color' => 'emerald',
                'title' => '100',
                'descripcion' => 'Pacientes atendidos',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ]);
    }
}
