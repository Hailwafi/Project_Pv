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
        'nip'
    ];

    public function ticket()
    {
        return $this->morphTo();
    }
}
