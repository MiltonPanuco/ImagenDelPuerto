<?php
/* Representacion de una tabla = modelo */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GaleriaEquipamientoEquipo extends Model
{
    protected $table = 'galeria_equipamiento_equipo';

    protected $fillable = [
        'id_galeria_equipamiento',
        'icon',
        'color',
        'servicio',
        'categoria',
        'descripcion',
        'caracteristicas',
        'activo',
        'image',
        'orden',
    ];

    protected $casts = [
        'caracteristicas' => 'array',
        'activo' => 'boolean',
    ];
}
