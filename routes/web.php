<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

require __DIR__.'/auth.php';

Route::controller(TaskController::class)->middleware('auth')->group(function () {
    Route::get('/', 'index')->middleware('verified')->name('dashboard');
    Route::post('/task/create', 'create')->name('task.create');
    Route::patch('/task/{id}', 'update')->name('task.update');
    Route::get('/task/{id}', 'show')->name('task.show');
    Route::delete('/task/{id}', 'delete')->name('task.destroy');
});

Route::controller(ProfileController::class)->middleware('auth')->group(function () {
    Route::get('/profile', 'edit')->name('profile.edit');
    Route::patch('/profile', 'update')->name('profile.update');
    Route::delete('/profile', 'destroy')->name('profile.destroy');
});
