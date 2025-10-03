<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Estadisticas extends Model
{
    protected $table = 'estadisticas';
    protected $fillable = [
        'color',
        'title',
        'descripcion',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
