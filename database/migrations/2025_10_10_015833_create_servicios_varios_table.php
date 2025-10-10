<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('servicios_varios', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->text('descripcion');
            $table->json('imagenes')->nullable(); // Guardará un array de hasta 5 imágenes
            $table->json('caracteristicas')->nullable(); // Array de características
            $table->boolean('activo')->default(true);
            $table->integer('orden')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('servicios_varios');
    }
};