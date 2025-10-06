<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Estadisticas;
use Exception;
use Inertia\Inertia;

class EstadisticasController extends Controller
{
    public function index()
    {
        $estadisticas = Estadisticas::select('id', 'title as nombre', 'color', 'descripcion', 'activo')
            ->paginate(10);

        return Inertia::render('cms/estadisticas/index', [
            'estadisticas' => $estadisticas
        ]);
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/estadisticas/formEstadisticas', [
            'estadistica' => new Estadisticas()
        ]);
    }

    /** Registrar Estadística */
    public function store()
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion' => 'required|string',
            'color'       => 'required|string|max:50',
            'activo'      => 'boolean',
        ], [
            'title.required'       => 'El título es obligatorio.',
            'title.max'            => 'El título no debe exceder los 255 caracteres.',
            'color.max'            => 'El color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'       => 'El color es obligatorio.',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            
            Estadisticas::create($data);
            return redirect()->route('cms.estadisticas.index')
                ->with('success', 'Estadística creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al crear la estadística. '. $e->getMessage()
            ])->withInput();
        }
    }

    /** Formulario para editar */
    public function edit(Estadisticas $estadistica)
    {
        $estadistica->color = 'bg-' . $estadistica->color . '-500';
        
        return Inertia::render('cms/estadisticas/formEstadisticas', [
            'estadistica' => $estadistica
        ]);
    }

    public function update(Estadisticas $estadistica)
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion' => 'required|string',
            'color'       => 'required|string|max:50',
            'activo'      => 'boolean',
        ], [
            'title.required'       => 'El título es obligatorio.',
            'title.max'            => 'El título no debe exceder los 255 caracteres.',
            'color.max'            => 'El color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'       => 'El color es obligatorio.',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            
            $estadistica->update($data);
            
            return back()->with('success', 'Estadística actualizada correctamente');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al actualizar la estadística. '. $e->getMessage()
            ])->withInput();
        }
    }

    public function destroy(Estadisticas $estadistica)
    {
        try {
            $estadistica->delete();
            return response()->json([
                'message' => 'Estadística eliminada correctamente'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar la estadística. '. $e->getMessage()
            ], 500);
        }
    }

    public function toggleActivo(Estadisticas $estadistica)
    {
        try {
            $estadistica->activo = !$estadistica->activo;
            $estadistica->save();
            return response()->json(['activo' => $estadistica->activo], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al cambiar el estado de la estadística. '. $e->getMessage()
            ], 500);
        }
    }
}