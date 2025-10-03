<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriaEquipamiento extends Model
{
    protected $table = 'galeria_equipamiento';

    protected $fillable = [
        'categoria',
        'titulo',
        'subtitulo',
        'descripcion',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];

    public function equipos()
    {
        return $this->hasMany(GaleriaEquipamientoEquipo::class, 'id_galeria_equipamiento');
    }
}
