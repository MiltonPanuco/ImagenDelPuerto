<?php

namespace Database\Seeders;

use App\Models\GaleriaEquipamiento;
use App\Models\GaleriaEquipamientoEquipo;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GaleriaEquipamientoSeeder extends Seeder
{
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        GaleriaEquipamientoEquipo::truncate();
        GaleriaEquipamiento::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $data = [
            [
                'id' => 1,
                'orden' => 1,
                'categoria' => 'Equipos de diagnóstico',
                'titulo' => 'Rayos X',
                'subtitulo' => 'profesionales',
                'activo' => true,
                'descripcion' => 'Equipos de radiografía digital de última generación que garantizan estudios precisos y seguros en la comodidad de tu hogar.',
                'created_at' => now(),
                'updated_at' => now(),
                'equipos' => [
                    [
                        'id' => 1,
                        'orden' => 1,
                        'id_galeria_equipamiento' => 1,
                        'icon' => 'Stethoscope',
                        'color' => 'blue',
                        'servicio' => 'Equipo de Rayos X Portátil',
                        'descripcion' => 'Sistema de radiografía digital de alta resolución para estudios domiciliarios',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Resolución: 3000x3000 DPI',
                            'Peso: 15kg',
                            'Batería: 8 horas'
                        ]),
                        'image' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 2,
                        'orden' => 2,
                        'id_galeria_equipamiento' => 1,
                        'icon' => 'Stethoscope',
                        'color' => 'blue',
                        'servicio' => 'Detector Digital',
                        'descripcion' => 'Panel detector inalámbrico para captura instantánea de imágenes',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Tamaño: 35x43cm',
                            'Resolución: 150μm',
                            'Conexión: WiFi'
                        ]),
                        'image' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 3,
                        'orden' => 3,
                        'id_galeria_equipamiento' => 1,
                        'icon' => 'Stethoscope',
                        'color' => 'blue',
                        'servicio' => 'Chasis Radiográfico',
                        'descripcion' => 'Sistema de protección y posicionamiento para estudios precisos',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Material: Fibra de carbono',
                            'Tamaños: 18x24, 24x30cm',
                            'Peso: 2kg'
                        ]),
                        'image' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                ]
            ],
            [
                'id' => 2,
                'orden' => 2,
                'categoria' => 'Monitoreo cardiaco',
                'titulo' => 'Electrocardiogramas',
                'subtitulo' => 'avanzados',
                'activo' => true,
                'descripcion' => 'Tecnología de monitoreo cardíaco de precisión médica para estudios completos y análisis detallados del corazón.',
                'created_at' => now(),
                'updated_at' => now(),
                'equipos' => [
                    [
                        'id' => 4,
                        'orden' => 1,
                        'id_galeria_equipamiento' => 2,
                        'icon' => 'Heart',
                        'color' => 'emerald',
                        'servicio' => 'Electrocardiógrafo',
                        'descripcion' => 'Equipo portátil de alto rendimiento que ofrece registros ECG precisos y confiables.',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Pantalla LCD de alta resolución',
                            'Diseño ultracompacto y ergonómico',
                            'Interpretación avanzada'
                        ]),
                        'image' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 5,
                        'orden' => 2,
                        'id_galeria_equipamiento' => 2,
                        'icon' => 'Heart',
                        'color' => 'emerald',
                        'servicio' => 'Electrodos Desechables',
                        'descripcion' => 'Electrodos de alta conductividad para estudios cardíacos precisos',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Gel conductor',
                            'Adhesivo hipoalergénico',
                            'Alta conductividad'
                        ]),
                        'image' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                ]
            ],
        ];

        foreach ($data as $d) {
            $equipos = $d['equipos'];
            unset($d['equipos']);
            GaleriaEquipamiento::insert($d);
            GaleriaEquipamientoEquipo::insert($equipos);
        }
    }
}
