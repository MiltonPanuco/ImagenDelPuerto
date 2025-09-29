<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Eleccion;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EleccionController extends Controller
{
    public function index()
    {
        $eleccion = Eleccion::select('id', 'title', 'descripcion', 'activo', 'icon', 'color')
            ->paginate(10);

        return Inertia::render('cms/eleccion/index', [
            'eleccion' => $eleccion
        ]);
    }

    /** Formulario para editar */
    public function edit(Eleccion $eleccion)
    {
        $eleccion->color = 'bg-' . $eleccion->color . '-500'; // Agregar prefijo y sufijo para el color
        return Inertia::render('cms/eleccion/formEleccion', [
            'eleccion' => $eleccion
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

        Log::info('Datos recibidos para actualizar eleccion ID '.$eleccion->id.': ', $data);
        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color; si no, dejarlo igual
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            $eleccion->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo eleccion
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Elección actualizada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la elección. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/eleccion/formEleccion', ['eleccion' => new Eleccion()]);
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

        Log::info('Datos recibidos para crear eleccion: ', $data);
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
            throw new HttpException(500, $e->getMessage());
        }
    }

    public function toggleActivo(Eleccion $eleccion)
    {
        try {
            $eleccion->activo = !$eleccion->activo;
            $eleccion->save();
            return response()->json(['activo' => $eleccion->activo], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }
}