<?php

namespace Database\Seeders;

use App\Models\Cita;
use Illuminate\Database\Seeder;

class CitaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Cita::truncate();

        Cita::insert([
            [
                'id' => 1,
                'icon' => 'Calendar',
                'color' => 'blue',
                'title' => 'Citas programadas',
                'descripcion' => 'Agenda tu consulta con anticipación para recibir la mejor atención personalizada y profesional.',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'icon' => 'AlertCircle',
                'color' => 'emerald',
                'title' => 'Emergencias médicas',
                'descripcion' => 'Atención inmediata las 24 horas para situaciones que requieren intervención médica urgente.',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now()
            ],
    ]);
    }
}
