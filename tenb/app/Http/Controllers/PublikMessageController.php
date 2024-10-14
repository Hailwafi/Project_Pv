<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PublikMessage;
use App\Models\Publik;
use App\Models\User;
use App\Http\Resources\PublikResource;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewTicketMessageNotification;
use Illuminate\Support\Facades\Validator;

class PublikMessageController extends Controller
{
    public function index($publikId)
    {
        $messages = PublikMessage::where('publik_id', $publikId)->get();
        return response()->json(['data' => $messages], 200);
    }

    public function store(Request $request, $publikId)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'message' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        // Dapatkan publik dan email pengirim
        $publik = Publik::findOrFail($publikId);
        $email = $publik->email; // Asumsi publik memiliki kolom email

        // Buat pesan baru
        $message = PublikMessage::create([
            'publik_id' => $publikId,
            'message'   => $request->message,
            'email'     => $email, // Menyimpan email
        ]);

        // Kirim notifikasi ke admin dan kepala subbag
        $adminAndkepala_subbagUsers = User::whereIn('role', ['admin', 'kepala_subbag'])->get();
        Notification::send($adminAndkepala_subbagUsers, new NewTicketMessageNotification($message, $publikId)); // Kirim publik_id

    // Respons dengan success true
    return response()->json(['success' => true, 'message' => 'Pesan berhasil dikirim.', 'data' => $message], 201);
    }
}
