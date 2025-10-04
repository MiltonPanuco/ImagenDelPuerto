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
        Schema::create('galeria_equipamiento_equipo', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';

            $table->id();
            $table->foreignId('id_galeria_equipamiento')->constrained('galeria_equipamiento');
            $table->unsignedSmallInteger('orden')->default(0);
            $table->string('servicio');
            $table->string('icon')->nullable();
            $table->string('color');
            $table->text('descripcion');
            $table->text('caracteristicas')->nullable();
            $table->string('image')->nullable();
            $table->boolean('activo')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeria_equipamiento_equipo');
    }
};
