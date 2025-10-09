<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\CarruselSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class CarruselSectionController extends Controller
{
    /**
     * Mostrar listado de items de una sección
     */
    public function index($section)
    {
        $items = CarruselSection::section($section)->ordered()->get();
        
        return Inertia::render('cms/carruselsection/index', [
            'items' => $items,
            'section' => $section,
            'sectionTitle' => ucfirst($section)
        ]);
    }

    /**
     * Mostrar formulario para crear nuevo item
     */
    public function create($section)
    {
        return Inertia::render('cms/carruselsection/formCarruselSection', [
            'item' => null,
            'section' => $section,
            'sectionTitle' => ucfirst($section)
        ]);
    }

    /**
     * Obtener solo items activos de una sección (para el frontend público)
     */
    public function active($section)
    {
        $items = CarruselSection::getSection($section, true);
        
        return response()->json([
            'success' => true,
            'section' => $section,
            'data' => $items
        ]);
    }

    /**
     * Crear un nuevo item en una sección
     */
    public function store(Request $request, $section)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
            'title1' => 'nullable|string|max:255',
            'title2' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'activo' => 'nullable'
        ], [
            'image.required' => 'La imagen es obligatoria',
            'image.image' => 'El archivo debe ser una imagen',
            'image.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o webp',
            'image.max' => 'La imagen no debe superar los 2MB',
            'title1.max' => 'El título principal no debe superar los 255 caracteres',
            'title2.max' => 'El título secundario no debe superar los 255 caracteres',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Manejar la imagen
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store("carrusel/{$section}", 'public');
        }

        // Obtener el siguiente order si no se especifica
        $order = $request->order ?? CarruselSection::section($section)->max('order') + 1;

        CarruselSection::create([
            'section' => $section,
            'image' => $imagePath,
            'title1' => $request->title1 ?: null,
            'title2' => $request->title2 ?: null,
            'order' => $order,
            'activo' => $request->activo === '1' || $request->activo === 1 || $request->activo === true
        ]);

        return redirect()->route('cms.carrusel.index', $section)
            ->with('success', 'Item creado exitosamente');
    }

    /**
     * Mostrar formulario para editar item
     */
    public function edit($section, $id)
    {
        $item = CarruselSection::section($section)->findOrFail($id);
        
        return Inertia::render('cms/carruselsection/formCarruselSection', [
            'item' => $item,
            'section' => $section,
            'sectionTitle' => ucfirst($section)
        ]);
    }

    /**
     * Actualizar un item existente
     */
    public function update(Request $request, $section, $id)
    {
        $item = CarruselSection::section($section)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'title1' => 'nullable|string|max:255',
            'title2' => 'nullable|string|max:255',
            'order' => 'nullable|integer',
            'activo' => 'nullable'
        ], [
            'image.image' => 'El archivo debe ser una imagen',
            'image.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg o webp',
            'image.max' => 'La imagen no debe superar los 2MB',
            'title1.max' => 'El título principal no debe superar los 255 caracteres',
            'title2.max' => 'El título secundario no debe superar los 255 caracteres',
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        // Si hay nueva imagen, eliminar la anterior
        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $item->image = $request->file('image')->store("carrusel/{$section}", 'public');
        }

        // Actualizar otros campos
        $item->title1 = $request->title1 ?: null;
        $item->title2 = $request->title2 ?: null;
        $item->order = $request->order ?? $item->order;
        $item->activo = $request->activo === '1' || $request->activo === 1 || $request->activo === true;
        $item->save();

        return redirect()->route('cms.carrusel.index', $section)
            ->with('success', 'Item actualizado exitosamente');
    }

    /**
     * Eliminar un item
     */
    public function destroy($section, $id)
    {
        $item = CarruselSection::section($section)->findOrFail($id);

        // Eliminar imagen del storage
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }

        $item->delete();

        return redirect()->route('cms.carrusel.index', $section)
            ->with('success', 'Item eliminado exitosamente');
    }

    /**
     * Toggle del estado activo
     */
    public function toggleActivo($section, $id)
    {
        $item = CarruselSection::section($section)->findOrFail($id);
        $item->activo = !$item->activo;
        $item->save();

        return back();
    }

    /**
     * Reordenar items de una sección
     */
    public function reorder(Request $request, $section)
    {
        $validator = Validator::make($request->all(), [
            'items' => 'required|array',
            'items.*.id' => 'required|exists:carrusel_sections,id',
            'items.*.order' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->items as $itemData) {
            CarruselSection::section($section)
                ->where('id', $itemData['id'])
                ->update(['order' => $itemData['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Items reordenados exitosamente'
        ]);
    }

    /**
     * Obtener items activos de una sección para el frontend
     */
    public function getForFrontend($section)
    {
        $items = CarruselSection::section($section)
            ->active()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'image' => $item->image,
                    'title1' => $item->title1,
                    'title2' => $item->title2,
                    'description' => $item->description,
                    'order' => $item->order,
                    'activo' => $item->activo,
                ];
            });

        return $items;
    }

}