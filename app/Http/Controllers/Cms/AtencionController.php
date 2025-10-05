<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Atencion;
use Exception;
use Inertia\Inertia;

class AtencionController extends Controller
{
    /**
     * Mostrar todas las atenciones.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $atenciones = Atencion::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/atenciones/index', [
            'atenciones' => $atenciones
        ]);
    }

    /**
     * Formulario para crear una nueva atención.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('cms/atenciones/formAtencion', [
            'atencion' => new Atencion()
        ]);
    }

    /**
     * Guardar una nueva atención.
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

            Atencion::create($data);
            return redirect()->route('cms.atencion.index')
                ->with('success', 'Atención creada correctamente.');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al crear la Atención: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Formulario para editar una atención.
     *
     * @param Atencion $atencion
     * @return \Inertia\Response
     */
    public function edit(Atencion $atencion)
    {
        $atencion->color = 'bg-' . $atencion->color . '-500';

        return Inertia::render('cms/atenciones/formAtencion', [
            'atencion' => $atencion
        ]);
    }

    /**
     * Actualizar una atención.
     *
     * @param Atencion $atencion
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Atencion $atencion)
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

            $atencion->update($data);

            return back()->with('success', 'Atención actualizada correctamente.');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al actualizar la Atención: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Eliminar una atención.
     *
     * @param Atencion $atencion
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Atencion $atencion)
    {
        try {
            $atencion->delete();
            return response()->json(['message' => 'Atención eliminada correctamente.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la Atención: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Cambiar el estado activo/inactivo.
     *
     * @param Atencion $atencion
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleActivo(Atencion $atencion)
    {
        try {
            $atencion->activo = !$atencion->activo;
            $atencion->save();
            return response()->json(['activo' => $atencion->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado: ' . $e->getMessage()], 500);
        }
    }
}
