<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('furniture')
        ->namespace('App\Http\Controllers\Furniture')
        ->group(function () {
            Route::get('/', IndexController::class);
        });
});