<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarruselHome extends Model
{
    protected $table = 'carruselhome';

    protected $fillable = [
        'image',
        'title1',
        'title2',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
    ];
}