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

        // Generate token numeric
        $token = rand(100000, 999999);

        // Simpan token ke tabel password_resets
        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->email],
            [
                'email'      => $request->email,
                'token'      => $token, // Simpan token sebagai angka
                'created_at' => Carbon::now(),
            ]
        );

        // Kirim token ke email user
        Mail::raw("Kode reset password Anda adalah: $token", function ($message) use ($request) {
            $message->to($request->email)
                ->subject('Reset Password Token');
        });

        return response()->json(['message' => 'Token reset password telah dikirim ke email.']);
    }
}

