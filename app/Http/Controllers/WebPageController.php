<?php

namespace App\Http\Controllers;

use App\Models\Servicio;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WebPageController extends Controller
{
    public function index()
    {
        $servicios = Servicio::where('activo', true)->get();

        return Inertia::render('home', [
            'servicios' => $servicios
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
