<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publik extends Model
{
    use HasFactory;

    protected $table = 'publiks';

    protected $fillable = [
        'nama_lengkap',
        'kategori',
        'sub_kategori',
        'email',
        'jenis_tiket',
        'deskripsi',
        'unggah_file',
        'status',
        'prioritas',
        'assigned_to',
        'kode_tiket',
        'token_tiket'
    ];

    // Relasi ke model User untuk assigned staff
    public function assignedStaff()
    {
        return $this->belongsTo(User::class, 'assigned_to');
    }

    public function proofOfWorks()
    {
        return $this->hasMany(ProofOfWork::class);
    }
}
