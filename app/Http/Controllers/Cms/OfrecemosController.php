<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Ofrecemos;
use Exception;
use Inertia\Inertia;

class OfrecemosController extends Controller
{
    public function index()
    {
        $ofrecemos = Ofrecemos::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/ofrecemos/index', [
            'ofrecemos' => $ofrecemos
        ]);
    }

    /** Formulario para editar */
    public function edit(Ofrecemos $ofrecemos)
    {
        $ofrecemos->color = 'bg-' . $ofrecemos->color . '-500'; 
        return Inertia::render('cms/ofrecemos/formOfrecemos', [
            'ofrecemos' => $ofrecemos
        ]);
    }

    public function update(Ofrecemos $ofrecemos)
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

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            $ofrecemos->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo Ofrecemos
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Ofrecemos actualizados correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar el Ofrecemos. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/ofrecemos/formOfrecemos', ['ofrecemos' => new Ofrecemos()]);
    }

    /** Registrar Ofrecemos */
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
            $data['color'] = explode('-', $data['color'])[1];
            Ofrecemos::create($data);
            return redirect()->route('cms.ofrecemos.index')->with('success', 'Ofrecemos creado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear el Ofrecemos. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Ofrecemos $ofrecemos)
    {
        try {
            $ofrecemos->delete();
            return response()->json(['message' => 'Ofrecemos eliminados correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar el registro de Ofrecemos. '. $e->getMessage()], 500);
        }
    }

    public function toggleActivo(Ofrecemos $ofrecemos)
    {
        try {
            $ofrecemos->activo = !$ofrecemos->activo;
            $ofrecemos->save();
            return response()->json(['activo' => $ofrecemos->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado del Ofrecemos. '. $e->getMessage()], 500);
        }
    }
}
