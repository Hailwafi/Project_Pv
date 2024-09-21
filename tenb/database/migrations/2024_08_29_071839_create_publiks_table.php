<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('publiks', function (Blueprint $table) {
            $table->id();
            $table->string('nama_lengkap');
            $table->enum('kategori', ['layanan aduan keamanan siber']);
            $table->string('sub_kategori');
            $table->string('email');
            $table->enum('jenis_tiket', ['kendala']);
            $table->text('deskripsi');
            $table->string('unggah_file')->nullable();
            $table->enum('status', ['proses', 'selesai'])->default('proses');
            $table->unsignedBigInteger('assigned_to')->nullable(); // Staf yang ditugaskan
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publiks');
    }
};
