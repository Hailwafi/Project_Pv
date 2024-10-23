<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProofOfWork;
use App\Models\User;

class StaffController extends Controller
{
    public function getStaffTasks($staffId)
    {
        // Ambil detail staff berdasarkan ID, jika role-nya adalah 'staff'
        $staff = User::where('id', $staffId)->where('role', 'staff')->first();

        if (!$staff) 
        {
            return response()->json([
                'success' => false,
                'message' => 'Staf tidak ditemukan atau bukan role staf.',
            ], 404);
        }

        // Ambil semua bukti pengerjaan yang terkait dengan staf berdasarkan staff_id
        $tasks = ProofOfWork::where('staff_id', $staffId)
            ->get()
            ->map(function ($task) 
            {
                if ($task->ticket_type === 'TicketPegawai') 
                {
                    return [
                        'tanggal'          => $task->tanggal,
                        'bukti_pengerjaan' => basename($task->bukti_pengerjaan), 
                        'kategori'         => $task->ticket->kategori ?? 'N/A',
                        'jenis_tiket'      => $task->ticket->jenis_tiket ?? 'N/A',
                        'status'           => $task->ticket->status ?? 'N/A',
                    ];
                } else if ($task->ticket_type === 'TicketPublik') 
                {
                    return [
                        'tanggal'          => $task->tanggal,
                        'bukti_pengerjaan' => basename($task->bukti_pengerjaan), 
                        'kategori'         => $task->publik->kategori ?? 'N/A',
                        'jenis_tiket'      => $task->publik->jenis_tiket ?? 'N/A',
                        'status'           => $task->publik->status ?? 'N/A',
                    ];
                }
                return null;
            });

        // Hitung total tugas yang sudah dikerjakan oleh staff (berdasarkan bukti pengerjaan)
            $totalTugas = $tasks->count();

        return response()->json([
            'success'    => true,
            'judul'      => 'Detail Staff ' . $staff->username . '',
            'total_tugas'=> $totalTugas, // Tambahkan total tugas di sini
            'data'       => $tasks->filter(),
        ]);
    }
}