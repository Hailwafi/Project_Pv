<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\ProofOfWork;
use App\Models\Ticket;
use App\Models\Publik;
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
            'nama_lengkap'     => 'required|string|max:20',
            'bukti_pengerjaan' => 'required|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'tanggal'          => 'required|date',
        ]);

        // Cek apakah tiket ada berdasarkan tipe tiket (TicketPegawai atau TicketPublik)
        if ($request->ticket_type === 'TicketPegawai')
        {
            // Cari tiket pegawai
            $ticket = Ticket::find($ticketId);
        } else if ($request->ticket_type === 'TicketPublik')
        {
            // Cari tiket publik
            $ticket = Publik::find($ticketId);
        }

        // Jika tiket tidak ditemukan, kembalikan error
        if (!$ticket)
        {
            return response()->json([
                'success' => false,
                'message' => 'Tiket tidak ditemukan atau belum dibuat.'
            ], 404);
        }

        // Simpan file bukti pengerjaan
        $filePath = $request->file('bukti_pengerjaan')->store('proof_of_work', 'public');

        // Buat bukti pengerjaan
        $proofOfWork = ProofOfWork::create([
            'ticket_id'        => $ticketId,
            'ticket_type'      => $request->ticket_type,
            'nama_lengkap'     => $request->nama_lengkap,
            'bukti_pengerjaan' => $filePath,
            'tanggal'          => $request->tanggal, // Simpan tanggal
            'staff_id'         => $request->user()->id // Menyimpan ID staf yang meng-upload
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
