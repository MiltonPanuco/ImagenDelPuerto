<?php

namespace App\Http\Controllers;

use App\Models\Eleccion;
use App\Models\GaleriaRecuerdo;
use App\Models\Servicio;
use App\Models\Mision;
use App\Models\Vision;
use App\Models\Ofrecemos;
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
        $mision = Mision::where('activo', true)->limit(1)->get();
        $vision = Vision::where('activo', true)->limit(1)->get();
        $ofrecemos = Ofrecemos::where('activo', true)->limit(4)->get();

        return Inertia::render('about', [
            'mision' => $mision,
            'vision' => $vision,
            'ofrecemos' => $ofrecemos,
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
        $galeria->each(function ($item) {
            $item->image = Storage::url($item->image);
        });
        $carrusel->each(function ($item) {
            $item->image = Storage::url($item->image);
        });
        return Inertia::render('gallery', [
            'digitalMemories' => $galeria,
            'sliderGallery' => $carrusel,
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}
