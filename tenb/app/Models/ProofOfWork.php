<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProofOfWork extends Model
{
    use HasFactory;

    protected $fillable = [
        'ticket_id', 
        'ticket_type', 
        'nama_lengkap', 
        'bukti_pengerjaan',
        'tanggal',
        'staff_id'
    ];

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }

    public function publik()
    {
        return $this->belongsTo(Publik::class, 'publik_id');
    }
}