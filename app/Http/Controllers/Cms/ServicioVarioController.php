<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\ServicioVario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServicioVarioController extends Controller
{
    /**
     * Mostrar listado de servicios
     */
    public function index()
    {
        $servicios = ServicioVario::orderBy('orden', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        return inertia('cms/servicios-varios/index', [
            'servicios' => $servicios
        ]);
    }

    /**
     * Mostrar formulario de creación
     */
    public function create()
    {
        return inertia('cms/servicios-varios/formServiciosVarios', [
            'serviciosVario' => null
        ]);
    }

    /**
     * Guardar nuevo servicio
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'descripcion' => 'required|string',
            'caracteristicas' => 'nullable|array',
            'caracteristicas.*' => 'string|max:255',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'activo' => 'boolean',
            'orden' => 'nullable|integer'
        ]);

        // Crear el servicio
        $servicio = ServicioVario::create([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'descripcion' => $validated['descripcion'],
            'caracteristicas' => $validated['caracteristicas'] ?? [],
            'activo' => $request->has('activo'),
            'orden' => $validated['orden'] ?? 0
        ]);

        // Procesar imágenes
        if ($request->hasFile('imagenes')) {
            $imagenes = [];
            $files = $request->file('imagenes');
            
            // Limitar a 5 imágenes
            $files = array_slice($files, 0, 5);
            
            foreach ($files as $file) {
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('servicios-varios', $filename, 'public');
                $imagenes[] = $path;
            }
            
            $servicio->imagenes = $imagenes;
            $servicio->save();
        }

        return redirect()
            ->route('cms.servicios-varios.index')
            ->with('success', 'Servicio creado exitosamente');
    }

    /**
     * Mostrar un servicio específico
     */
    public function show(ServicioVario $serviciosVario)
    {
        return inertia('cms.servicios-varios.show', [
            'serviciosVario' => $serviciosVario
        ]);
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(ServicioVario $serviciosVario)
    {
        return inertia('cms/servicios-varios/formServiciosVarios', [
            'serviciosVario' => $serviciosVario
        ]);
    }

    /**
     * Actualizar servicio
     */
    public function update(Request $request, ServicioVario $serviciosVario)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'descripcion' => 'required|string',
            'caracteristicas' => 'nullable|array',
            'caracteristicas.*' => 'string|max:255',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'imagenes_existentes' => 'nullable|array',
            'activo' => 'boolean',
            'orden' => 'nullable|integer'
        ]);

        // Actualizar datos básicos
        $serviciosVario->update([
            'title' => $validated['title'],
            'subtitle' => $validated['subtitle'] ?? null,
            'descripcion' => $validated['descripcion'],
            'caracteristicas' => $validated['caracteristicas'] ?? [],
            'activo' => $request->has('activo'),
            'orden' => $validated['orden'] ?? 0
        ]);

        // Manejar imágenes existentes
        $imagenesActuales = $serviciosVario->imagenes ?? [];
        $imagenesAMantener = $request->input('imagenes_existentes', []);
        
        // Eliminar imágenes no seleccionadas
        foreach ($imagenesActuales as $imagen) {
            if (!in_array($imagen, $imagenesAMantener)) {
                Storage::disk('public')->delete($imagen);
            }
        }
        
        $imagenes = $imagenesAMantener;

        // Agregar nuevas imágenes
        if ($request->hasFile('imagenes')) {
            $files = $request->file('imagenes');
            $espacioDisponible = 5 - count($imagenes);
            $files = array_slice($files, 0, $espacioDisponible);
            
            foreach ($files as $file) {
                $filename = time() . '_' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('servicios-varios', $filename, 'public');
                $imagenes[] = $path;
            }
        }

        $serviciosVario->imagenes = $imagenes;
        $serviciosVario->save();

        return redirect()
            ->route('cms.servicios-varios.index')
            ->with('success', 'Servicio actualizado exitosamente');
    }

    /**
     * Eliminar servicio
     */
    public function destroy(ServicioVario $serviciosVario)
    {
        // Eliminar imágenes del storage
        if ($serviciosVario->imagenes) {
            foreach ($serviciosVario->imagenes as $imagen) {
                Storage::disk('public')->delete($imagen);
            }
        }

        $serviciosVario->delete();

        return redirect()
            ->route('cms.servicios-varios.index')
            ->with('success', 'Servicio eliminado exitosamente');
    }

    /**
     * Eliminar una imagen específica
     */
    public function eliminarImagen(Request $request, ServicioVario $serviciosVario)
    {
        $request->validate([
            'imagen_index' => 'required|integer'
        ]);

        $imagenes = $serviciosVario->imagenes ?? [];
        $index = $request->input('imagen_index');

        if (isset($imagenes[$index])) {
            Storage::disk('public')->delete($imagenes[$index]);
            unset($imagenes[$index]);
            $serviciosVario->imagenes = array_values($imagenes);
            $serviciosVario->save();

            return response()->json([
                'success' => true,
                'message' => 'Imagen eliminada correctamente'
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Imagen no encontrada'
        ], 404);
    }

    /**
     * Cambiar estado activo/inactivo
     */
    public function toggleActivo(ServicioVario $serviciosVario)
    {
        $serviciosVario->activo = !$serviciosVario->activo;
        $serviciosVario->save();

        return response()->json([
            'success' => true,
            'activo' => $serviciosVario->activo
        ]);
    }

    /**
     * Actualizar orden
     */
    public function actualizarOrden(Request $request)
    {
        $request->validate([
            'orden' => 'required|array',
            'orden.*.id' => 'required|exists:servicios_varios,id',
            'orden.*.position' => 'required|integer'
        ]);

        foreach ($request->input('orden') as $item) {
            ServicioVario::where('id', $item['id'])
                ->update(['orden' => $item['position']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Orden actualizado correctamente'
        ]);
    }
}