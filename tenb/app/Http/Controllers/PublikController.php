<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use App\Models\Publik;
use App\Models\User;
use App\Http\Resources\PublikResource;
use Illuminate\Support\Facades\Validator;
use App\Notifications\TicketAssignedNotification;
use App\Notifications\NewTicketNotification;
use Illuminate\Support\Facades\Notification;

class PublikController extends Controller
{
    public function index()
    {
        //get ticket publik
        $publiks = Publik::when(request()->search, function($publiks) 
        {
        $publiks = $publiks->where('name', 'like', '%'. request()->search . '%');
        })->latest()->paginate(5);

        //append query string to pagination links
        $publiks->appends(['search' => request()->search]);

        //return with Api Resource
        return new PublikResource(true, 'List data Ticket Publik', $publiks);
    }

    public function store(Request $request)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required|string|max:255',
            'kategori'     => 'required|string',
            'sub_kategori' => 'required|string',
            'email'        => 'required|email',
            'jenis_tiket'  => 'required|string|in:kendala',
            'deskripsi'    => 'required|string',
            'unggah_file'  => 'nullable|file|mimes:jpg,png,pdf|max:2048',
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

        // Buat ticket publik
        $publik = Publik::create([
            'nama_lengkap'  => $request->nama_lengkap,
            'kategori'      => $request->kategori,
            'sub_kategori'  => $request->sub_kategori,
            'email'         => $request->email,
            'jenis_tiket'   => $request->jenis_tiket,
            'deskripsi'     => $request->deskripsi,
            'unggah_file'   => $unggah_file_path,
        ]);

        if ($publik) 
        {
            // Dapatkan user admin dan kepala subbag
            $adminAndKepala_SubbagUsers = User::whereIn('role', ['admin', 'kepala_subbag'])->get();

            // Kirim notifikasi ke admin dan kepala subbag
            Notification::send($adminAndKepala_SubbagUsers, new NewTicketNotification($publik));

            // Kembalikan response sukses
            return new PublikResource(true, 'Berhasil membuat Ticket', $publik);
        }

        // Kembalikan response gagal
        return new PublikResource(false, 'Gagal membuat Ticket', null);
    }

    public function show(Publik $publik)
    {
        return $publik;
    }

    public function update(Request $request, $id)
    {
        // Validasi request
        $validator = Validator::make($request->all(), [
            'nama_lengkap' => 'required|string|max:255',
            'kategori'     => 'required|string',
            'sub_kategori' => 'required|string',
            'email'        => 'required|email',
            'jenis_tiket'  => 'required|string|in:kendala',
            'deskripsi'    => 'required|string',
            'unggah_file'  => 'nullable|file|mimes:jpg,png,pdf|max:2048',
        ]);        

        if ($validator->fails()) 
        {
            return response()->json($validator->errors(), 422);
        }

        $publik = Publik::find($id);

        // Jika ada file yang diunggah
        if ($request->hasFile('unggah_file')) 
        {
            $unggah_file = $request->file('unggah_file');
            $unggah_file->storeAs('public/publik', $unggah_file->hashName());

        Storage::delete('public/publik/'.basename($publik->$publik));

            $publik->update([
                'nama_lengkap'              => $request->nama_lengkap,
                'kategori'                  => $request->kategori,
                'sub_kategori'              => $request->sub_kategori,
                'email'                     => $request->email,
                'jenis_tiket'               => $request->jenis_tiket,
                'deskripsi'                 => $request->deskripsi,
                'unggah_file'               => $unggah_file->hashName(),
            ]);

        } else {
            $publik->update([
                'nama_lengkap'              => $request->nama_lengkap,
                'kategori'                  => $request->kategori,
                'sub_kategori'              => $request->sub_kategori,
                'email'                     => $request->email,
                'jenis_tiket'               => $request->jenis_tiket,
                'deskripsi'                 => $request->deskripsi,
            ]);
        }

        // Kembalikan response sukses
        return new PublikResource(true, 'Berhasil di Update', $publik);
    }


    public function destroy(Publik $publik)
    {
        {
            if($publik->delete()) 
            {
                //return success with Api Resource
                return new PublikResource(true, 'Ticket Publik berhasil dihapus', null);
            }
    
                //return failed with Api Resource
                return new PublikResource(false, 'Ticket Publik gagal dihapus!', null);
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

        // Cari tiket publik berdasarkan ID
        $publik = Publik::findOrFail($id);

        // Perbarui status tiket publik
        $publik->status = $request->status;
        $publik->save();

        return new PublikResource(true, 'Status Tiket Publik berhasil diubah.', $publik);
    }

    public function assignPublik(Request $request, $id)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'assigned_to' => 'required|exists:users,id', // Staf yang ditugaskan
        ]);

        if ($validator->fails()) 
        {
            return response()->json($validator->errors(), 422);
        }

        // Cari tiket publik berdasarkan ID
        $publik = Publik::findOrFail($id);

        // Update tiket dengan staf yang ditugaskan
        $publik->assigned_to = $request->assigned_to;
        $publik->save();

        // Kirim notifikasi ke staf yang ditugaskan
        $staf = User::find($request->assigned_to);
        $staf->notify(new TicketAssignedNotification($publik, 'publik'));  // 'Publik' tipe tiket

        return response()->json(['message' => 'Tiket Publik berhasil ditugaskan kepada Staf.'], 200);
    }

}
