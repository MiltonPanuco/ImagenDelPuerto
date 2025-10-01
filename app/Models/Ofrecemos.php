<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ofrecemos extends Model
{
    protected $table = 'ofrecemos';

    protected $fillable = [
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
