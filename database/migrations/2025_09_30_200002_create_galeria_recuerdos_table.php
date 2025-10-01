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
        Schema::create('galeria_recuerdos', function (Blueprint $table) {
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_spanish_ci';

            $table->id();
            $table->string('title')->nullable();
            $table->string('date')->nullable();
            $table->boolean('activo')->default(false);
            $table->boolean('carrete')->default(false);
            $table->string('descripcion')->nullable();
            $table->string('src')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('galeria_recuerdos');
    }
};
