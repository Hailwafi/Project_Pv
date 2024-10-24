<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

    Route::get('/user', function (Request $request) {
    return $request->user();
    })->middleware('auth:api');

    // login
        Route::post('/login', [App\Http\Controllers\Api\Auth\LoginController::class, 'index']);

    // notifikasi
        Route::get('/notifications', function() {
            return auth()->user()->notifications;
        })->middleware('auth');

    // group route with middleware "auth"
        Route::group(['middleware' => 'auth:api'], function () {

        // logout
            Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);
    });

        // lupa password
            Route::post('/forgot-password', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
            Route::post('/reset-password', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);

    // ticket pegawai
        Route::get('/tickets', [App\Http\Controllers\TicketController::class, 'index']);

        Route::post('/tickets', [App\Http\Controllers\TicketController::class, 'store']);

        Route::get('/tickets/{id}', [App\Http\Controllers\TicketController::class, 'show']);

    // ticket publik
        Route::get('/publiks', [App\Http\Controllers\PublikController::class, 'index']);

        Route::post('/publiks', [App\Http\Controllers\PublikController::class, 'store']);

        Route::get('/publiks/{id}', [App\Http\Controllers\PublikController::class, 'show']);

    // search ticket
        Route::post('/search-ticket', [App\Http\Controllers\SearchController::class, 'searchTicket']);

    // pesan ticket pegawai
        Route::get('/tickets/{ticketId}/messages', [App\Http\Controllers\TicketMessageController::class, 'index']);
        Route::post('/tickets/{ticketId}/messages', [App\Http\Controllers\TicketMessageController::class, 'store']);

    // pesan ticket publik
        Route::get('/publiks/{publikId}/messages', [App\Http\Controllers\PublikMessageController::class, 'index']);
        Route::post('/publiks/{publikId}/messages', [App\Http\Controllers\PublikMessageController::class, 'store']);

// Admin
    Route::prefix('admin')->group(function () {
    //group route with middleware "auth:api"
        Route::group(['middleware' => 'auth:api'], function () {

        // logout
                Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

        // lupa password
        Route::post('/forgot-password', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
        Route::post('/reset-password', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);

        // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        // pantau pekerjaan
            Route::get('/pantau-pekerjaan', [App\Http\Controllers\MonitoringController::class, 'pantauPekerjaan'])->middleware('auth:api');

        // detail staff
            Route::get('/staff-tasks/{staffId}', [App\Http\Controllers\StaffController::class, 'getStaffTasks']);

        // daftar staff
            Route::get('/staff-list', [App\Http\Controllers\Api\Admin\UserController::class, 'getStaffList']);

        // search users
            Route::get('/users/search', [App\Http\Controllers\Api\Admin\UserController::class, 'search']);

        // memunculkan semua tiket pegawai & publik
            Route::get('/tickets/pegawai/new', [App\Http\Controllers\TicketController::class, 'getNewPegawaiTickets']);
            Route::get('/publiks/publik/new', [App\Http\Controllers\PublikController::class, 'getNewPublikPubliks']);

        // search tiket berdasarkan nama
            Route::get('search/tickets', [App\Http\Controllers\TicketController::class, 'search']);
            Route::get('search/publik-tickets', [App\Http\Controllers\PublikController::class, 'search']);

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

        // logout
                Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

        // lupa password
        Route::post('/forgot-password', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
        Route::post('/reset-password', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);

        // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        // pantau pekerjaan
            Route::get('/pantau-pekerjaan', [App\Http\Controllers\MonitoringController::class, 'pantauPekerjaan'])->middleware('auth:api');

        // detail staff
            Route::get('/staff-tasks/{staffId}', [App\Http\Controllers\StaffController::class, 'getStaffTasks']);

        // daftar staff
            Route::get('/staff-list', [App\Http\Controllers\Api\Admin\UserController::class, 'getStaffList']);

        // memunculkan semua tiket pegawai & publik
            Route::get('/tickets/pegawai/new', [App\Http\Controllers\TicketController::class, 'getNewPegawaiTickets']);
            Route::get('/publiks/publik/new', [App\Http\Controllers\PublikController::class, 'getNewPublikPubliks']);

        // search tiket berdasarkan nama
            Route::get('search/tickets', [App\Http\Controllers\TicketController::class, 'search']);
            Route::get('search/publik-tickets', [App\Http\Controllers\PublikController::class, 'search']);

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

// Staff
    Route::prefix('staff')->group(function () {
    //group route with middleware "auth:api"
        Route::group(['middleware' => 'auth:api'], function () {

        // logout
            Route::post('/logout', [App\Http\Controllers\Api\Auth\LoginController::class, 'logout']);

        // lupa password
            Route::post('/forgot-password', [App\Http\Controllers\Api\Auth\ForgotPasswordController::class, 'sendResetLinkEmail']);
            Route::post('/reset-password', [App\Http\Controllers\Api\Auth\ResetPasswordController::class, 'reset']);

        // notifikasi
            Route::get('/notifications', function() {
                return auth()->user()->notifications;
            })->middleware('auth');

        // dashboard staff
            Route::get('/staff-dashboard', [App\Http\Controllers\Api\Staff\DashboardStaffController::class, 'getStaffDashboard']);

        // tiket staff berdasarkan ditugaskan
                Route::get('/staff-tickets', [App\Http\Controllers\StaffTicketController::class, 'index']);

        //users
            Route::apiResource('/users', App\Http\Controllers\Api\Admin\UserController::class)
            ->middleware('permission:users.create');

        // ticket pegawai
            Route::put('tickets/{id}/status', [App\Http\Controllers\TicketController::class, 'updateStatus'])
            ->middleware('permission:tickets.update-status');

        // ticket publik
            Route::put('publiks/{id}/status', [App\Http\Controllers\PublikController::class, 'updateStatus'])
            ->middleware('permission:publiks.update-status');

        // bukti pengerjaan ticket pegawai
            Route::post('/tickets/{ticket}/proof-of-work', [App\Http\Controllers\ProofOfWorkController::class, 'store'])
            ->middleware('permission:proof_of_works.create');

        // bukti pengerjaan ticket publik
        Route::post('/publiks/{publik}/proof-of-work', [App\Http\Controllers\ProofOfWorkController::class, 'store'])
        ->middleware('permission:proof_of_works.create');

        // search tiket berdasarkan nama
        Route::get('search/tickets', [App\Http\Controllers\TicketController::class, 'search']);
        Route::get('search/publik-tickets', [App\Http\Controllers\PublikController::class, 'search']);
    });
});
