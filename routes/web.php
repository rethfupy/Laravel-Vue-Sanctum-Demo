<?php

use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('{any}', App\Http\Controllers\IndexController::class)
    ->where('any', '.*');
