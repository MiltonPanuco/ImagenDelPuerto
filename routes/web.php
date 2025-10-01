<?php

use App\Http\Controllers\Cms\EleccionController;
use App\Http\Controllers\Cms\ServicioController;
use App\Http\Controllers\Cms\MisionController;
use App\Http\Controllers\Cms\VisionController;
use App\Http\Controllers\Cms\OfrecemosController;
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
    Route::get('admin/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    /** HOME  */

    /** Servicios */
    Route::resource('admin/servicios', ServicioController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.servicios');
    Route::patch('admin/servicios/{servicio}/activo', [ServicioController::class, 'toggleActivo'])->name('cms.servicios.activo');

    /** Elecciones */
    Route::resource('admin/eleccion', EleccionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.eleccion');
    Route::patch('admin/eleccion/{eleccion}/activo', [EleccionController::class, 'toggleActivo'])->name('cms.eleccion.activo');


    /** ABOUT  */

    /** Misión */
    Route::resource('admin/mision', MisionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.mision');
    Route::patch('admin/mision/{mision}/activo', [MisionController::class, 'toggleActivo'])->name('cms.mision.activo');

    /** Vision */
    Route::resource('admin/vision', VisionController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.vision');
    Route::patch('admin/vision/{vision}/activo', [VisionController::class, 'toggleActivo'])->name('cms.vision.activo');

    /** Ofrecemos */
    Route::resource('admin/ofrecemos', OfrecemosController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.ofrecemos');
    Route::patch('admin/ofrecemos/{ofrecemos}/activo', [OfrecemosController::class, 'toggleActivo'])->name('cms.ofrecemos.activo');

    /** Ofrecemos */
    Route::resource('admin/ofrecemos', OfrecemosController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy'])->names('cms.ofrecemos');
    Route::patch('admin/ofrecemos/{ofrecemos}/activo', [OfrecemosController::class, 'toggleActivo'])->name('cms.ofrecemos.activo');

});

require __DIR__.'/auth.php';
require __DIR__.'/settings.php';
