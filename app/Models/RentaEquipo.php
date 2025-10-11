<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RentaEquipo extends Model
{
    use HasFactory;

    protected $table = 'renta_equipos';

    protected $fillable = [
        'title',
        'subtitle',
        'description',
        'images',
        'caracteristicas',
        'color',
        'activo',
        'orden',
    ];

    protected $casts = [
        'images' => 'array',
        'caracteristicas' => 'array',
        'activo' => 'boolean',
    ];
}
