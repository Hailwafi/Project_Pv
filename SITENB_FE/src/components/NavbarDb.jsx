import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import PopUp from './PopUp';
import axios from 'axios';

const navigation = [
  {name: 'Dashboard', href: '/Dashboard',role: 'admin'},
  {name: 'Tiket', href: '/Dashboard/Tiket',role: 'admin' },
  {name: 'Pantau pekerjaan', href: '/Dashboard/StaffList',role: 'admin' },
  {name: 'Users', href: '/Dashboard/ListUser',role: 'admin' },

  {name: 'Dashboard', href: '/Leader',role: 'kepala_subbag'},
  {name: 'Tiket', href: '/Leader/Tiket',role: 'kepala_subbag' },
  {name: 'Pantau pekerjaan', href: '/Leader/StaffList',role: 'kepala_subbag' },

  {name: 'Dashboard', href: '/Staff',role: 'staff'},
  {name: 'Tugas Masuk', href: '/Staff/TaskList',role: 'staff' },

];

const NavbarDb = () => {
  const [role, setRole] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-profile.png'); // Default profile image
  const [username, setName] = useState('Your Name');
  const [email, setEmail] = useState('your.email@example.com');
  const [userRole, setUserRole] = useState('User Role');

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
    fetchUserDetails(); // Fetch user details on component mount
  }, []);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://127.0.0.1:8000/api/admin/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      const { username, email, role, profile_picture_url } = response.data.data; // Access profile_picture_url
      setName(username);
      setEmail(email);
      setUserRole(role);
      setProfileImage(profile_picture_url || '/default-profile.png'); // Set profile image if exists
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  const openProfil = () => setIsOpen(true);
  const closeProfil = () => setIsOpen(false);
  const openLogOut = () => setIsOpen3(true);
  const closeLogOut = () => setIsOpen3(false);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Update image shown in UI
      };
      reader.readAsDataURL(file);
      updateProfilePicture(file); // Call function to upload image
    }
  };

  const updateProfilePicture = async (newProfilePicture) => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('profile_picture', newProfilePicture); // Add image file to FormData

      const response = await axios.post('http://127.0.0.1:8000/api/admin/profile/change-picture', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      console.log(response.data); // Check response
      fetchUserDetails(); // Fetch user details again to refresh data
    } catch (error) {
      console.error('Failed to update profile picture:', error);
    }
  };

  return (
    <>
      <div className="bg-white navbar">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav
            aria-label="Global"
            className="bg-white flex items-center justify-between p-4 lg:px-8 fixed w-full transition-all"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
                <img alt="BNPT Logo" src="/bnpt.png" className="h-16 w-auto" />
                <span className="ml-3 text-xl font-bold text-gray-900">SI-TENB</span>
              </a>
            </div>

            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

            <div className="hidden lg:flex lg:gap-x-12">
              {navigation
                .filter((item) => item.role === role)
                .map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white">
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="h-14 w-14 rounded-full"
                    />
                  </MenuButton>
                </div>
                <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                  <MenuItem>
                    <button onClick={openProfil} className="block px-4 py-2 text-sm text-gray-700">
                      Your Profile
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button onClick={openLogOut} className="block px-4 py-2 text-sm text-gray-700">
                      Log Out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </nav>

          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
            <div className="fixed inset-0 z-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50  overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
  {/* <img alt="BNPT Logo" src="bnpt.png" className="h-20 w-auto" /> */}
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-14 w-14 rounded-full">
  <path fill-rule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" />
</svg>
  <span className="ml-3 text-xl font-bold text-gray-900">SI-TENB</span>
</a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-700">
                  <div className="space-y-2 py-6">
                    {/* {navigation.map((item) => (
                      <a
                        key={item.name}
                      
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))} */}
                             {navigation
        .filter((item) => item.role === role) 
        .map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
          >
            {item.name}
          </a>
        ))}
                  </div>
                  <div className="py-6">
      <button
        onClick={openProfil}
        className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

      Profile
      </button>
      <button
      onClick={openLogOut}
        className="-mx-3 flex items-center rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
      >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
</svg>

       Log Out
      </button>
    </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>

          <PopUp
            isOpen={isOpen}
            onClose={closeProfil}
            title="Profile Anda"
            children={
              <div className="flex flex-col items-center box-border">
                <img src={profileImage} alt="Profile" className="h-16 w-16 rounded-full mb-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="mb-4"
                />
                <button className="mt-4 px-4 py-2 text-blue-800 rounded" onClick={() => updateProfilePicture()}>
                  Change Profile
                </button>
                <div className="text-center">
                  <label className="block mb-2">Nama: {username}</label>
                  <label className="block mb-1">Email: {email}</label>
                  <label className="block mb-4">Role: {userRole}</label>
                </div>
              </div>
            }
            modalStyle1="border border-blue-500"
          />
          <PopUp
            isOpen3={isOpen3}
            onClose3={closeLogOut}
            title3="Konfirmasi Log Out"
            children3={<p>Apakah Anda yakin ingin logout?</p>}
            modalStyle3="border border-red-500"
          />
        </header>
      </div>
    </>
  );
};

export default NavbarDb;
