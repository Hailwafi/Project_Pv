<?php

namespace App\Http\Controllers\Api\Staff;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Ticket;
use App\Models\Publik;
use App\Models\ProofOfWork;

class DashboardStaffController extends Controller
{
    public function getStaffDashboard()
    {
        $staff = Auth::user();

        // Total tiket pegawai yang sudah ditugaskan dari masing-masing staff
        $jumlahTiketPegawai = Ticket::where('assigned_to', $staff->id)->count();

        // Total tiket publik yang sudah ditugaskan dari masing-masing staff
        $jumlahTiketPublik = Publik::where('assigned_to', $staff->id)->count();

        // Total bukti pengerjaan yang sudah dikirim dari masing-masing staff
        $totalBuktiPengerjaan = ProofOfWork::where('staff_id', $staff->id)->count();

        // Menghitung total seluruh tiket yang ditugaskan (pegawai + publik - bukti pengerjaan)
        $totalTugas = $jumlahTiketPegawai + $jumlahTiketPublik - $totalBuktiPengerjaan;

        return response()->json([
            'success'                   => true,
            'judul'                     => 'Dashboard Staff ' . $staff->username,
            'jumlah_tiket_pegawai_bnpt' => $jumlahTiketPegawai,  
            'jumlah_tiket_publik'       => $jumlahTiketPublik,  
            'total_tugas'               => $totalTugas, 
            'tiket_selesai'             => $totalBuktiPengerjaan,
        ]);
    }
}