<?php

namespace App\Http\Controllers\Cms\Galeria;

use App\Http\Controllers\Controller;
use App\Models\GaleriaRecuerdo;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriaRecuerdosController extends Controller
{
    public function index()
    {
        $galeria = GaleriaRecuerdo::select('id', 'title', 'src', 'date', 'activo', 'descripcion')
            ->orderBy('id', 'desc')
            ->get();

        foreach ($galeria as $item) {
            $item->src = Storage::url($item->src);
        }

        return Inertia::render('cms/galeria/recuerdos/index', [
            'galeria' => $galeria
        ]);
    }

    public function update(GaleriaRecuerdo $recuerdo, Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'activo'     => 'boolean',
        ], [
            'title.required'  => 'El título de la imagen es obligatorio.',
            'title.max'       => 'El título no debe exceder los 255 caracteres.',
        ]);

        $data = $request->all();
        try {
            $recuerdo->title = trim($data['title']);
            $recuerdo->descripcion = trim($data['descripcion']) ?? null;
            $recuerdo->date = trim($data['date']) ?? null;
            $recuerdo->activo = (int) $data['activo'];
            $recuerdo->save();

            $recuerdo->src = Storage::url($recuerdo->src);

            return response()->json($recuerdo, 200);

        } catch (Exception $e) {
            return response()->json(['message' => 'Error al actualizar el registro: ' . $e->getMessage()], 500);
        }
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'activo'     => 'boolean',
            'image'        => 'required|file|mimes:jpg,jpeg,png|max:5120', // Máximo 5MB
        ], [
            'title.required'  => 'El título de la imagen es obligatorio.',
            'title.max'       => 'El título no debe exceder los 255 caracteres.',
            'image.required'   => 'La imagen es obligatoria.',
            'image.mimes'      => 'La imagen debe ser un archivo de tipo: jpg, jpeg, png.',
            'image.max'        => 'La imagen no debe exceder los 5MB.',
        ]);

        $data = $request->all();
        try {
            if ($request->hasFile('image')) {
                $file = $request->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('gallery', $filename, 'public');
            } else {
                return response()->json(['message' => 'No se ha proporcionado ningún archivo.'], 400);
            }

            $galeriaRecuerdo = GaleriaRecuerdo::create([
                'title'       => $data['title'],
                'descripcion' => $data['descripcion'] ?? null,
                'date'        => $data['date'] ?? null,
                'src'         => $path,
                'activo'      => (int) $data['activo'],
            ]);

            $galeriaRecuerdo->src = Storage::url($path);
            return response()->json($galeriaRecuerdo, 201);

        } catch (Exception $e) {
            return response()->json(['message' => 'Error al guardar la imagen: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(GaleriaRecuerdo $recuerdo)
    {
        try {

            $recuerdo->delete();

            if (Storage::disk('public')->exists($recuerdo->src)) {
                Storage::disk('public')->delete($recuerdo->src);
            }

            return response()->json(['message' => 'Imagen eliminada correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la imagen: ' . $e->getMessage()], 500);
        }
    }

    public function updateField($id, $field)
    {
        $allowedFields = ['activo'];
        if (!in_array($field, $allowedFields)) {
            return response()->json(['message' => 'Campo no permitido'], 400);
        }

        try {
            $recuerdo = GaleriaRecuerdo::find($id);
            if (! $recuerdo) {
                return response()->json(['message' => 'Imagen no encontrada'], 404);
            }
            $recuerdo->$field = !$recuerdo->$field;
            $recuerdo->save();

            return response()->json(['message' => 'Campo actualizado correctamente', 'newValue' => $recuerdo->$field], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al actualizar el campo: ' . $e->getMessage()], 500);
        }
    }
}