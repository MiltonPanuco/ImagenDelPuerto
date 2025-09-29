<?php

namespace App\Http\Controllers;

use App\Models\Eleccion;
use App\Models\Servicio;

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
            'elecciones' => $elecciones
        ]);
    }

    public function about()
    {
        return Inertia::render('about');
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