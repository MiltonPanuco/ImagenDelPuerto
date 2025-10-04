<?php

namespace App\Http\Controllers\Cms\Galeria;

use App\Http\Controllers\Controller;
use App\Models\GaleriaEquipamiento;
use Exception;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
class GaleriaEquipamientoController extends Controller
{
    public function index()
    {
        $equipamiento = GaleriaEquipamiento::select('id', 'categoria', 'titulo', 'subtitulo', 'activo', 'descripcion')
            ->withCount('equipos')
            ->paginate(10);

        return Inertia::render('cms/galeria/equipamiento/index', [
            'equipamiento' => $equipamiento
        ]);
    }

    /** Formulario para editar */
    public function edit(GaleriaEquipamiento $equipamiento)
    {
        $equipamiento->load('equipos');
        foreach($equipamiento->equipos as $e) {
            if ($e->image) $e->image = Storage::url($e->image);
        }
        // return $equipamiento;
        return Inertia::render('cms/galeria/equipamiento/formEquipamiento', [
            'equipamiento' => $equipamiento
        ]);
    }

    public function update(GaleriaEquipamiento $equipamiento)
    {
        $data = request()->validate([
            'titulo'       => 'required|string|max:255',
            'descripcion'  => 'required|string',
            'activo'       => 'boolean',
            'categoria'    => 'nullable|string',
            'subtitulo'    => 'nullable|string',
        ], [
            'titulo.required'  => 'El título es obligatorio.',
            'titulo.max'       => 'El título no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
        ]);

        /**
         * Otra forma de acceder a la data del formulario
         * y no sea necesario asignar la variable
         * data en el request validate e incluir todos los campos
         */
        // $data = request()->all();

        // Si 'activo' no viene (checkbox no marcado), default false
        $data['activo'] = $data['activo'] ?? false;
        try {

            $equipamiento->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo servicio
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Servicio actualizado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar el servicio. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/galeria/equipamiento/formEquipamiento', [
            'equipamiento' => new GaleriaEquipamiento()
        ]);
    }

    /** Registrar servicio */
    public function store()
    {
        $data = request()->validate([
            'categoria'    => 'nullable|string',
            'titulo'       => 'required|string|max:255',
            'subtitulo'    => 'nullable|string|max:255',
            'descripcion'  => 'required|string',
            'activo'         => 'boolean',
        ], [
            'titulo.required'  => 'El título es obligatorio.',
            'titulo.max'       => 'El título no debe exceder los 255 caracteres.',
            'subtitulo.max'    => 'El subtítulo no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        try {
            /**
             * Una vez creado, se redirecciona al formulario de edición
             * para evitar al usuario dar clic nuevamente en editar
             * y así agregar los equipos al equipamiento
             */
            $id_equipamiento = GaleriaEquipamiento::insertGetId($data);
            return redirect()->route('cms.galeria.equipamiento.edit', $id_equipamiento)->with('success', 'Sección creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['message' => 'Error al crear la sección. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(GaleriaEquipamiento $equipamiento)
    {

        if ($equipamiento->equipos()->count() > 0) {
            return response()->json(['message' => 'No se puede eliminar la sección porque tiene equipos asociados. Por favor, elimine los equipos primero.'], 400);
        }

        try {
            $equipamiento->delete();
            return response()->json(['message' => 'Sección eliminada correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la sección. '. $e->getMessage()], 500);
        }
    }

    public function toggleActivo(GaleriaEquipamiento $equipamiento)
    {
        try {
            $equipamiento->activo = !$equipamiento->activo;
            $equipamiento->save();
            return response()->json(['activo' => $equipamiento->activo], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }
}
