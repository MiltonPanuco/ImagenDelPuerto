<?php

namespace Database\Seeders;

// use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
// use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => Hash::make('password'),
        //         'email_verified_at' => now(),
        //     ]
        // );

        $this->call([
            AtencionSeeder::class,
            CarruselSectionSeeder::class,
            CitaSeeder::class,
            EleccionSeeder::class,
            EstadisticasSeeder::class,
            GaleriaEquipamientoSeeder::class,
            GaleriaRecuerdoSeeder::class,
            MisionSeeder::class,
            OfrecemosSeeder::class,
            RentaEquiposSeeder::class,
            ServiciosVariosSeeder::class,
            SocialesSeeder::class,
            WebPageSeeder::class,
            // VisionSeeder::class,
        ]);

    }
}
