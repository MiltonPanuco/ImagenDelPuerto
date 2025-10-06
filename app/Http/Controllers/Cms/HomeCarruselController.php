<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\HomeCarrusel;
use Exception;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeCarruselController extends Controller
{
    /**
     * Listar todos los carruseles
     */
    public function index()
    {
        $carruseles = HomeCarrusel::select('id', 'title as nombre', 'descripcion', 'image', 'activo', 'orden')
            ->ordenados()
            ->paginate(10);

        return Inertia::render('cms/homecarrusel/index', [
            'carruseles' => $carruseles
        ]);
    }

    /**
     * Mostrar formulario para crear
     */
    public function create()
    {
        return Inertia::render('cms/homecarrusel/formHomeCarrusel', [
            'carrusel' => [
                'title' => '',
                'descripcion' => '',
                'orden' => 0,
                'activo' => true,
            ]
        ]);
    }

    /**
     * Guardar nuevo carrusel
     */
    public function store()
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
            'image'       => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'activo'      => 'boolean',
            'orden'       => 'nullable|integer|min:0',
        ], [
            'title.required'      => 'El título es obligatorio.',
            'title.max'           => 'El título no debe exceder los 255 caracteres.',
            'descripcion.max'     => 'La descripción no debe exceder los 500 caracteres.',
            'image.required'      => 'La imagen es obligatoria.',
            'image.image'         => 'El archivo debe ser una imagen.',
            'image.mimes'         => 'La imagen debe ser formato: jpeg, png, jpg o webp.',
            'image.max'           => 'La imagen no debe pesar más de 2MB.',
            'orden.integer'       => 'El orden debe ser un número entero.',
            'orden.min'           => 'El orden no puede ser negativo.',
        ]);

        $data['activo'] = $data['activo'] ?? false;
        $data['orden'] = $data['orden'] ?? 0;

        try {
            if (request()->hasFile('image')) {
                $imagePath = request()->file('image')->store('homecarrusel', 'public');
                $data['image'] = $imagePath;
            }

            HomeCarrusel::create($data);
            
            return redirect()->route('cms.homecarrusel.index')->with('success', 'Carrusel creado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear el carrusel. ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Mostrar formulario para editar
     */
    public function edit(HomeCarrusel $homecarrusel)
    {
        // El modelo ya incluye image_url automáticamente gracias al accessor
        return Inertia::render('cms/homecarrusel/formHomeCarrusel', [
            'carrusel' => $homecarrusel
        ]);
    }

    /**
     * Actualizar carrusel
     */
    public function update(HomeCarrusel $homecarrusel)
    {
        $data = request()->validate([
            'title'       => 'required|string|max:255',
            'descripcion' => 'nullable|string|max:500',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'activo'      => 'boolean',
            'orden'       => 'nullable|integer|min:0',
        ], [
            'title.required'      => 'El título es obligatorio.',
            'title.max'           => 'El título no debe exceder los 255 caracteres.',
            'descripcion.max'     => 'La descripción no debe exceder los 500 caracteres.',
            'image.image'         => 'El archivo debe ser una imagen.',
            'image.mimes'         => 'La imagen debe ser formato: jpeg, png, jpg o webp.',
            'image.max'           => 'La imagen no debe pesar más de 2MB.',
            'orden.integer'       => 'El orden debe ser un número entero.',
            'orden.min'           => 'El orden no puede ser negativo.',
        ]);

        $data['activo'] = $data['activo'] ?? false;

        try {
            if (request()->hasFile('image')) {
                // Eliminar imagen anterior si existe
                if ($homecarrusel->image && Storage::disk('public')->exists($homecarrusel->image)) {
                    Storage::disk('public')->delete($homecarrusel->image);
                }
                
                // Guardar nueva imagen
                $imagePath = request()->file('image')->store('homecarrusel', 'public');
                $data['image'] = $imagePath;
            }

            $homecarrusel->update($data);
            
            return back()->with('success', 'Carrusel actualizado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar el carrusel. ' . $e->getMessage()])->withInput();
        }
    }

    /**
     * Eliminar carrusel
     */
    public function destroy(HomeCarrusel $homecarrusel)
    {
        try {
            // Eliminar la imagen del storage
            if ($homecarrusel->image && Storage::disk('public')->exists($homecarrusel->image)) {
                Storage::disk('public')->delete($homecarrusel->image);
            }
            
            $homecarrusel->delete();
            
            return response()->json(['message' => 'Carrusel eliminado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar el carrusel. ' . $e->getMessage()], 500);
        }
    }

    /**
     * Toggle estado activo
     */
    public function toggleActivo(HomeCarrusel $homecarrusel)
    {
        try {
            $homecarrusel->activo = !$homecarrusel->activo;
            $homecarrusel->save();
            
            return response()->json(['activo' => $homecarrusel->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar el estado del carrusel. ' . $e->getMessage()], 500);
        }
    }
}