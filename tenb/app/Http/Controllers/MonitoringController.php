<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class MonitoringController extends Controller
{
    public function pantauPekerjaan()
    {
        // Ambil semua staf dengan ID yang dimulai dari 3
        $staffs = User::where('role', 'staff')->where('id', '>=', 3)->get();

        // Format data untuk respons
        $formattedStaffs = $staffs->map(function ($staff)
        {
            return [
                'nama'  => $staff->username,
                'staff' => $staff->id
            ];
        });

        return response()->json($formattedStaffs);
    }
}
