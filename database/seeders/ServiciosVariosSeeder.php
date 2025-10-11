<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ServicioVario;

class ServiciosVariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $servicios = [
            [
                'title' => 'Electrocardiogramas',
                'subtitle' => 'Monitoreo Cardíaco Profesional',
                'descripcion' => 'Evaluación completa de la actividad eléctrica del corazón con electrocardiógrafos digitales de 12 derivaciones.',
                'caracteristicas' => [
                    'ECG de 12 derivaciones',
                    'Interpretación cardiológica',
                    'Reportes digitales inmediatos'
                ],
                'imagenes' => [
                    'service/electro1.jpeg',
                    'service/electro2.jpg',
                    'service/electro3.jpg',
                    'service/electro4.jpg',
                    'service/electro5.jpg'
                ],
                'activo' => true,
                'orden' => 1,
                'color' => 'blue',
                'icon' => 'Activity',
            ],
            [
                'title' => 'Rayos X',
                'subtitle' => 'Estudios Radiológicos Completos',
                'descripcion' => 'Realizamos estudios radiológicos de tórax, abdomen, extremidades y columna vertebral con equipos portátiles de última generación.',
                'caracteristicas' => [
                    'Rayos X de tórax y abdomen',
                    'Estudios de extremidades',
                    'Radiografías de columna',
                    'Entrega de resultados en 24 horas',
                    'Interpretación por radiólogos certificados'
                ],
                'imagenes' => [
                    'service/rx1.jpg',
                    'service/rx2.jpg',
                    'service/rx3.jpg',
                    'service/rx4.jpg',
                    'service/rx5.jpg',
                ],
                'activo' => true,
                'orden' => 2,
                'color' => 'emerald',
                'icon' => 'Zap',
            ]
        ];

        foreach ($servicios as $servicio) {
            ServicioVario::create($servicio);
        }
    }
}