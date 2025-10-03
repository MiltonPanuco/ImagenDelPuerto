<?php

use App\Http\Controllers\Cms\EleccionController;
use App\Http\Controllers\Cms\Galeria\GaleriaRecuerdosController;
use App\Http\Controllers\Cms\ServicioController;
use App\Http\Controllers\Cms\MisionController;
use App\Http\Controllers\Cms\VisionController;
use App\Http\Controllers\Cms\OfrecemosController;
use App\Http\Controllers\Cms\EstadisticasController;
use App\Http\Controllers\Cms\DataController;

use App\Http\Controllers\WebPageController;
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


        /** HOME  */

        /** Servicios */
        Route::resource('servicios', ServicioController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.servicios');
        Route::patch('servicios/{servicio}/activo', [ServicioController::class, 'toggleActivo'])->name('cms.servicios.activo');

        /** Elecciones */
        Route::resource('eleccion', EleccionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.eleccion');
        Route::patch('eleccion/{eleccion}/activo', [EleccionController::class, 'toggleActivo'])->name('cms.eleccion.activo');


        /** ABOUT  */

        /** Misión */
        Route::resource('mision', MisionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.mision');
        Route::patch('mision/{mision}/activo', [MisionController::class, 'toggleActivo'])->name('cms.mision.activo');

        /** Vision */
        Route::resource('vision', VisionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.vision');
        Route::patch('vision/{vision}/activo', [VisionController::class, 'toggleActivo'])->name('cms.vision.activo');

        /** Ofrecemos */
        Route::resource('admin/ofrecemos', OfrecemosController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.ofrecemos');
        Route::patch('admin/ofrecemos/{ofrecemos}/activo', [OfrecemosController::class, 'toggleActivo'])->name('cms.ofrecemos.activo');

         /** Estadisticas */
        Route::resource('admin/estadisticas', EstadisticasController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.estadisticas');
        Route::patch('admin/estadisticas/{estadistica}/activo', [EstadisticasController::class, 'toggleActivo'])->name('cms.estadisticas.activo');

        /** GALLERY */

        Route::resource('galeria/recuerdos', GaleriaRecuerdosController::class)->only(['index', 'create', 'store', 'update', 'destroy'])->names('cms.galeria.recuerdos');
        Route::patch('galeria/recuerdos/{id}/{field}', [GaleriaRecuerdosController::class, 'updateField'])->name('cms.galeria.recuerdos.field');
    });
});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
