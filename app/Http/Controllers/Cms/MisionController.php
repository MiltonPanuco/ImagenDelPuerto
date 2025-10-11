<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Mision;
use Exception;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;

class MisionController extends Controller
{
    public function index()
    {
        $mision = Mision::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/mision/index', [
            'mision' => $mision
        ]);
    }

    /** Formulario para editar */
    public function edit(Mision $mision)
    {
        $mision->color = 'bg-' . $mision->color . '-500';
        return Inertia::render('cms/mision/formMision', [
            'mision' => $mision
        ]);
    }

    public function update(Mision $mision)
    {
        $data = request()->validate([
            'title'         => 'required|string|max:255',
            'descripcion'   => 'required|string',
            'icon'          => 'required|string|max:100',
            'color'         => 'required|string|max:50',
            'activo'        => 'nullable|boolean', 
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'icon.max'       => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $colorParts = explode('-', $data['color']);
                $data['color'] = $colorParts[1] ?? $data['color']; 
            }
            
            $mision->update($data);
            
            return back()->with('success', 'Misión actualizada correctamente');
        } catch (Exception $e) {
            Log::error('Error al actualizar Misión: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al actualizar la Misión. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        // Crear objeto con valores por defecto explícitos
        $mision = [
            'id' => null,
            'title' => '',
            'icon' => '',
            'color' => '',
            'descripcion' => '',
            'activo' => false
        ];
        
        return Inertia::render('cms/mision/formMision', ['mision' => $mision]);
    }

    /** Registrar Mision */
    public function store()
    {
        // Debug: registrar datos recibidos
        Log::info('Datos recibidos en store:', request()->all());

        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion' => 'required|string',
            'icon'        => 'required|string|max:100',
            'color'       => 'required|string|max:50',
            'activo'      => 'nullable|boolean', 
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'icon.max'       => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            Log::info('Color recibido:', ['color' => $data['color']]);

            if (strpos($data['color'], 'bg-') === 0) {
                $colorParts = explode('-', $data['color']);
                $data['color'] = $colorParts[1] ?? $data['color'];
            }

            Log::info('Color procesado:', ['color' => $data['color']]);
            Log::info('Datos finales a insertar:', $data);

            Mision::create($data);
            
            return redirect()->route('cms.mision.index')->with('success', 'Misión creada correctamente');
        } catch (Exception $e) {
            Log::error('Error al crear Misión: ' . $e->getMessage());
            Log::error('Stack trace: ' . $e->getTraceAsString());
            
            return back()->withErrors(['error' => 'Error al crear la Misión. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Mision $mision)
    {
        try {
            $mision->delete();
            return response()->json(['message' => 'Misión eliminada correctamente'], 200);
        } catch (Exception $e) {
            Log::error('Error al eliminar Misión: ' . $e->getMessage());
            return response()->json(['message' => 'Error al eliminar la misión. '. $e->getMessage()], 500);
        }
    }

    public function toggleActivo(Mision $mision)
    {
        try {
            $mision->activo = !$mision->activo;
            $mision->save();
            return response()->json(['activo' => $mision->activo], 200);
        } catch (Exception $e) {
            Log::error('Error al cambiar estado Misión: ' . $e->getMessage());
            return response()->json(['message' => 'Error al cambiar el estado de la misión. '. $e->getMessage()], 500);
        }
    }
}