<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Cita;
use Exception;
use Inertia\Inertia;

class CitaController extends Controller
{
    /**
     * Mostrar todas las citas.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        $citas = Cita::select('id', 'title as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/citas/index', [
            'citas' => $citas
        ]);
    }

    /**
     * Formulario para crear una nueva cita.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('cms/citas/formCita', [
            'cita' => new Cita()
        ]);
    }

    /**
     * Guardar una nueva cita.
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

            Cita::create($data);

            return redirect()->route('cms.citas.index')
                ->with('success', 'Cita creada correctamente.');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al crear la Cita: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Formulario para editar una cita existente.
     *
     * @param Cita $cita
     * @return \Inertia\Response
     */
    public function edit(Cita $cita)
    {
        $cita->color = 'bg-' . $cita->color . '-500';

        return Inertia::render('cms/citas/formCita', [
            'cita' => $cita
        ]);
    }

    /**
     * Actualizar una cita existente.
     *
     * @param Cita $cita
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Cita $cita)
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

            $cita->update($data);

            return back()->with('success', 'Cita actualizada correctamente.');
        } catch (Exception $e) {
            return back()->withErrors([
                'error' => 'Error al actualizar la Cita: ' . $e->getMessage()
            ])->withInput();
        }
    }

    /**
     * Eliminar una cita.
     *
     * @param Cita $cita
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Cita $cita)
    {
        try {
            $cita->delete();
            return response()->json(['message' => 'Cita eliminada correctamente.'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la Cita: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Cambiar el estado activo/inactivo.
     *
     * @param Cita $cita
     * @return \Illuminate\Http\JsonResponse
     */
    public function toggleActivo(Cita $cita)
    {
        try {
            $cita->activo = !$cita->activo;
            $cita->save();

            return response()->json(['activo' => $cita->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado: ' . $e->getMessage()], 500);
        }
    }
}
