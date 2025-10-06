<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Eleccion;
use Exception;
use Inertia\Inertia;

class EleccionController extends Controller
{
    public function index()
    {
        $eleccion = Eleccion::select('id', 'title as nombre', 'descripcion', 'activo', 'icon', 'color')
            ->paginate(10);

        return Inertia::render('cms/eleccion/index', [
            'eleccion' => $eleccion
        ]);
    }

    /** Formulario para editar */
    public function edit(Eleccion $eleccion)
    {
        // ✅ Convertir el modelo a array para evitar problemas con Inertia
        $eleccionData = [
            'id' => $eleccion->id,
            'title' => $eleccion->title,
            'icon' => $eleccion->icon,
            'color' => 'bg-' . $eleccion->color . '-500', // Agregar prefijo y sufijo
            'descripcion' => $eleccion->descripcion,
            'caracteristicas' => $eleccion->caracteristicas ?? [],
            'activo' => $eleccion->activo,
        ];

        return Inertia::render('cms/eleccion/formEleccion', [
            'eleccion' => $eleccionData
        ]);
    }

    public function update(Eleccion $eleccion)
    {
        $data = request()->validate([
            'title'          => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'icon'           => 'required|string|max:100',
            'color'          => 'required|string|max:50',
            'caracteristicas'=> 'nullable|array',
            'activo'         => 'boolean',
        ], [
            'title.required'     => 'El título es obligatorio.',
            'title.max'          => 'El título no debe exceder los 255 caracteres.',
            'icon.max'           => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'          => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            $eleccion->update($data);

            return back()->with('success', 'Elección actualizada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la elección. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        // ✅ Pasar datos vacíos pero estructurados correctamente
        return Inertia::render('cms/eleccion/formEleccion', [
            'eleccion' => [
                'title' => '',
                'icon' => '',
                'color' => '',
                'descripcion' => '',
                'caracteristicas' => [],
                'activo' => false,
            ]
        ]);
    }

    /** Registrar eleccion */
    public function store()
    {
        $data = request()->validate([
            'title'          => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'icon'           => 'required|string|max:100',
            'color'          => 'required|string|max:50',
            'caracteristicas'=> 'nullable|array',
            'activo'         => 'boolean',
        ], [
            'title.required'     => 'El título es obligatorio.',
            'title.max'          => 'El título no debe exceder los 255 caracteres.',
            'icon.max'           => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'          => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            Eleccion::create($data);

            return redirect()->route('cms.eleccion.index')->with('success', 'Elección creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la elección. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Eleccion $eleccion)
    {
        try {
            $eleccion->delete();
            return response()->json(['message' => 'Elección eliminada correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la elección. '. $e->getMessage()], 500);
        }
    }

    public function toggleActivo(Eleccion $eleccion)
    {
        try {
            $eleccion->activo = !$eleccion->activo;
            $eleccion->save();
            return response()->json(['activo' => $eleccion->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado de la elección. '. $e->getMessage()], 500);
        }
    }
}
