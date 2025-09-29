<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Eleccion extends Model
{
    protected $table = 'eleccion';

    protected $fillable = [
        'title',
        'icon',
        'color',
        'descripcion',
        'caracteristicas',
        'activo'
    ];

    protected $casts = [
        'caracteristicas' => 'array',
        'activo' => 'boolean',
    ];
}