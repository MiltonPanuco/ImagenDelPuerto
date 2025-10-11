<?php

namespace Database\Seeders;

use App\Models\RentaEquipo;
use Illuminate\Database\Seeder;

class RentaEquiposSeeder extends Seeder
{
    public function run(): void
    {
        RentaEquipo::truncate();

        $equipos = [
            [
                'title' => 'Camas de Hospital',
                'subtitle' => 'Confort y Funcionalidad Médica',
                'description' => 'Camas hospitalarias eléctricas y manuales con colchones antiescaras. Diseñadas para brindar comodidad al paciente.',
                'images' => [
                    'service/camilla-1.jpeg',
                    'service/camilla-2.jpeg',
                    'service/camilla-3.jpeg',
                    'service/camilla-4.jpeg',
                ],
                'caracteristicas' => [
                    'Altura y posición ajustables',
                    'Colchones antiescaras incluidos',
                    'Barandales de seguridad',
                ],
                'color' => 'purple',
                'activo' => true,
                'orden' => 1,
            ],
            [
                'title' => 'Muletas',
                'subtitle' => 'Apoyo Seguro para la Movilidad',
                'description' => 'Muletas axilares y de antebrazo en diferentes tamaños, fabricadas con materiales ligeros y resistentes.',
                'images' => [
                    'service/muleta-1.jpg',
                    'service/muleta-2.jpg',
                    'service/muleta-3.jpg',
                    'service/muleta-4.jpg',
                ],
                'caracteristicas' => [
                    'Altura totalmente ajustable',
                    'Empuñaduras ergonómicas acolchadas',
                    'Puntas antideslizantes',
                ],
                'color' => 'teal', 
                'activo' => true,
                'orden' => 2,
            ],
            [
                'title' => 'Concentradores de Oxígeno',
                'subtitle' => 'Oxigenoterapia Domiciliaria Confiable',
                'description' => 'Concentradores de oxígeno de alta eficiencia para terapia respiratoria continua. Equipos silenciosos con alarmas.',
                'images' => [
                    'service/concentrador-1.jpeg',
                    'service/concentrador-2.jpeg',
                    'service/concentrador-3.jpeg',
                ],
                'caracteristicas' => [
                    'Concentración de oxígeno hasta 95%',
                    'Funcionamiento silencioso',
                    'Alarmas de seguridad integradas',
                ],
                'color' => 'cyan', 
                'activo' => true,
                'orden' => 3,
            ],
            [
                'title' => 'Silla de Ruedas Estándar',
                'subtitle' => 'Máx. 100 kg',
                'description' => 'Silla de ruedas manual ligera y resistente, diseñada para uso diario con capacidad máxima de 100 kg.',
                'images' => [
                    'service/sillaestandar-1.jpg',
                    'service/sillaestandar-2.jpg',
                    'service/sillaestandar-3.jpg',
                ],
                'caracteristicas' => [
                    'Diseño compacto y plegable',
                    'Asiento acolchado estándar',
                    'Reposapiés removibles',
                ],
                'color' => 'indigo', 
                'activo' => true,
                'orden' => 4,
            ],
            [
                'title' => 'Silla de Ruedas Bariátrica',
                'subtitle' => 'Máx. 180 kg',
                'description' => 'Silla de ruedas diseñada para usuarios bariátricos, con capacidad de carga de hasta 180 kg y estructura reforzada.',
                'images' => [
                    'service/sillabariatrica-1.jpg',
                ],
                'caracteristicas' => [
                    'Asiento extra ancho y cómodo',
                    'Ruedas reforzadas de gran resistencia',
                    'Estructura de acero de alta durabilidad',
                ],
                'color' => 'sky', 
                'activo' => true,
                'orden' => 5,
            ],
            [
                'title' => 'Silla de Ruedas con Elevapiernas',
                'subtitle' => 'Confort y Recuperación',
                'description' => 'Silla de ruedas equipada con sistema de elevapiernas para mayor comodidad en pacientes con necesidades de recuperación.',
                'images' => [
                    'service/sillaelevapiernas-1.jpg',
                    'service/sillaelevapiernas-2.jpg',
                    'service/sillaelevapiernas-3.jpg',
                ],
                'caracteristicas' => [
                    'Reposapiernas ajustables y elevados',
                    'Asiento acolchado ergonómico',
                    'Reposabrazos removibles',
                ],
                'color' => 'emerald', 
                'activo' => true,
                'orden' => 6,
            ],
        ];

        foreach ($equipos as $equipo) {
            RentaEquipo::create($equipo);
        }
    }
}
