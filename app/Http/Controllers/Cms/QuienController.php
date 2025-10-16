<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Quien;
use Exception;
use Inertia\Inertia;

class QuienController extends Controller
{
    /**
     * Mostrar todos los registros.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $quienes = Quien::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/quienes/index', [
            'quienes' => $quienes
        ]);
    }

    /**
     * Formulario para crear un nuevo registro.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('cms/quienes/formQuien', [
            'quien' => [
                'title' => '',
                'icon' => '',
                'color' => '',
                'descripcion' => '',
                'activo' => false,
            ]
        ]);
    }

    /**
     * Guardar un nuevo registro.
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store()
    {
        $data = request()->validate([
            'title'         => 'required|string|max:255',
            'descripcion'   => 'required|string',
            'icon'          => 'required|string|max:100',
            'color'         => 'required|string|max:50',
            'activo'        => 'boolean',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            Quien::create($data);
            
            return redirect()->route('cms.quienes.index')
                ->with('success', 'Registro creado correctamente.');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al crear el registro: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Formulario para editar un registro.
     *
     * @param Quien $quien
     * @return \Inertia\Response
     */
    public function edit(Quien $quien)
    {
        // Debug: Verifica que los datos se estén obteniendo
        \Log::info('Editando Quien:', $quien->toArray());

        return Inertia::render('cms/quienes/formQuien', [
            'quien' => [
                'id' => $quien->id,
                'title' => $quien->title ?? '',
                'icon' => $quien->icon ?? '',
                'color' => $quien->color ? 'bg-' . $quien->color . '-500' : '',
                'descripcion' => $quien->descripcion ?? '',
                'activo' => (bool) $quien->activo,
            ]
        ]);
    }

    /**
     * Actualizar un registro.
     *
     * @param Quien $quien
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Quien $quien)
    {
        \Log::info('Datos recibidos para actualizar:', request()->all());
        
        $data = request()->validate([
            'title'         => 'required|string|max:255',
            'descripcion'   => 'required|string',
            'icon'          => 'required|string|max:100',
            'color'         => 'required|string|max:50',
            'activo'        => 'boolean',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            // Extraer solo el nombre del color (ej: bg-blue-500 -> blue)
            if (strpos($data['color'], 'bg-') === 0) {
                preg_match('/bg-(\w+)-\d+/', $data['color'], $matches);
                $data['color'] = $matches[1] ?? $data['color'];
            }

            \Log::info('Datos procesados:', $data);
            
            $quien->update($data);

            return redirect()->route('cms.quienes.index')
                ->with('success', 'Registro actualizado correctamente.');
        } catch (Exception $e) {
            \Log::error('Error al actualizar:', ['error' => $e->getMessage()]);
            return back()->withErrors([
                'error' => 'Error al actualizar el registro: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Eliminar un registro.
     *
     * @param Quien $quien
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Quien $quien)
    {
        try {
            $quien->delete();
            return response()->json(['message' => 'Registro eliminado correctamente.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar el registro: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Cambiar el estado activo/inactivo.
     *
     * @param Quien $quien
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleActivo(Quien $quien)
    {
        try {
            $quien->activo = !$quien->activo;
            $quien->save();
            return response()->json(['activo' => $quien->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado: ' . $e->getMessage()], 500);
        }
    }
}