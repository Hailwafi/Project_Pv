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
            'token'    => 'required|numeric',
            'email'    => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Cek token dan email di database
        $passwordReset = DB::table('password_reset_tokens')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$passwordReset) 
        {
            return response()->json(['message' => 'Token reset password tidak valid.'], 422);
        }

        // Cek apakah token sudah expired (misalnya expired setelah 60 menit)
        if (Carbon::parse($passwordReset->created_at)->addMinutes(60)->isPast()) 
        {
            return response()->json(['message' => 'Token reset password telah expired.'], 422);
        }

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

        // Hapus token setelah reset password berhasil
        DB::table('password_reset_tokens')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password berhasil diubah.']);
    }
}
