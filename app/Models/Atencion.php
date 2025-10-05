<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Atencion extends Model
{
    protected $table = 'atenciones';

    protected $fillable = [
        'id',
        'icon',
        'color',
        'title',
        'descripcion',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
