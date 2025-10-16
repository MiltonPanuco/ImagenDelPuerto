<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Quien;

class QuienesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncar la tabla antes de insertar
        Quien::truncate();

        $quienes = [
            [
                'icon' => 'Home',       
                'color' => 'blue',      
                'title' => 'Particulares',      
                'descripcion' => 'Atendemos a domicilio con equipos confiables y atención personalizada.',
                'activo' => true,
            ],
            [
                'icon' => 'HeartHandshake',   
                'color' => 'emerald',
                'title' => 'Quirofanos',
                'descripcion' => 'Brindamos soporte profesional y rápido para servicios en quirófanos.',
                'activo' => true,
            ],
            [
                'icon' => 'Building2', 
                'color' => 'amber',
                'title' => 'Consultorios',
                'descripcion' => 'Llevamos nuestros servicios a consultorios con seguridad y eficiencia.',
                'activo' => true,
            ],
            [
                'icon' => 'PawPrint',        
                'color' => 'purple',
                'title' => 'Veterinarias',
                'descripcion' => 'Atendemos clínicas y veterinarias con equipos adecuados y cuidado especial.',
                'activo' => true,
            ],
        ];

        foreach ($quienes as $item) {
            Quien::create($item);
        }
    }
}