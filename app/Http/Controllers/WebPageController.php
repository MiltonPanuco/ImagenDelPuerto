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
use App\Models\RentaEquipo;
use App\Models\Cita;
use App\Models\ServicioVario;
use App\Models\Social;
use App\Models\CarruselSection;
use App\Models\Quien;

use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WebPageController extends Controller
{
    public function index()
    {
        $carruselHome = $this->getCarrusel('home');
        $servicios = Servicio::where('activo', true)->limit(3)->get();
        $elecciones = Eleccion::where('activo', true)->limit(3)->get();
        $quienes = Quien::where('activo', true)->limit(6)->get();

        return Inertia::render('home', [
            'carruselHome' => $carruselHome,
            'servicios' => $servicios,
            'elecciones' => $elecciones,
            'quienes' => $quienes,
        ]);
    }

    public function about()
    {
        $carruselAbout = $this->getCarrusel('about');
        $mision = Mision::where('activo', true)->limit(2)->get();
        $ofrecemos = Ofrecemos::where('activo', true)->limit(4)->get();
        $estadisticas = Estadisticas::where('activo', true)->limit(2)->get();

        return Inertia::render('about', [
            'carruselAbout' => $carruselAbout,
            'mision' => $mision,
            'ofrecemos' => $ofrecemos,
            'estadisticas' => $estadisticas,
        ]);
    }

    public function service()
    {
        $carruselService = $this->getCarrusel('service');
        
        $serviciovario = ServicioVario::where('activo', true)
            ->orderBy('orden', 'asc')
            ->get();
        
        foreach ($serviciovario as $servicio) {
            if (!empty($servicio->imagenes)) {
                $servicio->imagenes = array_map(function($imagen) {
                    return asset('storage/' . $imagen);
                }, $servicio->imagenes);
            }
        }

        $rentaequipos = RentaEquipo::where('activo', true)
            ->orderBy('orden', 'asc')
            ->get();
        
        foreach ($rentaequipos as $equipo) {
            if (!empty($equipo->images)) {
                $equipo->images = array_map(function($imagen) {
                    return asset('storage/' . $imagen);
                }, $equipo->images);
            }
        }

        return Inertia::render('service', [
            'carruselService' => $carruselService,
            'serviciovario' => $serviciovario,
            'rentaequipos' => $rentaequipos,
        ]);
    }

    public function gallery()
    {
        $carruselGallery = $this->getCarrusel('gallery');
        
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
            'carruselGallery' => $carruselGallery,
            'digitalMemories' => $galeria,
            'sliderGallery' => $carrusel,
            'secciones' => $equipamiento
        ]);
    }

    public function contact()
    {
        $carruselContact = $this->getCarrusel('contact');
        $atencion = Atencion::where('activo', true)->limit(6)->get();
        $citas = Cita::where('activo', true)->limit(2)->get();
        $sociales = Social::where('activo', true)->limit(2)->get();

        return Inertia::render('contact', [
            'carruselContact' => $carruselContact,
            'atencion' => $atencion,
            'citas' => $citas,
            'sociales' => $sociales
        ]);
    }

    /* Método reutilizable para obtener carrusel de cualquier sección*/
    private function getCarrusel($section) 
    {
        return CarruselSection::section($section)
            ->active()
            ->ordered()
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'image' => $item->image ? '/storage/' . $item->image : null,  
                    'title1' => $item->title1,
                    'title2' => $item->title2,
                    'description' => $item->description,
                    'activo' => $item->activo,
                ];
            });
    }
}