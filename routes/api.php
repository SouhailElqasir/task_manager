<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\taskTemplates;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\DeletedTaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('tasks',[TaskController::class,'index']);
Route::post('tasks',[TaskController::class,'store']);
Route::get('tasks/{task}',[TaskController::class,'show']);
Route::put('tasks/{task}',[TaskController::class,'update']);
Route::delete('tasks/{task}',[TaskController::class,'destroy']);
Route::get('/deletedTasks', [DeletedTaskController::class, 'index']);
Route::middleware('auth:api')->group(function () {
    Route::get('/my-tasks',[TaskController::class,'getMyTasks']);
});
Route::get('templates',[taskTemplates::class,'index']);
Route::post('templates',[taskTemplates::class,'store']);
Route::get('templates/{template}',[taskTemplates::class,'show']);
Route::put('templates/{template}',[taskTemplates::class,'update']);
Route::delete('templates/{template}',[taskTemplates::class,'destroy']);
Route::get('/tasksdone',[TaskController::class,'tasksDone']);
Route::get('/tasksundone',[TaskController::class,'tasksunDone']);
