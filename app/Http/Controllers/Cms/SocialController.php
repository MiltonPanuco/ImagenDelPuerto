<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Social;
use Exception;
use Inertia\Inertia;

class SocialController extends Controller
{
    /** Listado de redes sociales */
    public function index()
    {
        $sociales = Social::select(
            'id', 
            'title as nombre',           // Alias para DataTable
            'description as descripcion', // Alias para DataTable
            'url', 
            'color', 
            'icon', 
            'activo'
        )->paginate(10);

        return Inertia::render('cms/sociales/index', [
            'sociales' => $sociales
        ]);
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/sociales/formSocial', ['social' => new Social()]);
    }

    /** Registrar Social */
    public function store()
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'required|string|max:100',
            'color'       => 'required|string|max:50',
            'url'         => 'required|url|max:255',
            'activo'      => 'boolean',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            // Extraer solo el color si viene con prefijo bg-
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            Social::create($data);

            return redirect()->route('cms.sociales.index')
                ->with('success', 'Red social creada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear la red social. ' . $e->getMessage()])->withInput();
        }
    }

    /** Formulario para editar */
    public function edit(Social $social)
    {
        // Preparar color para el formulario
        $social->color = 'bg-' . $social->color . '-500';

        return Inertia::render('cms/sociales/formSocial', [
            'social' => $social
        ]);
    }

    /** Actualizar Social */
    public function update(Social $social)
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'description' => 'required|string',
            'icon'        => 'required|string|max:100',
            'color'       => 'required|string|max:50',
            'url'         => 'required|url|max:255',
            'activo'      => 'boolean',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            $social->update($data);

            return back()->with('success', 'Red social actualizada correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar la red social. ' . $e->getMessage()])->withInput();
        }
    }

    /** Eliminar Social */
    public function destroy(Social $social)
    {
        try {
            $social->delete();
            return response()->json(['message' => 'Red social eliminada correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la red social. ' . $e->getMessage()], 500);
        }
    }

    /** Cambiar estado activo/inactivo */
    public function toggleActivo(Social $social)
    {
        try {
            $social->activo = !$social->activo;
            $social->save();
            return response()->json(['activo' => $social->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado. ' . $e->getMessage()], 500);
        }
    }
}