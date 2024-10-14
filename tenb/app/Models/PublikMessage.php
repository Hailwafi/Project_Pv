<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublikMessage extends Model
{
    use HasFactory;
    protected $table = 'publik_messages';
    protected $fillable = [
        'publik_id',
        'message',
        'email'
    ];

    public function publik()
    {
        return $this->belongsTo(Publik::class);
    }
}
