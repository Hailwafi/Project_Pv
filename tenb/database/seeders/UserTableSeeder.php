<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserTableSeeder extends Seeder
{
    public function run(): void
    {
    // Admin
        //create data user
        User::create([
            'email'         => 'infosys@gmail.com',
            'username'      => 'infosys',
            'role'          => 'admin',
            'password'      => bcrypt('3321'),
        ]);

        //assign permission to role
        $role = Role::find(1);
        $permissions = Permission::all();

        $role->syncPermissions($permissions);

        //assign role with permission to user
        $user = User::find(1);
        $user->assignRole($role->name);

    // Kepala Subbag
        //create data kepala subbag
        User::create([
            'email'         => 'gemilangparhadiyan@gmail.com',
            'username'      => 'gemilang parhadiyan',
            'role'          => 'kepala_subbag',
            'password'      => bcrypt('123'),
        ]);

        $role = Role::find(2);
        $permissions = Permission::whereIn('name',
        [
            'users.create',
            'posts.index',
            'posts.create',
            'posts.edit',
            'posts.delete',
            'permissions.index',
            'roles.index',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'categories.index',
            'categories.create',
            'categories.edit',
            'categories.delete',
            'tickets.index',
            'tickets.create',
            'tickets.update',
            'tickets.delete',
            'tickets.update-status',
            'tickets.assign-ticket',
            'publiks.index',
            'publiks.create',
            'publiks.update',
            'publiks.delete',
            'publiks.update-status',
            'publiks.assign-ticket',
        ])->get();

        // Menugaskan izin ke peran
        $role->syncPermissions($permissions);

        //assign role with permission to kepala subbag
        $user = User::find(2);
        $user->assignRole($role->name);

    // Staf
        $stafData = [
            [
                'email'    => 'yoviroinaldo@gmail.com',
                'username' => 'yovi roinaldo',
                'role'     => 'staf',
                'password' => bcrypt('datacenter'),
            ],
            [
                'email'    => 'dinihariyani@gmail.com',
                'username' => 'dini hariyani',
                'role'     => 'staf',
                'password' => bcrypt('biwara'),
            ],
            [
                'email'    => 'stepanusandy@gmail.com',
                'username' => 'stepanus andy',
                'role'     => 'staf',
                'password' => bcrypt('siber'),
            ],
            [
                'email'    => 'andrerizki@gmail.com',
                'username' => 'andre rizki',
                'role'     => 'staf',
                'password' => bcrypt('biologi'),
            ],
            [
                'email'    => 'rizkypahlawan@gmail.com',
                'username' => 'rizky pahlawan',
                'role'     => 'staf',
                'password' => bcrypt('pildunasik'),
            ],
        ];

        // ambil role staf
        $role = Role::findByName('staf', 'api');

        // ambil permissions yang dibutuhkan untuk staf
        $permissions = Permission::whereIn('name', [
            'users.create',
            'tickets.update-status',
            'publiks.update-status',
            'proof_of_works.create',
        ])->get();

        // menugaskan izin ke role
        $role->syncPermissions($permissions);

        // loop melalui data staf dan buat user
        foreach ($stafData as $staf)
        {
            $user = User::create($staf);

            // assign role with permissions to staf
            $user->assignRole($role->name);
        }
    }
}
