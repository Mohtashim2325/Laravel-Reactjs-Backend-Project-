<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TaskController;

// ========== AUTH ROUTES ==========
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Routes below require authentication
Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // ========== TASK ROUTES ==========
    Route::get('/tasks', [TaskController::class, 'index']);       // Get all tasks for logged-in user
    Route::post('/tasks', [TaskController::class, 'store']);      // Create new task
    Route::get('/tasks/{id}', [TaskController::class, 'show']); // Get single task
    Route::put('/tasks/{id}', [TaskController::class, 'update']); // Update task

    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']); // Delete task
    Route::post('/tasks/{id}/complete', [TaskController::class, 'complete']); // Mark task as complete

});
