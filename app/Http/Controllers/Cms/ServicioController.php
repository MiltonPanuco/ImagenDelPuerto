<?php

namespace App\Http\Controllers\Cms;

use App\Http\Controllers\Controller;
use App\Models\Servicio;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\HttpException;
class ServicioController extends Controller
{
    public function index()
    {
        $servicios = Servicio::select('id', 'servicio as nombre', 'activo', 'descripcion')
            ->paginate(10);

        return Inertia::render('cms/servicios/index', [
            'servicios' => $servicios
        ]);
    }

    /** Formulario para editar */
    public function edit(Servicio $servicio)
    {
        $servicio->color = 'bg-' . $servicio->color . '-500'; // Agregar prefijo y sufijo para el color
        return Inertia::render('cms/servicios/formServicio', [
            'servicio' => $servicio
        ]);
    }

    public function update(Servicio $servicio)
    {
        $data = request()->validate([
            'servicio'       => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'icon'           => 'required|string|max:100',
            'color'          => 'required|string|max:50',
            'categoria'      => 'required|string|max:255',
            'caracteristicas'=> 'nullable|array',
            'activo'         => 'boolean',
        ], [
            'servicio.required'  => 'El nombre del servicio es obligatorio.',
            'servicio.max'       => 'El nombre del servicio no debe exceder los 255 caracteres.',
            'icon.max'           => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'          => 'El nombre del color no debe exceder los 50 caracteres.',
            'categoria.required' => 'La categoría es obligatoria.',
            'categoria.max'      => 'La categoría no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        Log::info('Datos recibidos para actualizar servicio ID '.$servicio->id.': ', $data);
        try {
            // Si el color tiene el prefijo 'bg-', extraer solo el color; si no, dejarlo igual
            if (strpos($data['color'], 'bg-') === 0) {
                $data['color'] = explode('-', $data['color'])[1];
            }
            $servicio->update($data);
            /**
             * Regresar al formulario por si quiere seguir editando el mismo servicio
             * sweetalert le confirma que sí se actualizó
             */
            return back()->with('success', 'Servicio actualizado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al actualizar el servicio. '. $e->getMessage()])->withInput();
        }
    }

    /** Formulario para crear */
    public function create()
    {
        return Inertia::render('cms/servicios/formServicio', ['servicio' => new Servicio()]);
    }

    /** Registrar servicio */
    public function store()
    {
        $data = request()->validate([
            'servicio'       => 'required|string|max:255',
            'descripcion'    => 'required|string',
            'icon'           => 'required|string|max:100',
            'color'          => 'required|string|max:50',
            'categoria'      => 'required|string|max:255',
            'caracteristicas'=> 'nullable|array',
            'activo'         => 'boolean',
        ], [
            'servicio.required'  => 'El nombre del servicio es obligatorio.',
            'servicio.max'       => 'El nombre del servicio no debe exceder los 255 caracteres.',
            'icon.max'           => 'El nombre del ícono no debe exceder los 100 caracteres.',
            'color.max'          => 'El nombre del color no debe exceder los 50 caracteres.',
            'categoria.required' => 'La categoría es obligatoria.',
            'categoria.max'      => 'La categoría no debe exceder los 255 caracteres.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'color.required'    => 'El color es obligatorio.',
            'icon.required'     => 'El ícono es obligatorio.',
        ]);

        // Si 'activo' no viene (checkbox no marcado), forzar false
        $data['activo'] = $data['activo'] ?? false;

        Log::info('Datos recibidos para crear servicio: ', $data);
        try {
            $data['color'] = explode('-', $data['color'])[1]; // Extraer solo el color sin el prefijo 'bg-'
            Servicio::create($data);
            return redirect()->route('cms.servicios.index')->with('success', 'Servicio creado correctamente');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error al crear el servicio. '. $e->getMessage()])->withInput();
        }
    }

    public function destroy(Servicio $servicio)
    {
        try {
            $servicio->delete();
            return response()->json(['message' => 'Servicio eliminado correctamente'], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }

    public function toggleActivo(Servicio $servicio)
    {
        try {
            $servicio->activo = !$servicio->activo;
            $servicio->save();
            return response()->json(['activo' => $servicio->activo], 200);
        } catch (Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }
}
