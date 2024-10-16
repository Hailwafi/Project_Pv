<?php

namespace App\Http\Controllers\Api\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //get users
        $users = User::when(request()->search, function($users) {
            $users = $users->where('name', 'like', '%'. request()->search . '%');
        })->with('roles')->latest()->paginate(5);

        //append query string to pagination links
        $users->appends(['search' => request()->search]);

        //return with Api Resource
        return new UserResource(true, 'List Data Users', $users);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email'     => 'required|unique:users',
            'username'  => 'required',
            'role'      => 'required',
            'password'  => 'required|confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        //create user
        $user = User::create([
            'email'     => $request->email,
            'username'  => $request->username,
            'role'      => $request->role,
            'password'  => bcrypt($request->password)
        ]);

        //assign roles to user
        $user->assignRole($request->roles);

        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Data User Berhasil Disimpan!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Data User Gagal Disimpan!', null);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::with('roles')->whereId($id)->first();

        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Detail Data User!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Detail Data User Tidak Ditemukan!', null);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'email'     => 'required|unique:users,email,'.$user->id,
            'username'  => 'required',
            'role'      => 'required',
            'password'  => 'confirmed'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if($request->password == "") {

            //update user without password
            $user->update([
                'email'     => $request->email,
                'username'  => $request->username,
            ]);

        } else {

            //update user with new password
            $user->update([
                'email'     => $request->email,
                'username'  => $request->username,
                'role'      => $request->role,
                'password'  => bcrypt($request->password)
            ]);

        }

        //assign roles to user
        $user->syncRoles($request->roles);

        if($user) {
            //return success with Api Resource
            return new UserResource(true, 'Data User Berhasil Diupdate!', $user);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Data User Gagal Diupdate!', null);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        if($user->delete()) {
            //return success with Api Resource
            return new UserResource(true, 'Data User Berhasil Dihapus', null);
        }

        //return failed with Api Resource
        return new UserResource(false, 'Data User Gagal Dihapus!', null);
    }

    public function getStaffList()
    {
        // Ambil daftar staf yang memiliki role staf
        $staffList = User::select('id', 'username', 'email')
            ->where('role', 'staff') // Asumsikan role staf didefinisikan sebagai 'staf'
            ->get();

        if ($staffList->isEmpty())
        {
            return response()->json(['message' => 'Tidak ada staf yang ditemukan'], 404);
        }

        return response()->json(['staff' => $staffList], 200);
    }

    public function search(Request $request)
    {
        // Ambil query dari input
        $query = $request->input('query');

        // Cari user berdasarkan nama (username) atau email, lalu urutkan berdasarkan created_at (waktu pembuatan akun)
        $users = User::where('username', 'LIKE', "%{$query}%")
                    ->orWhere('email', 'LIKE', "%{$query}%")
                    ->orderBy('created_at', 'asc') // Mengurutkan berdasarkan waktu pembuatan akun
                    ->get();

        // Format respons untuk hanya menampilkan no (list), username, role, dan aksi
        $formattedUsers = $users->map(function ($user, $index)
        {
            return [
                'no'       => $index + 1, // Nomor urut berdasarkan kapan akun dibuat
                'username' => $user->username, // Nama user
                'role'     => $user->role,     // Peran (role)
                'aksi'     => '<button>Hapus</button>', // Tombol hapus (simulasi)
            ];
        });

        // Kembalikan hasil pencarian dalam format JSON
        return response()->json($formattedUsers);
    }
}
