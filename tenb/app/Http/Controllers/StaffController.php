<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProofOfWork;

class StaffController extends Controller
{
    public function getStaffTasks($staffId)
    {
        // Ambil semua bukti pengerjaan yang terkait dengan staf berdasarkan staff_id
        $tasks = ProofOfWork::where('staff_id', $staffId)
            ->get()
            ->map(function ($task)
            {
                // Cek apakah tiket ini dari TicketPegawai atau TicketPublik berdasarkan ticket_type
                if ($task->ticket_type === 'TicketPegawai')
                {
                    return [
                        'tanggal'          => $task->tanggal,
                        'bukti_pengerjaan' => $task->bukti_pengerjaan,
                        'kategori'         => $task->ticket->kategori ?? 'N/A', // Ambil kategori dari tiket pegawai
                        'jenis_tiket'      => $task->ticket->jenis_tiket ?? 'N/A', // Ambil jenis tiket pegawai
                        'status'           => $task->ticket->status ?? 'N/A', // Ambil status tiket pegawai
                    ];
                } else if ($task->ticket_type === 'TicketPublik')
                {
                    return [
                        'tanggal'          => $task->tanggal,
                        'bukti_pengerjaan' => $task->bukti_pengerjaan,
                        'kategori'         => $task->publik->kategori ?? 'N/A', // Ambil kategori dari tiket publik
                        'jenis_tiket'      => $task->publik->jenis_tiket ?? 'N/A', // Ambil jenis tiket publik
                        'status'           => $task->publik->status ?? 'N/A', // Ambil status tiket publik
                    ];
                }
                return null;
            });

        return response()->json([
            'success' => true,
            'message' => 'Detail tugas staf berhasil ditemukan.',
            'data'    => $tasks->filter(), // Filter untuk menghilangkan null values
]);
}
}
