<?php

use App\Http\Controllers\Cms\EleccionController;
use App\Http\Controllers\Cms\Galeria\GaleriaRecuerdosController;
use App\Http\Controllers\Cms\Galeria\GaleriaEquipamientoController;
use App\Http\Controllers\Cms\ServicioController;
use App\Http\Controllers\Cms\ServicioVarioController;
use App\Http\Controllers\Cms\MisionController;
use App\Http\Controllers\Cms\OfrecemosController;
use App\Http\Controllers\Cms\EstadisticasController;
use App\Http\Controllers\Cms\CitaController;
use App\Http\Controllers\Cms\DataController;
use App\Http\Controllers\Cms\Galeria\GaleriaEquipamientoEquipoController;
use App\Http\Controllers\Cms\AtencionController;
use App\Http\Controllers\Cms\CarruselSectionController;
use App\Http\Controllers\WebPageController;
use App\Http\Controllers\Cms\SocialController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/** Páginas Públicas */
Route::get('/', [WebPageController::class, 'index'])->name('home');
Route::get('/about', [WebPageController::class, 'about'])->name('about');
Route::get('/service', [WebPageController::class, 'service'])->name('service');
Route::get('/gallery', [WebPageController::class, 'gallery'])->name('gallery');
Route::get('/contact', [WebPageController::class, 'contact'])->name('contact');

/** CMS */
Route::middleware('auth')->group(function () {
    Route::group(['prefix' => 'admin'], function () {
        Route::get('dashboard', function () {
            return Inertia::render('dashboard');
        })->name('dashboard');


            /** CARRUSEL GENÉRICO */
            
            Route::prefix('carrusel')->name('cms.carrusel.')->group(function () {
            
            // Listar items de una sección
            Route::get('{section}', [CarruselSectionController::class, 'index'])->name('index');
            // Mostrar formulario para crear
            Route::get('{section}/create', [CarruselSectionController::class, 'create'])->name('create');
            // Guardar nuevo item
            Route::post('{section}', [CarruselSectionController::class, 'store'])->name('store');
            // Mostrar formulario para editar
            Route::get('{section}/{id}/edit', [CarruselSectionController::class, 'edit'])->name('edit');
            // Actualizar item
            Route::post('{section}/{id}', [CarruselSectionController::class, 'update'])->name('update');
            // Eliminar item
            Route::delete('{section}/{id}', [CarruselSectionController::class, 'destroy'])->name('destroy');
            // Toggle activo/inactivo
            Route::patch('{section}/{id}/activo', [CarruselSectionController::class, 'toggleActivo'])->name('activo');
            // Reordenar items
            Route::post('{section}/reorder', [CarruselSectionController::class, 'reorder'])->name('reorder');
            // Ruta para obtener carruseles en el frontend 
            Route::get('/carrusel/{section}', [CarruselSectionController::class, 'getForFrontend'])
                ->name('frontend.carrusel');
        });


        /** HOME */

        /** Servicios */
        Route::resource('servicios', ServicioController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.servicios');
        Route::patch('servicios/{servicio}/activo', [ServicioController::class, 'toggleActivo'])->name('cms.servicios.activo');

        /** Elecciones */
        Route::resource('eleccion', EleccionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.eleccion');
        Route::patch('eleccion/{eleccion}/activo', [EleccionController::class, 'toggleActivo'])->name('cms.eleccion.activo');


        /** ABOUT */

        /** Misión */
        Route::resource('mision', MisionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.mision');
        Route::patch('mision/{mision}/activo', [MisionController::class, 'toggleActivo'])->name('cms.mision.activo');

        /** Ofrecemos */
        Route::resource('ofrecemos', OfrecemosController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
            ->parameters(['ofrecemos' => 'ofrecemos']) 
            ->names('cms.ofrecemos');
        Route::patch('ofrecemos/{ofrecemos}/activo', [OfrecemosController::class, 'toggleActivo'])->name('cms.ofrecemos.activo');
        
        /** Estadisticas */
        Route::resource('estadisticas', EstadisticasController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.estadisticas');
        Route::patch('estadisticas/{estadistica}/activo', [EstadisticasController::class, 'toggleActivo'])->name('cms.estadisticas.activo');

        
        /** GALLERY */

        Route::resource('galeria/recuerdos', GaleriaRecuerdosController::class)->only(['index', 'create', 'store', 'update', 'destroy'])->names('cms.galeria.recuerdos');
        Route::patch('galeria/recuerdos/{id}/{field}', [GaleriaRecuerdosController::class, 'updateField'])->name('cms.galeria.recuerdos.field');

        Route::resource('galeria/equipamiento', GaleriaEquipamientoController::class)->only(['index', 'edit', 'create', 'store', 'update', 'destroy'])->names('cms.galeria.equipamiento');
        Route::patch('galeria/equipamiento/{equipamiento}/activo', [GaleriaEquipamientoController::class, 'toggleActivo'])->name('cms.galeria.equipamiento.activo');

        /**
         * Es lo mismo que poner -> resource(galeria/equipamiento/{equipamiento}/equipos)
         *
         *  Ejemplo de ruta
         *  DELETE: admin/galeria/equipamiento/{equipamiento}/equipos/{equipo} -> dos variables
         */
        Route::resource('galeria/equipamiento.equipos', GaleriaEquipamientoEquipoController::class)
            ->only(['create', 'store', 'edit', 'update', 'destroy'])
            ->names('cms.galeria.equipamiento.equipo');
        Route::patch('galeria/equipamiento/{equipamiento}/equipos/{equipo}/activo', [GaleriaEquipamientoEquipoController::class, 'toggleActivo'])->name('cms.galeria.equipamiento.equipo.activo');
        Route::post('galeria/equipamiento/{equipamiento}/equipos/{equipo}/replaceImage', [GaleriaEquipamientoEquipoController::class, 'replaceImage'])->name('cms.galeria.equipamiento.equipo.replaceImage');
    

        /** SERVICE */

        /** Servicios Varios */
        Route::resource('servicios-varios', ServicioVarioController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.servicios-varios');
        Route::patch('servicios-varios/{serviciosVario}/activo', [ServicioVarioController::class, 'toggleActivo'])->name('cms.servicios-varios.activo');


        /** CONTACT */

        /** Atención */
        Route::resource('atencion', AtencionController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
            ->names('cms.atencion');
        Route::patch('atencion/{atencion}/activo', [AtencionController::class, 'toggleActivo'])
            ->name('cms.atencion.activo');

        /** Citas */
        Route::resource('citas', CitaController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.citas');
        Route::patch('citas/{cita}/activo', [CitaController::class, 'toggleActivo'])->name('cms.citas.activo');

         /** Sociales */
        Route::resource('sociales', SocialController::class)
            ->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])
            ->parameters(['sociales' => 'social'])
            ->names('cms.sociales');
        Route::patch('sociales/{social}/activo', [SocialController::class, 'toggleActivo'])
            ->name('cms.sociales.activo');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';