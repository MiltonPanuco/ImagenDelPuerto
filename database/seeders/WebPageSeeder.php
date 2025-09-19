<?php

namespace Database\Seeders;

use App\Models\Servicio;
use Illuminate\Database\Seeder;

class WebPageSeeder extends Seeder
{
    /**
     * Auto generated seed file.
     *
     * @return void
     */
    public function run()
    {
        Servicio::truncate();

        Servicio::insert([
            [
                'icon' => 'Zap',
                'color' => 'blue',
                'servicio' => 'Rayos X',
                'categoria' => 'Digitales',
                'descripcion' => 'Tecnología de imagen digital avanzada para diagnósticos precisos con menor exposición a radiación.',
                'activo' => true,
                'caracteristicas' => json_encode([
                    'Resultados inmediatos',
                    'Alta resolución',
                    'Menor radiación'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Activity',
                'color' => 'emerald',
                'servicio' => 'Electrocardiogramas',
                'categoria' => 'Especializados',
                'descripcion' => 'Monitoreo cardíaco completo con equipos de última generación y análisis médico especializado.',
                'activo' => true,
                'caracteristicas' => json_encode([
                    'ECG en reposo',
                    'Interpretación médica',
                    'Reporte detallado'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'icon' => 'Stethoscope',
                'color' => 'amber',
                'servicio' => 'Equipos',
                'categoria' => 'Médicos',
                'descripcion' => 'Renta de equipos médicos certificados para rehabilitación y cuidado domiciliario.',
                'activo' => true,
                'caracteristicas' => json_encode([
                    'Sillas de ruedas',
                    'Camillas especializadas',
                    'Muletas y andadores'
                ]),
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
