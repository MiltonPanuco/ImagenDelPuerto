<?php

namespace App\Http\Controllers;

use App\Models\Eleccion;
use App\Models\GaleriaEquipamiento;
use App\Models\GaleriaRecuerdo;
use App\Models\Servicio;
use App\Models\Mision;
use App\Models\Ofrecemos;
use App\Models\Atencion;
use App\Models\Estadisticas;
use App\Models\Cita;
use App\Models\Social;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebPageController extends Controller
{
    public function index()
    {
        $servicios = Servicio::where('activo', true)->limit(3)->get();
        $elecciones = Eleccion::where('activo', true)->limit(3)->get();

        return Inertia::render('home', [
            'servicios' => $servicios,
            'elecciones' => $elecciones,
        ]);
    }

    public function about()
    {
        $mision = Mision::where('activo', true)->limit(2)->get();
        $ofrecemos = Ofrecemos::where('activo', true)->limit(4)->get();
        $estadisticas = Estadisticas::where('activo', true)->limit(2)->get();

        return Inertia::render('about', [
            'mision' => $mision,
            'ofrecemos' => $ofrecemos,
            'estadisticas' => $estadisticas,
        ]);
    }

    public function service()
    {
        return Inertia::render('service');
    }

    public function gallery()
    {
        $galeria = GaleriaRecuerdo::where('activo', true)->where('carrete', false)
            ->select('id', 'title', 'date', 'src as image')
            ->get();

        $carrusel = GaleriaRecuerdo::where('activo', true)->where('carrete', true)
            ->select('title', 'src as image', 'descripcion as description')
            ->limit(5)
            ->get();
        foreach ($galeria as $item) {
            $item->image = Storage::url($item->image);
        }
        foreach ($carrusel as $item) {
            $item->image = Storage::url($item->image);
        }

        $equipamiento = GaleriaEquipamiento::with(['equipos' => function ($q) {
                $q->where('activo', true)
                    ->select('id', 'id_galeria_equipamiento', 'icon', 'servicio', 'descripcion', 'caracteristicas', 'image', 'color')
                    ->orderBy('orden', 'asc');
            }])
            ->where('activo', true)
            ->select('id', 'categoria', 'titulo', 'subtitulo', 'descripcion')
            ->orderBy('orden', 'asc')
            ->get();

        foreach ($equipamiento as $item) {
            foreach ($item->equipos as $card) {
                if (!empty($card->image)) {
                    $card->image = Storage::url($card->image);
                }
            }
        }

        return Inertia::render('gallery', [
            'digitalMemories' => $galeria,
            'sliderGallery' => $carrusel,
            'secciones' => $equipamiento
        ]);
    }

    public function contact()
    {
        
        $atencion = Atencion::where('activo', true)->limit(6)->get();
        $citas = Cita::where('activo', true)->limit(2)->get();
        $sociales = Social::where('activo', true)->limit(2)->get();

        return Inertia::render('contact', [
            'atencion' => $atencion,
            'citas' => $citas,
            'sociales' => $sociales
        ]);
    }
}
