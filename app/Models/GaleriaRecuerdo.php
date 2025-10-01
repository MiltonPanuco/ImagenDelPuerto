<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriaRecuerdo extends Model
{
    protected $table = 'galeria_recuerdos';

    protected $fillable = [
        'src',
        'title',
        'date',
        'descripcion',
        'carrete',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
        'carrete' => 'boolean',
    ];
}
