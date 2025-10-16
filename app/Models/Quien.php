<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quien extends Model
{
    use HasFactory;

    protected $table = 'quienes';

    protected $fillable = [
        'title',
        'icon',
        'color',
        'descripcion',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}