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
                        'src' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 2,
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
                        'src' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 3,
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
                        'src' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                ]
            ],
            [
                'id' => 2,
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
                        'id_galeria_equipamiento' => 2,
                        'icon' => 'Heart',
                        'color' => 'emerald',
                        'servicio' => 'Electrocardiógrafo 12 Derivaciones',
                        'descripcion' => 'Monitor cardíaco profesional con análisis automático e interpretación',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            '12 derivaciones',
                            'Pantalla táctil 10"',
                            'Impresora térmica'
                        ]),
                        'src' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 5,
                        'id_galeria_equipamiento' => 2,
                        'icon' => 'Heart',
                        'color' => 'emerald',
                        'servicio' => 'Electrodos Desechables',
                        'descripcion' => 'Electrodos de alta conductividad para estudios cardíacos precisos',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Gel conductor',
                            'Adhesivo hipoalergénico',
                            'Pack 100 unidades'
                        ]),
                        'src' => null,
                        'created_at' => now(),
                        'updated_at' => now()
                    ],
                    [
                        'id' => 6,
                        'id_galeria_equipamiento' => 2,
                        'icon' => 'Heart',
                        'color' => 'emerald',
                        'servicio' => 'Monitor Holter 24h',
                        'descripcion' => 'Sistema de monitoreo cardíaco continuo para estudios prolongados',
                        'activo' => true,
                        'caracteristicas' => json_encode([
                            'Grabación 24-48h',
                            'Memoria 1GB',
                            'Análisis automático'
                        ]),
                        'src' => null,
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
