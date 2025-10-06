<?php
/* Representación de una tabla = modelo */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Social extends Model
{
    protected $table = 'sociales';

    protected $fillable = [
        'color',
        'icon',
        'title',
        'description',
        'url',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}
