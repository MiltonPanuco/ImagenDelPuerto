<?php

namespace App\Http\Controllers;

use App\Models\Eleccion;
use App\Models\Servicio;
use App\Models\Mision;
use App\Models\Vision;
use App\Models\Ofrecemos;

use Inertia\Inertia;
use Illuminate\Http\Request;

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
        return Inertia::render('gallery');
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}