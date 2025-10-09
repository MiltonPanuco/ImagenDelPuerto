<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CarruselSection extends Model
{
    protected $table = 'carrusel_sections';

    protected $fillable = [
        'section',
        'image',
        'title1',
        'title2',
        'order',
        'activo'
    ];

    protected $casts = [
        'activo' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Scope para filtrar por sección
     */
    public function scopeSection($query, $section)
    {
        return $query->where('section', $section);
    }

    /**
     * Scope para filtrar solo activos
     */
    public function scopeActive($query)
    {
        return $query->where('activo', true);
    }

    /**
     * Scope para ordenar por el campo order
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order');
    }

    /**
     * Método helper para obtener items de una sección específica
     */
    public static function getSection($section, $onlyActive = true)
    {
        $query = static::section($section)->ordered();
        
        if ($onlyActive) {
            $query->active();
        }
        
        return $query->get();
    }
}