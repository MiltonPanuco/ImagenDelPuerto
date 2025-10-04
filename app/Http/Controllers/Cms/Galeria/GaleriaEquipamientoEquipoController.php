<?php

namespace App\Http\Controllers\Cms\Galeria;

use App\Http\Controllers\Controller;
use App\Models\GaleriaEquipamiento;
use App\Models\GaleriaEquipamientoEquipo;
use Exception;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class GaleriaEquipamientoEquipoController extends Controller
{

    public function edit(GaleriaEquipamiento $equipamiento, GaleriaEquipamientoEquipo $equipo)
    {
        if ($equipo->image) {
            $equipo->image = Storage::url($equipo->image);
        }
        $equipo->color = 'bg-' . $equipo->color . '-500'; // Agregar prefijo y sufijo para el color
        return Inertia::render('cms/galeria/equipos/formEquipo', [
            'equipamiento' => $equipamiento,
            'equipo' => $equipo,
            'backUrl' => request()->input('backUrl') ?? route('cms.galeria.equipamiento.index'),
        ]);
    }

    public function update(GaleriaEquipamiento $equipamiento, GaleriaEquipamientoEquipo $equipo)
    {
        $data = request()->validate([
            'id_galeria_equipamiento' => 'required|exists:galeria_equipamiento,id',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'servicio' => 'required|string|max:255',
            'caracteristicas' => 'nullable|array',
            'descripcion' => 'required|string',
            'activo' => 'boolean',
        ], [
            'id_galeria_equipamiento.required' => 'El ID del equipamiento es obligatorio.',
            'id_galeria_equipamiento.exists' => 'El equipamiento especificado no existe.',
            'icon.required' => 'El icono es obligatorio.',
            'icon.max' => 'El icono no debe exceder los 255 caracteres.',
            'color.required' => 'El color es obligatorio.',
            'color.max' => 'El color no debe exceder los 255 caracteres.',
            'servicio.required' => 'El servicio es obligatorio.',
            'servicio.max' => 'El servicio no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'caracteristicas.array' => 'Las características deben ser un arreglo.',
        ]);

        try {
            $data['activo'] = $data['activo'] ?? false;
            // Si el color tiene el prefijo 'bg-', extraer solo el color; si no, dejarlo igual
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }

            $equipo->update($data);

            return back()->with('success', 'Servicio actualizado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar el registro de equipo. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario */
    public function create(GaleriaEquipamiento $equipamiento)
    {
        $equipo = new GaleriaEquipamientoEquipo();
        $equipo->id_galeria_equipamiento = $equipamiento->id;
        return Inertia::render('cms/galeria/equipos/formEquipo', [
            'equipamiento' => $equipamiento->only('id', 'titulo'),
            'equipo' => $equipo,
            'backUrl' => request()->input('backUrl') ?? route('cms.galeria.equipamiento.index'),
        ]);
    }

    public function store(GaleriaEquipamiento $equipamiento)
    {
        $data = request()->validate([
            'id_galeria_equipamiento' => 'required|exists:galeria_equipamiento,id',
            'icon' => 'required|string|max:255',
            'color' => 'required|string|max:255',
            'servicio' => 'required|string|max:255',
            'caracteristicas' => 'nullable|array',
            'descripcion' => 'required|string',
            'activo' => 'boolean',
        ], [
            'id_galeria_equipamiento.required' => 'El ID del equipamiento es obligatorio.',
            'id_galeria_equipamiento.exists' => 'El equipamiento especificado no existe.',
            'icon.required' => 'El icono es obligatorio.',
            'icon.max' => 'El icono no debe exceder los 255 caracteres.',
            'color.required' => 'El color es obligatorio.',
            'color.max' => 'El color no debe exceder los 255 caracteres.',
            'servicio.required' => 'El servicio es obligatorio.',
            'servicio.max' => 'El servicio no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'caracteristicas.array' => 'Las características deben ser un arreglo.',
        ]);
        try {
            $path = null;
            if (request()->hasFile('image')) {
                $file = request()->file('image');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = $file->storeAs('gallery', $filename, 'public');
            } else {
                return back()->withErrors(['error' => 'Imagen inválida, por favor selecciona una imagen válida.'])->withInput();
            }
            $data['image'] = $path;
            $data['activo'] = $data['activo'] ?? false;
            $data['color'] = explode('-', $data['color'])[1]; // Extraer solo el color sin el prefijo 'bg-'
            $maxOrden = $equipamiento->equipos()->max('orden');
            $data['orden'] = is_null($maxOrden) ? 1 : $maxOrden + 1;
            GaleriaEquipamientoEquipo::create($data);

            /** Redirige al edit del equipamiento con mensaje success */
            return redirect()->route('cms.galeria.equipamiento.edit', $equipamiento->id)
            ->with('success', 'Equipo creado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear el registro de equipo. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(GaleriaEquipamiento $equipamiento, GaleriaEquipamientoEquipo $equipo)
    {
        if ($equipo->id_galeria_equipamiento !== $equipamiento->id) {
            return response()->json(['message' => 'El equipo no pertenece al equipamiento especificado'], 403);
        }
        try {
            $equipo->delete();

            if (Storage::disk('public')->exists($equipo->image)) {
                Storage::disk('public')->delete($equipo->image);
            }

            return response()->json(['message' => 'Equipo eliminado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar el equipo: ' . $e->getMessage()], 500);
        }
    }

    public function toggleActivo(GaleriaEquipamiento $equipamiento, GaleriaEquipamientoEquipo $equipo)
    {
        try {
            $equipo->activo = !$equipo->activo;
            $equipo->save();
            return response()->json(['newValue' => $equipo->activo], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al cambiar estado del equipo: ' . $e->getMessage()], 500);
        }
    }

    public function replaceImage(GaleriaEquipamiento $equipamiento, GaleriaEquipamientoEquipo $equipo)
    {
        if ($equipo->id_galeria_equipamiento !== $equipamiento->id) {
            return response()->json(['message' => 'El equipo no pertenece al equipamiento especificado'], 403);
        }

        if (!request()->hasFile('image')) {
            return response()->json(['message' => 'No se ha proporcionado ningún archivo.'], 400);
        }

        try {
            // Elimina la imagen anterior si existe
            if ($equipo->image && Storage::disk('public')->exists($equipo->image)) {
                Storage::disk('public')->delete($equipo->image);
            }

            $file = request()->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('gallery', $filename, 'public');

            $equipo->image = $path;
            $equipo->save();

            return response()->json(['message' => 'Imagen reemplazada correctamente', 'imageUrl' => Storage::url($path)], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al reemplazar la imagen: ' . $e->getMessage()], 500);
        }
    }
}
