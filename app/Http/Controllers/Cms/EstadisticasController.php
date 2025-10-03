<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Estadisticas;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;use Illuminate\Http\Request;

class EstadisticasController extends Controller
{
    public function index()
    {
        $estadisticas = Estadisticas::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/estadisticas/index', [
            'estadisticas' => $estadisticas
        ]);
    }

    /** Formulario para editar */
    public function edit(Estadisticas $estadisticas)
    {
        $estadisticas->color = 'bg-' . $estadisticas->color . '-500'; // Agregar prefijo y sufijo para el color
        return Inertia::render('cms/estadisticas/formEstadisticas', [
            'estadisticas' => $estadisticas
        ]);
    }

    public function update(Estadisticas $estadisticas)
    {
        $data = request()->validate([
            'title'         => 'required|string|max:255',
            'descripcion'   => 'required|string',
            'color'         => 'required|string|max:50',
            'activo'        => 'boolean',
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        Log::info('Datos recibidos para actualizar Estadisticas ID '.$estadisticas->id.': ', $data);
        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color; si no, dejarlo igual
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            $estadisticas->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo Estadisticas
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Estadisticas actualizadas correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la Estadisticas. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/estadisticas/formEstadisticas', ['estadisticas' => new Estadisticas()]);
    }

    /** Registrar Estadisticas */
    public function store()
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'color'          => 'required|string|max:50',
            'activo'         => 'boolean',
        ], [
            'title.required'  => 'El nombre del título es obligatorio.',
            'title.max'       => 'El nombre del título no debe exceder los 255 caracteres.',
            'color.max'      => 'El nombre del color no debe exceder los 50 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        Log::info('Datos recibidos para crear Estadisticas: ', $data);
        try {
            $data['color'] = explode('-', $data['color'])[1]; // Extraer solo el color sin el prefijo 'bg-'
            Estadisticas::create($data);
            return redirect()->route('cms.estadisticas.index')->with('success', 'Estadisticas creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la Estadisticas. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Estadisticas $estadisticas)
    {
        try {
            $estadisticas->delete();
            return response()->json(['message' => 'Estadisticas eliminada correctamente'], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }

    public function toggleActivo(Estadisticas $estadisticas)
    {
        try {
            $estadisticas->activo = !$estadisticas->activo;
            $estadisticas->save();
            return response()->json(['activo' => $estadisticas->activo], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }
}
