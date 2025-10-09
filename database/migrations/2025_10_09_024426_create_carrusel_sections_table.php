<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('carrusel_sections', function (Blueprint $table) {
            $table->id();
            
            // Identificador de la sección (home, about, services, etc.)
            $table->string('section', 50);
            
            // Campos del carrusel
            $table->string('image');
            $table->string('title1');
            $table->string('title2')->nullable();
            
            // Control de orden y visibilidad
            $table->integer('order')->default(0);
            $table->boolean('activo')->default(true);
            
            $table->timestamps();
            
            // Índices para mejorar el rendimiento de las consultas
            $table->index('section');
            $table->index(['section', 'order']);
            $table->index(['section', 'activo']);
            $table->index(['section', 'activo', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('carrusel_sections');
    }
};