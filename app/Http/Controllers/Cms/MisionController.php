<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Mision;
use Exception;
use Inertia\Inertia;
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
        $mision->color = 'bg-' . $mision->color . '-500'; // Agregar prefijo y sufijo para el color
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
            $mision->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo Misionn
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Misión actualizadas correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la Misión. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/mision/formMision', ['mision' => new Mision()]);
    }

    /** Registrar Mision */
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
            Mision::create($data);
            return redirect()->route('cms.mision.index')->with('success', 'Misión creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la Misión. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Mision $mision)
    {
        try {
            $mision->delete();
            return response()->json(['message' => 'Misión eliminada correctamente'], 200);
        } catch (Exception $e) {
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
            return response()->json(['message' => 'Error al cambiar el estado de la misión. '. $e->getMessage()], 500);
        }
    }
}
