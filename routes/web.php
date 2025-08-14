<?php

use Illuminate\Support\Facades\Route;

// Serve React app for the root
Route::view('/', 'app')->name('home');

// Serve React app for any non-API route
Route::view('/{path}', 'app')
    ->where('path', '^(?!api).*')
    ->name('react');

    Route::get('/register', function () {
    return Inertia\Inertia::render('Register');
});
