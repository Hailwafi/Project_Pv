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
        ->with(['ticket', 'publik']) // Eager load untuk mengambil tiket terkait
        ->get()
        ->map(function($task) {
            return [
                'tanggal' => $task->tanggal,
                'bukti_pengerjaan' => $task->bukti_pengerjaan,
                'kategori' => $task->ticket->kategori ?? $task->publik->kategori, // Ambil kategori dari tiket atau publik
                'jenis_tiket' => $task->ticket->jenis_tiket ?? $task->publik->jenis_tiket, // Ambil jenis tiket
                'status' => $task->ticket->status ?? $task->publik->status, // Ambil status
            ];
        });

    return response()->json([
        'success' => true,
        'message' => 'Detail tugas staf berhasil ditemukan.',
        'data' => $tasks,
    ]);
}

}