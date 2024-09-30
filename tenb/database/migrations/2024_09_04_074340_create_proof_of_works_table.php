<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('proof_of_works', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id');
            $table->string('ticket_type');
            $table->string('nama_lengkap');
            $table->string('bukti_pengerjaan');
            $table->date('tanggal'); // Tambahkan kolom tanggal
            $table->unsignedBigInteger('staff_id'); // Tambahkan kolom staff_id
            $table->timestamps();
        });        
    }

    public function down(): void
    {
        Schema::dropIfExists('proof_of_works');
    }
};