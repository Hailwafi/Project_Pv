<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Ticket;

class TicketCode extends Mailable
{
    use Queueable, SerializesModels;

    public $ticket;

    public function __construct(Ticket $ticket)
    {
        $this->ticket = $ticket;
    }

    public function build()
    {
        return $this->view('emails.ticket_code')
                    ->subject('Kode Tiket Anda')
                    ->with([
                        'kode_tiket'   => $this->ticket->kode_tiket,
                        'nama_lengkap' => $this->ticket->nama_lengkap,
                        'tanggal'      => $this->ticket->created_at->format('d M Y'),
                    ]);
    }
}
