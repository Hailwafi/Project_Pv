<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    // Mendapatkan profil pengguna
    public function getProfile()
    {
        $user = Auth::user();
        $user->profile_picture_url = $user->profile_picture ? Storage::url($user->profile_picture) : null;

        return response()->json([
            'status' => 'success true',
            'data'  => [
                'username'            => $user->username,
                'email'               => $user->email,
                'role'                => $user->role,
                'profile_picture_url' => $user->profile_picture_url,
            ]
        ]);
    }

    // Mengganti foto profil pengguna
    public function changeProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg|max:2048', // validasi file gambar
        ]);

        $user = Auth::user();

        // Hapus gambar lama jika ada
        if ($user->profile_picture) 
        {
            Storage::disk('public')->delete($user->profile_picture);
        }

        // Simpan gambar baru
        $path = $request->file('profile_picture')->store('profile_pictures', 'public');
        $user->profile_picture = $path;
        $user->save();

        return response()->json([
            'status'              => 'success true',
            'message'             => 'Profile berhasil diubah',
            'profile_picture_url' => Storage::url($path),
        ]);
    }
}