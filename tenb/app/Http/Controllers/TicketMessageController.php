<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TicketMessage;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Notification;
use App\Notifications\NewTicketMessageNotification;
use Illuminate\Support\Facades\Validator;

class TicketMessageController extends Controller
{
    public function index($ticketId)
    {
        $messages = TicketMessage::where('ticket_id', $ticketId)->get();
        return response()->json(['data' => $messages], 200);
    }

    public function store(Request $request, $ticketId)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'message' => 'required|string',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        // Dapatkan tiket dan email pengirim
        $ticket = Ticket::findOrFail($ticketId);
        $email = $ticket->email; // Asumsi tiket memiliki kolom email

        // Buat pesan baru
        $message = TicketMessage::create([
            'ticket_id' => $ticketId,
            'message'   => $request->message,
            'email'     => $email, // Menyimpan email
        ]);

        // Kirim notifikasi ke admin dan kepala subbag
        $adminAndkepala_subbagUsers = User::whereIn('role', ['admin', 'kepala_subbag'])->get();
        Notification::send($adminAndkepala_subbagUsers, new NewTicketMessageNotification($message));

    // Respons dengan success true
    return response()->json(['success' => true, 'message' => 'Pesan berhasil dikirim.', 'data' => $message], 201);
    }
}
