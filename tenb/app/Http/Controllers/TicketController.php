<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\User;
use App\Http\Resources\TicketResource;
use Illuminate\Support\Facades\Validator;
use App\Mail\TicketCode;
use Illuminate\Support\Facades\Mail;
use App\Notifications\TicketAssignedNotification;
use App\Notifications\NewTicketNotification;
use Illuminate\Support\Facades\Notification;

class TicketController extends Controller
{
    public function index()
    {
        //get ticket
        $tickets = Ticket::when(request()->search, function($tickets)
        {
        $tickets = $tickets->where('name', 'like', '%'. request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $tickets->appends(['search' => request()->search]);

        //return with Api Resource
        return new TicketResource(true, 'List data Ticket Pegawai', $tickets);
    }

    public function store(Request $request)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'nama_lengkap'        => 'required|string|max:255',
            'jabatan'             => 'required|string|max:255',
            'kategori'            => 'required|string',
            'sub_kategori'        => 'required|string',
            'email'               => 'required|email',
            'nomor_induk_pegawai' => 'required|string',
            'jenis_tiket'         => 'required|string|in:permohonan,kendala',
            'deskripsi'           => 'required|string',
            'unggah_file'         => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        // Simpan unggah file jika ada
        $unggah_file_path = null;
        if ($request->hasFile('unggah_file'))
        {
            $unggah_file = $request->file('unggah_file');
            $unggah_file_path = $unggah_file->store('ticket_images', 'public');
        }

        // Generate kode tiket unik (contoh: 6 digit angka)
        $kode_tiket = mt_rand(100000, 999999);

        // Buat tiket pegawai
        $ticket = Ticket::create([
            'nama_lengkap'        => $request->nama_lengkap,
            'jabatan'             => $request->jabatan,
            'kategori'            => $request->kategori,
            'sub_kategori'        => $request->sub_kategori,
            'email'               => $request->email,
            'nomor_induk_pegawai' => $request->nomor_induk_pegawai,
            'jenis_tiket'         => $request->jenis_tiket,
            'deskripsi'           => $request->deskripsi,
            'unggah_file'         => $unggah_file_path,
            'kode_tiket'          => $kode_tiket,
        ]);

        if ($ticket)
        {
            // Dapatkan user admin dan kepala subbag
            $adminAndKepala_SubbagUsers = User::whereIn('role', ['admin', 'kepala_subbag'])->get();

            // Kirim notifikasi ke admin dan kepala subbag
            Notification::send($adminAndKepala_SubbagUsers, new NewTicketNotification($ticket));

            // Kirim email kode tiket ke pengguna
            // Mail::to($ticket->email)->send(new TicketCode($ticket));

            return new TicketResource(true, 'Berhasil membuat Ticket Pegawai', $ticket);
        }

        return new TicketResource(false, 'Gagal membuat Pegawai!', null);
    }

    public function show(Ticket $ticket)
    {
        return new TicketResource(true, 'Detail Tiket Pegawai', $ticket);
    }

    public function update(Request $request, $id)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'nama_lengkap'        => 'required|string|max:255',
            'jabatan'             => 'required|string|max:255',
            'kategori'            => 'required|string',
            'sub_kategori'        => 'required|string',
            'email'               => 'required|email',
            'nomor_induk_pegawai' => 'required|string',
            'jenis_tiket'         => 'required|string|in:permohonan,kendala',
            'deskripsi'           => 'required|string',
            'unggah_file'         => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        $ticket = Ticket::find($id);

        // Jika ada file yang diunggah
        if ($request->hasFile('unggah_file'))
        {
            $unggah_file = $request->file('unggah_file');
            $unggah_file->storeAs('public/ticket', $unggah_file->hashName());

            Storage::delete('public/ticket/'.basename($ticket->unggah_file));

            $ticket->update([
                'nama_lengkap'              => $request->nama_lengkap,
                'jabatan'                   => $request->jabatan,
                'kategori'                  => $request->kategori,
                'sub_kategori'              => $request->sub_kategori,
                'email'                     => $request->email,
                'nomor_induk_pegawai'       => $request->nomor_induk_pegawai,
                'jenis_tiket'               => $request->jenis_tiket,
                'deskripsi'                 => $request->deskripsi,
                'unggah_file'               => $unggah_file->hashName(),
            ]);

        } else {
            $ticket->update([
                'nama_lengkap'              => $request->nama_lengkap,
                'jabatan'                   => $request->jabatan,
                'kategori'                  => $request->kategori,
                'sub_kategori'              => $request->sub_kategori,
                'email'                     => $request->email,
                'nomor_induk_pegawai'       => $request->nomor_induk_pegawai,
                'jenis_tiket'               => $request->jenis_tiket,
                'deskripsi'                 => $request->deskripsi,
            ]);
        }

        // Kembalikan response sukses
        return new TicketResource(true, 'Ticket berhasil di Update', $ticket);
    }

    public function destroy(Ticket $ticket)
    {
        {
            if($ticket->delete())
            {
                //return success with Api Resource
                return new TicketResource(true, 'Ticket Pegawai berhasil dihapus', null);
            }

                //return failed with Api Resource
                return new TicketResource(false, 'Ticket Pegawai gagal dihapus', null);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:proses,selesai',
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        // Cari tiket pegawai berdasarkan ID
        $ticket = Ticket::findOrFail($id);

        // Perbarui status tiket
        $ticket->status = $request->status;
        $ticket->save();

        return new TicketResource(true, 'Status Tiket Pegawai berhasil diubah.', $ticket);
    }

    public function assignTicket(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'assigned_to' => 'required|exists:users,id', // Pastikan assigned_to valid
        ]);

        if ($validator->fails())
        {
            return response()->json($validator->errors(), 422);
        }

        // Cari tiket berdasarkan ID
        $ticket = Ticket::findOrFail($id);

        // Update tiket dengan staf yang ditugaskan
        $ticket->assigned_to = $request->assigned_to;
        $ticket->save();

        // Cari staf yang ditugaskan
        $staf = User::findOrFail($request->assigned_to);

        // Kirim notifikasi ke staf yang ditugaskan
        $staf->notify(new TicketAssignedNotification($ticket, 'pegawai'));  // 'pegawai' untuk tipe tiket pegawai

        return response()->json([
            'message'     => 'Tiket berhasil ditugaskan kepada Staf.',
            'assigned_to' => $staf->username, // Menyertakan nama staf yang ditugaskan
        ], 200);
    }
}
