<?php

use App\Http\Controllers\WebPageController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [WebPageController::class, 'index'])->name('home');

Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/service', function () {
    return Inertia::render('service');
})->name('service');

Route::get('/gallery', function () {
    return Inertia::render('gallery');
})->name('gallery');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');
