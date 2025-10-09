<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeCarrusel extends Model
{
    use HasFactory;

    protected $table = 'homecarrusel';

    protected $fillable = [
        'title',
        'descripcion',
        'image',
        'orden',
        'activo',
    ];

    protected $casts = [
        'activo' => 'boolean',
        'orden' => 'integer',
    ];

    protected $appends = ['image_url'];

    public function scopeOrdenados($query)
    {
        return $query->orderBy('orden', 'asc');
    }

    public function getImageUrlAttribute()
    {
        if (!$this->image) {
            return null;
        }
        
        return asset('storage/' . $this->image);
    }
}