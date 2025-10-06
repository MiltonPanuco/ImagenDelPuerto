<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Social;

class SocialesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Social::truncate();

        $sociales = [
            // Redes activas
            [
                'color' => 'pink',
                'icon' => 'FaInstagram',
                'title' => 'Instagram',
                'description' => '@imagen_del_puerto',
                'url' => 'https://www.instagram.com/imagen_del_puerto/',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'color' => 'blue',
                'icon' => 'FaFacebook',
                'title' => 'Facebook',
                'description' => 'Imagen del Puerto',
                'url' => 'https://www.facebook.com/p/Imagen-del-Puerto-61560994465369/',
                'activo' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            
            // Opciones desactivadas para futuro
            [
                'color' => 'red',
                'icon' => 'FaYoutube',
                'title' => 'YouTube',
                'description' => 'Canal Imagen del Puerto',
                'url' => '',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'color' => 'black',
                'icon' => 'FaTiktok',
                'title' => 'TikTok',
                'description' => '@imagen_del_puerto',
                'url' => '',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'color' => 'green',
                'icon' => 'FaWhatsapp',
                'title' => 'WhatsApp',
                'description' => 'Contáctanos directo',
                'url' => '',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'color' => 'purple',
                'icon' => 'FaTelegram',
                'title' => 'Telegram',
                'description' => 'Canal Imagen del Puerto',
                'url' => '',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'color' => 'black',
                'icon' => 'FaXTwitter',
                'title' => 'X (Twitter)',
                'description' => '@imagen_puerto',
                'url' => '',
                'activo' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        Social::insert($sociales);
    }
}