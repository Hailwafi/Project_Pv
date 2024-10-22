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
            'email'         => 'hehe@bnpt.go.id',
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
            'email'         => 'haha@bnpt.go.id',
            'username'      => 'gemilang_parhadiyan',
            'role'          => 'kepala subbag',
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

    // Staff
        $staffData = [
            [
                'email'    => 'alamak@bnpt.go.id',
                'username' => 'yovi_roinaldo',
                'role'     => 'staff',
                'password' => bcrypt('datacenter'),
            ],
            [
                'email'    => 'kaka@bnpt.go.id',
                'username' => 'dini_hariyani',
                'role'     => 'staff',
                'password' => bcrypt('biwara'),
            ],
            [
                'email'    => 'cihuy@bnpt.go.id',
                'username' => 'stepanus_andy',
                'role'     => 'staff',
                'password' => bcrypt('siber'),
            ],
            [
                'email'    => 'ciee@bnpt.go.id',
                'username' => 'andre_rizki',
                'role'     => 'staff',
                'password' => bcrypt('biologi'),
            ],
            [
                'email'    => 'pahlawankesiangan@bnpt.go.id',
                'username' => 'rizky_pahlawan',
                'role'     => 'staff',
                'password' => bcrypt('pildunasik'),
            ],
        ];

        // ambil role staf
        $role = Role::findByName('staff', 'api');

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
        foreach ($staffData as $staff)
        {
            $user = User::create($staff);

            // assign role with permissions to staff
            $user->assignRole($role->name);
        }
    }
}
