<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Category;
use App\Models\Post;
use App\Models\PostView;
use App\Models\Ticket;
use App\Models\Publik;
use App\Models\ProofOfWork;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        // count users
        $users = User::count();

        // count categories
        $categories = Category::count();

        // count posts
        $posts = Post::count();

        // count tickets
        $tickets = Ticket::count();

        // count tickets in 'proses' status
        $ticketsProses = Ticket::where('status', 'proses')->count();

        // count tickets in 'selesai' status
        $ticketsSelesai = Ticket::where('status', 'selesai')->count();

        // count publiks
        $publiks = Publik::count();

        // count publiks in 'proses' status
        $publiksProses = Publik::where('status', 'proses')->count();

        // count publiks in 'selesai' status
        $publiksSelesai = Publik::where('status', 'selesai')->count();

        // count tickets assigned to staff (pegawai)
        $ticketsAssignedToStaff = Ticket::whereNotNull('assigned_to')->with('assignedStaff')->count();

        // count publiks assigned to staff (publik)
        $publiksAssignedToStaff = Publik::whereNotNull('assigned_to')->with('assignedStaff')->count();

        // count proof_of_works
        $proof_of_works = ProofOfWork::count();

        // detail of tickets assigned to staff (including pegawai and publik tickets)
        $assignedTickets = [
            'pegawai' => Ticket::whereNotNull('assigned_to')->with('assignedStaff')->get(),
            'publik' => Publik::whereNotNull('assigned_to')->with('assignedStaff')->get(),
        ];

        $post_views = PostView::select([
            DB::raw('count(id) as count'),
            DB::raw('DATE(created_at) as day')
        ])
        ->groupBy('day')
        ->where('created_at', '>=', Carbon::now()->subDays(30))
        ->get();

        if(count($post_views))
        {
            foreach ($post_views as $result)
            {
                $count[] = (int) $result->count;
                $day[] = $result->day;
            }
        } else {
            $count[] = "";
            $day[] = "";
        }

        return response()->json([
            'success'                       => true,
            'message'                       => 'List Data on Dashboard',
            'data'                          => [
                'users'                     => $users,
                'categories'                => $categories,
                'posts'                     => $posts,
                'tickets'                   => $tickets,
                'tickets_proses'            => $ticketsProses,
                'tickets_selesai'           => $ticketsSelesai,
                'publiks'                   => $publiks,
                'publiks_proses'            => $publiksProses,
                'publiks_selesai'           => $publiksSelesai,
                'tickets_assigned_to_staff' => $ticketsAssignedToStaff,
                'publiks_assigned_to_staff' => $publiksAssignedToStaff,
                'assigned_tickets_detail'   => $assignedTickets,
                'proof_of_works'            => $proof_of_works,
                'posts_views'               => [
                    'count'                 => $count,
                    'day'                   => $day
                ]
            ]
        ]);
    }

    public function trackWork()
    {
        // Ambil semua tiket pegawai yang sudah ditugaskan
        $pegawaiTickets = Ticket::whereNotNull('assigned_to')
            ->with('assignedStaff')
            ->get();

        // Ambil semua tiket publik yang sudah ditugaskan
        $publikTickets = Publik::whereNotNull('assigned_to')
            ->with('assignedStaff')
            ->get();

        // Gabungkan kedua koleksi tiket pegawai dan publik
        $allTickets = $pegawaiTickets->concat($publikTickets);

        return response()->json([
            'success' => true,
            'tickets' => $allTickets,
        ]);
    }
}
