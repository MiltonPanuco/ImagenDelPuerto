<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\ServicioVario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Exception;

class ServicioVarioController extends Controller
{
    public function index()
    {
        $servicios = ServicioVario::orderBy('orden', 'asc')
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        
        $servicios->getCollection()->transform(function ($servicio) {
            if (!empty($servicio->imagenes)) {
                $servicio->imagenes = array_map(function ($imagen) {
                    return asset('storage/' . $imagen);
                }, $servicio->imagenes);
            }
            return $servicio;
        });
        
        return inertia('cms/servicios-varios/index', [
            'servicios' => $servicios
        ]);
    }

    public function create()
    {
        return inertia('cms/servicios-varios/formServiciosVarios', [
            'serviciosVario' => null
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'nullable|string|max:255',
            'descripcion' => 'required|string',
            'caracteristicas' => 'nullable|array',
            'caracteristicas.*' => 'string|max:255',
            'imagenes.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'icon' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:50',
            'activo' => 'boolean',
            'orden' => 'nullable|integer'
        ]);

        if (!empty($validated['color']) && strpos($validated['color'], 'bg-') === 0) {
            $colorParts = explode('-', $validated['color']);
            $validated['color'] = $colorParts[1] ?? $validated['color'];
        }

        try {
            $servicio = ServicioVario::create([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? null,
                'descripcion' => $validated['descripcion'],
                'caracteristicas' => $validated['caracteristicas'] ?? [],
                'icon' => $validated['icon'] ?? null, 
                'color' => $validated['color'] ?? null,
                'activo' => $request->has('activo'),
                'orden' => $validated['orden'] ?? 0
            ]);

            if ($request->hasFile('imagenes')) {
                $imagenes = [];
                $files = $request->file('imagenes');
                
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
        } catch (Exception $e) {
            Log::error('Error al crear servicio: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al crear el servicio. ' . $e->getMessage()])->withInput();
        }
    }

    public function show(ServicioVario $serviciosVario)
    {
        if (!empty($serviciosVario->imagenes)) {
            $serviciosVario->imagenes = array_map(function ($imagen) {
                return asset('storage/' . $imagen);
            }, $serviciosVario->imagenes);
        }
        
        return inertia('cms.servicios-varios.show', [
            'serviciosVario' => $serviciosVario
        ]);
    }

    public function edit(ServicioVario $serviciosVario)
    {
        if (!empty($serviciosVario->color)) {
            $serviciosVario->color = 'bg-' . $serviciosVario->color . '-500';
        }
        
        if (!empty($serviciosVario->imagenes)) {
            $serviciosVario->imagenes_preview = array_map(function ($imagen) {
                return asset('storage/' . $imagen);
            }, $serviciosVario->imagenes);
            
            $serviciosVario->imagenes_paths = $serviciosVario->imagenes;
        }
        
        return inertia('cms/servicios-varios/formServiciosVarios', [
            'serviciosVario' => $serviciosVario
        ]);
    }

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
            'icon' => 'nullable|string|max:255',   
            'color' => 'nullable|string|max:50',   
            'activo' => 'boolean',
            'orden' => 'nullable|integer'
        ]);

        if (!empty($validated['color']) && strpos($validated['color'], 'bg-') === 0) {
            $colorParts = explode('-', $validated['color']);
            $validated['color'] = $colorParts[1] ?? $validated['color'];
        }

        try {
            $serviciosVario->update([
                'title' => $validated['title'],
                'subtitle' => $validated['subtitle'] ?? null,
                'descripcion' => $validated['descripcion'],
                'caracteristicas' => $validated['caracteristicas'] ?? [],
                'icon' => $validated['icon'] ?? null,    
                'color' => $validated['color'] ?? null,  
                'activo' => $request->has('activo'),
                'orden' => $validated['orden'] ?? 0
            ]);

            $imagenesActuales = $serviciosVario->imagenes ?? [];
            $imagenesAMantener = $request->input('imagenes_existentes', []);
            
            $imagenesAMantener = array_map(function($imagen) {
                $parsed = parse_url($imagen);
                $path = $parsed['path'] ?? $imagen;
                return str_replace('/storage/', '', $path);
            }, $imagenesAMantener);
            
            foreach ($imagenesActuales as $imagen) {
                if (!in_array($imagen, $imagenesAMantener)) {
                    Storage::disk('public')->delete($imagen);
                }
            }
            
            $imagenes = $imagenesAMantener;

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
        } catch (Exception $e) {
            Log::error('Error al actualizar servicio: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al actualizar el servicio. ' . $e->getMessage()])->withInput();
        }
    }

    public function destroy(ServicioVario $serviciosVario)
    {
        try {
            if ($serviciosVario->imagenes) {
                foreach ($serviciosVario->imagenes as $imagen) {
                    Storage::disk('public')->delete($imagen);
                }
            }

            $serviciosVario->delete();

            return redirect()
                ->route('cms.servicios-varios.index')
                ->with('success', 'Servicio eliminado exitosamente');
        } catch (Exception $e) {
            Log::error('Error al eliminar servicio: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Error al eliminar el servicio. ' . $e->getMessage()]);
        }
    }

    public function eliminarImagen(Request $request, ServicioVario $serviciosVario)
    {
        $request->validate([
            'imagen_index' => 'required|integer'
        ]);

        try {
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
        } catch (Exception $e) {
            Log::error('Error al eliminar imagen: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al eliminar la imagen. ' . $e->getMessage()
            ], 500);
        }
    }

    public function toggleActivo(ServicioVario $serviciosVario)
    {
        try {
            $serviciosVario->activo = !$serviciosVario->activo;
            $serviciosVario->save();

            return response()->json([
                'activo' => $serviciosVario->activo
            ], 200);
        } catch (Exception $e) {
            Log::error('Error al cambiar estado servicio: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error al cambiar el estado del servicio. ' . $e->getMessage()
            ], 500);
        }
    }

    public function actualizarOrden(Request $request)
    {
        $request->validate([
            'orden' => 'required|array',
            'orden.*.id' => 'required|exists:servicios_varios,id',
            'orden.*.position' => 'required|integer'
        ]);

        try {
            foreach ($request->input('orden') as $item) {
                ServicioVario::where('id', $item['id'])
                    ->update(['orden' => $item['position']]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Orden actualizado correctamente'
            ]);
        } catch (Exception $e) {
            Log::error('Error al actualizar orden: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Error al actualizar el orden. ' . $e->getMessage()
            ], 500);
        }
    }
}