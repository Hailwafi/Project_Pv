<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Cari user berdasarkan email
        $user = DB::table('users')->where('email', $request->email)->first();

        if (!$user)
        {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        // Ubah password user
        DB::table('users')->where('email', $request->email)->update([
            'password' => Hash::make($request->password)
        ]);

        return response()->json(['message' => 'Password berhasil diubah.']);
    }
}
