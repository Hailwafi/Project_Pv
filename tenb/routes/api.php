<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    Route::get('/user', function (Request $request) {
    return $request->user();
    })->middleware('auth:api');

    // login
        Route::post('/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'index']);

    // lupa password
        Route::post('/forgot-password', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
        Route::post('/reset-password', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);
        
    // notifikasi
        Route::get('/notifications', function() {
            return auth()->user()->notifications;
        })->middleware('auth');

    // group route with middleware "auth"
        Route::group(['middleware' => 'auth:api'], function () {

    // logout
        Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
    });


// Admin
    Route::prefix('admin')->group(function () {
    //group route with middleware "auth:api"
        Route::group(['middleware' => 'auth:api'], function () {

        // group route with middleware "auth"
            Route::group(['middleware' => 'auth:api'], function () {
            // logout
                Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
            });

        // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        // dashboard
            Route::get('/dashboard', App\Http\Controllers\Api\Admin\DashboardController::class);

        //users
            Route::apiResource('/users', App\Http\Controllers\Api\Admin\UserController::class)
            ->middleware('permission:users.index|users.store|users.update|users.delete');

        //posts
            Route::apiResource('/posts', App\Http\Controllers\Api\Admin\PostController::class)
            ->middleware('permission:posts.index|posts.store|posts.update|posts.delete');

        // permissions
            Route::middleware(['auth:api', 'permission:permissions.index'])->group(function () 
            {
                Route::get('/permissions', [App\Http\Controllers\Api\Admin\PermissionController::class, 'index']);
                Route::get('/permissions/all', [App\Http\Controllers\Api\Admin\PermissionController::class, 'all']);
            });
                        
        // roles
            Route::apiResource('/roles', App\Http\Controllers\Api\Admin\RoleController::class)
            ->middleware('permission:roles.index|roles.store|roles.update|roles.delete');

        // roles all
            Route::get('/roles/all', [App\Http\Controllers\Api\Admin\RoleController::class, 'all'])
            ->middleware('permission:roles.index');

        // categories
            Route::apiResource('/categories', App\Http\Controllers\Api\Admin\CategoryController::class)
            ->middleware('permission:categories.index|categories.store|categories.update|categories.delete');

        // categories all
            Route::get('/categories/all', [App\Http\Controllers\Api\Admin\CategoryController::class, 'all'])
            ->middleware('permission:categories.index');

        // ticket pegawai
            Route::apiResource('/tickets', App\Http\Controllers\TicketController::class)
            ->middleware('permission:tickets.index|tickets.store|tickets.update|tickets.delete');

            Route::put('tickets/{id}/status', [App\Http\Controllers\TicketController::class, 'updateStatus'])
            ->middleware('permission:tickets.update-status');

            Route::put('tickets/{id}/assign', [App\Http\Controllers\TicketController::class, 'assignTicket'])
            ->middleware('permission:tickets.assign-ticket');

        // ticket publik
            Route::apiResource('/publiks', App\Http\Controllers\PublikController::class)
            ->middleware('permission:publiks.index|publiks.store|publiks.update|publiks.delete');

            Route::put('publiks/{id}/status', [App\Http\Controllers\PublikController::class, 'updateStatus'])
            ->middleware('permission:publiks.update-status');

            Route::put('publiks/{id}/assign', [App\Http\Controllers\PublikController::class, 'assignPublik'])
            ->middleware('permission:publiks.assign-ticket');           
    });
});

// Kepala Subbag
    Route::prefix('kepala_subbag')->group(function () {
    //group route with middleware "auth:api"
        Route::group(['middleware' => 'auth:api'], function () {

        // group route with middleware "auth"
            Route::group(['middleware' => 'auth:api'], function () {
            // logout
                Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
            });

        // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        // dashboard
            Route::get('/dashboard', App\Http\Controllers\Api\Admin\DashboardController::class);

        //users
            Route::apiResource('/users', App\Http\Controllers\Api\Admin\UserController::class)
            ->middleware('permission:users.create');

        //posts
            Route::apiResource('/posts', App\Http\Controllers\Api\Admin\PostController::class)
            ->middleware('permission:posts.index|posts.store|posts.update|posts.delete');

        // permissions
            Route::middleware(['auth:api', 'permission:permissions.index'])->group(function () 
            {
                Route::get('/permissions', [App\Http\Controllers\Api\Admin\PermissionController::class, 'index']);
                Route::get('/permissions/all', [App\Http\Controllers\Api\Admin\PermissionController::class, 'all']);
            });
                        
        // roles
            Route::apiResource('/roles', App\Http\Controllers\Api\Admin\RoleController::class)
            ->middleware('permission:roles.index|roles.store|roles.update|roles.delete');

        // roles all
            Route::get('/roles/all', [App\Http\Controllers\Api\Admin\RoleController::class, 'all'])
            ->middleware('permission:roles.index');

        // categories
            Route::apiResource('/categories', App\Http\Controllers\Api\Admin\CategoryController::class)
            ->middleware('permission:categories.index|categories.store|categories.update|categories.delete');

        // categories all
            Route::get('/categories/all', [App\Http\Controllers\Api\Admin\CategoryController::class, 'all'])
            ->middleware('permission:categories.index');

        // ticket pegawai
            Route::apiResource('/tickets', App\Http\Controllers\TicketController::class)
            ->middleware('permission:tickets.index|tickets.create|tickets.update|tickets.delete');

            Route::put('tickets/{id}/status', [App\Http\Controllers\TicketController::class, 'updateStatus'])
            ->middleware('permission:tickets.update-status');


            Route::put('tickets/{id}/assign', [App\Http\Controllers\TicketController::class, 'assignTicket'])
            ->middleware('permission:tickets.assign-ticket');

        // ticket publik
            Route::apiResource('/publiks', App\Http\Controllers\PublikController::class)
            ->middleware('permission:publiks.index|publiks.create|publiks.update|publiks.delete');

            Route::put('publiks/{id}/status', [App\Http\Controllers\PublikController::class, 'updateStatus'])
            ->middleware('permission:publiks.update-status');

            Route::put('publiks/{id}/assign', [App\Http\Controllers\PublikController::class, 'assignPublik'])
            ->middleware('permission:publiks.assign-ticket');           
    });
});

// Staf
    Route::prefix('staf')->group(function () {
    //group route with middleware "auth:api"
        Route::group(['middleware' => 'auth:api'], function () {

        // group route with middleware "auth"
            Route::group(['middleware' => 'auth:api'], function () {
            
            // logout
            Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
        });

       // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        //users
            Route::apiResource('/users', App\Http\Controllers\Api\Admin\UserController::class)
            ->middleware('permission:users.create');

        // ticket pegawai
            Route::put('tickets/{id}/status', [App\Http\Controllers\TicketController::class, 'updateStatus'])
            ->middleware('permission:tickets.update-status');

        // ticket publik
            Route::put('publiks/{id}/status', [App\Http\Controllers\PublikController::class, 'updateStatus'])
            ->middleware('permission:publiks.update-status');

        // bukti pengerjaan ticket pegawai dan publik
            Route::post('/tickets/{ticket}/proof-of-work', [App\Http\Controllers\ProofOfWorkController::class, 'store'])
            ->middleware('permission:proof_of_works.create');    
    });
});