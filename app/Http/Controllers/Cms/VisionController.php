<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Vision;
use Exception;
use Inertia\Inertia;
class VisionController extends Controller
{
    public function index()
    {
        $vision = Vision::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/vision/index', [
            'vision' => $vision
        ]);
    }

    /** Formulario para editar */
    public function edit(Vision $vision)
    {
        $vision->color = 'bg-' . $vision->color . '-500'; // Agregar prefijo y sufijo para el color
        return Inertia::render('cms/vision/formVision', [
            'vision' => $vision
        ]);
    }

    public function update(Vision $vision)
    {
        $data = request()->validate([
            'title'         => 'required|string|max:255',
            'descripcion'   => 'required|string',
            'icon'          => 'required|string|max:100',
            'color'         => 'required|string|max:50',
            'activo'        => 'boolean',
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'icon.max'       => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color; si no, dejarlo igual
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            $vision->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo Vision
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Vision actualizadas correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la Vision. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/vision/formVision', ['vision' => new Vision()]);
    }

    /** Registrar Vision */
    public function store()
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'icon'           => 'required|string|max:100',
            'color'          => 'required|string|max:50',
            'activo'         => 'boolean',
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'icon.max'       => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        try {
            $data['color'] = explode('-', $data['color'])[1]; // Extraer solo el color sin el prefijo 'bg-'
            Vision::create($data);
            return redirect()->route('cms.vision.index')->with('success', 'Visión creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la Visión. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Vision $vision)
    {
        try {
            $vision->delete();
            return response()->json(['message' => 'Visión eliminada correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la visión. '. $e->getMessage()], 500);
        }
    }

    public function toggleActivo(Vision $vision)
    {
        try {
            $vision->activo = !$vision->activo;
            $vision->save();
            return response()->json(['activo' => $vision->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado de la visión. '. $e->getMessage()], 500);
        }
    }
}
