<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ServicioVario extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'servicios_varios';

    protected $fillable = [
        'title',
        'subtitle',
        'descripcion',
        'imagenes',
        'caracteristicas',
        'activo',
        'orden'
    ];

    protected $casts = [
        'imagenes' => 'array',
        'caracteristicas' => 'array',
        'activo' => 'boolean',
        'orden' => 'integer'
    ];

    // Accessor para obtener la primera imagen
    public function getPrimeraImagenAttribute()
    {
        return $this->imagenes[0] ?? null;
    }

    // Método para agregar una imagen
    public function agregarImagen(string $path): bool
    {
        $imagenes = $this->imagenes ?? [];
        
        if (count($imagenes) >= 5) {
            return false;
        }
        
        $imagenes[] = $path;
        $this->imagenes = $imagenes;
        return true;
    }

    // Método para eliminar una imagen por índice
    public function eliminarImagen(int $index): void
    {
        $imagenes = $this->imagenes ?? [];
        
        if (isset($imagenes[$index])) {
            unset($imagenes[$index]);
            $this->imagenes = array_values($imagenes);
        }
    }

    // Método para agregar una característica
    public function agregarCaracteristica(string $caracteristica): void
    {
        $caracteristicas = $this->caracteristicas ?? [];
        
        if (!in_array($caracteristica, $caracteristicas)) {
            $caracteristicas[] = $caracteristica;
            $this->caracteristicas = $caracteristicas;
        }
    }

    // Método para eliminar una característica
    public function eliminarCaracteristica(string $caracteristica): void
    {
        $caracteristicas = $this->caracteristicas ?? [];
        $key = array_search($caracteristica, $caracteristicas);
        
        if ($key !== false) {
            unset($caracteristicas[$key]);
            $this->caracteristicas = array_values($caracteristicas);
        }
    }

    // Scope para servicios activos
    public function scopeActivos($query)
    {
        return $query->where('activo', true);
    }

    // Scope para ordenar por orden
    public function scopeOrdenado($query)
    {
        return $query->orderBy('orden', 'asc');
    }
}