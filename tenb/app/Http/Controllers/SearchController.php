<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Models\Publik;
use Illuminate\Support\Facades\Storage;

class SearchController extends Controller
{
    public function searchTicket(Request $request)
    {
        // Ambil input kode tiket dan token tiket
        $kode_tiket = $request->input('kode_tiket');
        $token_tiket = $request->input('token_tiket');

        // Cek apakah kode_tiket dan token_tiket milik pegawai atau publik
        $ticketPegawai = Ticket::where('kode_tiket', $kode_tiket)
                               ->where('token_tiket', $token_tiket)
                               ->first();

        $ticketPublik = Publik::where('kode_tiket', $kode_tiket)
                              ->where('token_tiket', $token_tiket)
                              ->first();

        if ($ticketPegawai)
        {
            // Dapatkan URL file jika ada
            if ($ticketPegawai->unggah_file) {
                $ticketPegawai->unggah_file_url = Storage::url($ticketPegawai->unggah_file);
            }

            return response()->json([
                'status' => 'success',
                'data'   => $ticketPegawai,
                'type'   => 'pegawai',
            ]);

        } elseif ($ticketPublik)
        {
            // Ambil data tiket publik tanpa unggah_file dan unggah_file_url
            $ticketPublikData = $ticketPublik->only(['id', 'nama_lengkap', 'kategori', 'sub_kategori', 'email', 'jenis_tiket', 'deskripsi', 'status', 'prioritas', 'assigned_to', 'kode_tiket', 'token_tiket']);

            return response()->json([
                'status' => 'success',
                'data'   => $ticketPublikData,
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
