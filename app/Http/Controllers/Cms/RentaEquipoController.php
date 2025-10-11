<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\RentaEquipo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Exception;

class RentaEquipoController extends Controller
{
    public function index()
    {
        $equipos = RentaEquipo::orderBy('orden', 'asc')->paginate(10);
        return inertia('cms/renta-equipos/index', ['equipos' => $equipos]);
    }

    public function create()
    {
        return inertia('cms/renta-equipos/formRentaEquipos');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'caracteristicas' => 'nullable|array',
            'caracteristicas.*' => 'string',
            'color' => 'nullable|string|max:100',
            'activo' => 'boolean',
            'orden' => 'integer',
        ]);

        $imagePaths = [];
        if ($request->hasFile('images')) {
            $files = $request->file('images');
            
            if (count($files) > 5) {
                return back()->withErrors(['error' => 'Solo puedes subir un máximo de 5 imágenes.'])->withInput();
            }

            foreach ($files as $file) {
                $path = $file->store('renta-equipos', 'public');
                $imagePaths[] = $path;
            }
        }

        $validated['images'] = $imagePaths;
        $validated['activo'] = $request->boolean('activo');
        
        if (!empty($validated['color']) && strpos($validated['color'], 'bg-') === 0) {
            $colorParts = explode('-', $validated['color']);
            $validated['color'] = $colorParts[1] ?? $validated['color'];
        }

        try {
            RentaEquipo::create($validated);
            return redirect()->route('cms.renta-equipos.index')->with('success', 'Equipo creado correctamente.');
        } catch (Exception $e) {
            Log::error('Error al crear equipo: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al crear el equipo. ' . $e->getMessage()])->withInput();
        }
    }

    public function edit(RentaEquipo $rentaEquipo)
    {
        $rentaEquipo->color = 'bg-' . $rentaEquipo->color . '-500';
        return inertia('cms/renta-equipos/formRentaEquipos', [
            'rentaEquipo' => $rentaEquipo
        ]);
    }

    public function update(Request $request, RentaEquipo $rentaEquipo)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imagenes_existentes' => 'nullable|array',
            'imagenes_existentes.*' => 'string',
            'caracteristicas' => 'nullable|array',
            'caracteristicas.*' => 'string',
            'color' => 'nullable|string|max:100',
            'activo' => 'boolean',
            'orden' => 'integer',
        ]);

        $imagePaths = $request->input('imagenes_existentes', []);

        if ($request->hasFile('images')) {
            $newFiles = $request->file('images');
            
            $totalImages = count($imagePaths) + count($newFiles);
            if ($totalImages > 5) {
                return back()->withErrors(['error' => 'Solo puedes tener un máximo de 5 imágenes en total.'])->withInput();
            }

            foreach ($newFiles as $file) {
                $path = $file->store('renta-equipos', 'public');
                $imagePaths[] = $path;
            }
        }

        $imagenesAEliminar = array_diff($rentaEquipo->images ?? [], $imagePaths);
        foreach ($imagenesAEliminar as $imagen) {
            Storage::disk('public')->delete($imagen);
        }

        $validated['images'] = $imagePaths;
        $validated['activo'] = $request->boolean('activo');

        if (!empty($validated['color']) && strpos($validated['color'], 'bg-') === 0) {
            $colorParts = explode('-', $validated['color']);
            $validated['color'] = $colorParts[1] ?? $validated['color'];
        }

        try {
            $rentaEquipo->update($validated);
            return redirect()->route('cms.renta-equipos.index')->with('success', 'Equipo actualizado correctamente.');
        } catch (Exception $e) {
            Log::error('Error al actualizar equipo: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al actualizar el equipo. ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy(RentaEquipo $rentaEquipo)
    {
        try {
            if (!empty($rentaEquipo->images)) {
                foreach ($rentaEquipo->images as $imagen) {
                    Storage::disk('public')->delete($imagen);
                }
            }

            $rentaEquipo->delete();
            
            return redirect()->route('cms.renta-equipos.index')->with('success', 'Equipo eliminado correctamente.');
        } catch (Exception $e) {
            Log::error('Error al eliminar equipo: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al eliminar el equipo. ' . $e->getMessage()]);
        }
    }

    public function toggleActivo(RentaEquipo $rentaEquipo)
    {
        try {
            $rentaEquipo->activo = !$rentaEquipo->activo;
            $rentaEquipo->save();
            
            return response()->json(['activo' => $rentaEquipo->activo], 200);
        } catch (Exception $e) {
            Log::error('Error al cambiar estado equipo: ' . $e->getMessage());
            return response()->json(['message' => 'Error al cambiar el estado del equipo. ' . $e->getMessage()], 500);
        }
    }
}