<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Publik;

class SearchController extends Controller
{
    public function searchTicket($kode_tiket)
    {
        // Cek apakah kode tiket milik pegawai atau publik
        $ticketPegawai = Ticket::where('kode_tiket', $kode_tiket)->first();
        $ticketPublik = Publik::where('kode_tiket', $kode_tiket)->first();


        if ($ticketPegawai)
        {
            return response()->json([
                'status' => 'success true',
                'data'   => $ticketPegawai,
                'type'   => 'pegawai',
            ]);

        } elseif ($ticketPublik)
        {
            return response()->json([
                'status' => 'success true',
                'data'   => $ticketPublik,
                'type'   => 'publik',
            ]);

        } else
        {
            return response()->json([
                'status'  => 'error',
                'message' => 'Tiket tidak ditemukan',
            ], 404);
        }
    }
}
