<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ProofOfWork;
use App\Http\Resources\ProofOfWorkResource;
use App\Notifications\NewProofOfWorkNotification;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Log;

class ProofOfWorkController extends Controller
{
    public function store(Request $request, $ticketId)
    {
        // Validasi input
        $request->validate([
            'ticket_type'      => 'required|string|in:TicketPegawai,TicketPublik',
            'nama_lengkap'     => 'required|string|max:255',
            'nip'              => 'required|string',
        ]);

        // Buat bukti pengerjaan
        $proofOfWork = ProofOfWork::create([
            'ticket_id'        => $ticketId,
            'ticket_type'      => $request->ticket_type,
            'nama_lengkap'     => $request->nama_lengkap,
            'nip'              => $request->nip,
        ]);

        // Ambil user admin dan kepala subbag
        $admin_kepala_subbag = User::role(['admin', 'kepala_subbag'])->get();

        // Kirim notifikasi ke kepala subbag dan admin
        Notification::send($admin_kepala_subbag, new NewProofOfWorkNotification($proofOfWork));
        
        // Log untuk debugging (opsional)
        Log::info('Bukti pengerjaan berhasil dikirim', ['proof_of_work' => $proofOfWork]);

        return new ProofOfWorkResource(true, 'Bukti pengerjaan berhasil dikirim', $proofOfWork);
    }
}
