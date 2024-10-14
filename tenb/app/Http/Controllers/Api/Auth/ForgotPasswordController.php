<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Cari user berdasarkan email
        $user = DB::table('users')->where('email', $request->email)->first();

        if (!$user)
        {
            return response()->json(['message' => 'Email tidak ditemukan'], 404);
        }

        // Simpan email ke session
        session(['reset_email' => $request->email]);

        // Arahkan ke halaman buat password baru
        return response()->json(['message' => 'Silakan buat password baru.'], 200);
    }
}
