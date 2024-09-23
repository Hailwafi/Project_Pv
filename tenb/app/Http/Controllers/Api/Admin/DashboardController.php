<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon; // untuk datetime
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
        //count users
        $users = User::count();

        //count categories
        $categories = Category::count();

        //count posts
        $posts = Post::count();

        //count tickets
        $tickets = Ticket::count();

        // count publiks
        $publiks = Publik::count();

        // count proof_of_works
        $proof_of_works = ProofOfWork::count();

        $post_views = PostView::select([
            //count id
            DB::raw('count(id) as `count`'),

            //get day from created at
            DB::raw('DATE(created_at) as day')

        //group day "day"
        ])->groupBy('day')

        //get daya 30 days with carbon
        ->where('created_at', '>=', Carbon::now()->subDays(30))
        ->get();

        if(count($post_views)) {
            foreach ($post_views as $result) {
                $count[]    = (int) $result->$count;
                $day[]      = $result->day;
            }
        }else {
            $count[] = "";
            $day[]   = "";
        }
        
        return response()->json([
            'success'   => true,
            'message'   => 'List Data on Dashboard',
            'data'      => [
                'users'                 => $users,
                'categories'            => $categories,
                'posts'                 => $posts,
                'tickets'               => $tickets,
                'publiks'               => $publiks,
                'proof_of_works'        => $proof_of_works,
                'posts_views'           => [
                    'count'             => $count,
                    'day'               => $day
                ]
            ]
        ]);
    }
}
