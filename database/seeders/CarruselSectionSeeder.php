<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CarruselSection;

class CarruselSectionSeeder extends Seeder
{
    public function run(): void
    {
        $sections = ['home', 'about', 'services'];
        
        foreach ($sections as $section) {
            for ($i = 1; $i <= 3; $i++) {
                CarruselSection::create([
                    'section' => $section,
                    'image' => "images/{$section}/slide-{$i}.jpg",
                    'title1' => "Título {$i} de {$section}",
                    'title2' => "Subtítulo {$i}",
                    'order' => $i,
                    'activo' => true,
                ]);
            }
        }
    }
}