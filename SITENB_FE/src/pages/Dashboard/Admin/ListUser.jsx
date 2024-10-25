import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarDb from '../../../components/NavbarDb';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import FormModal from '../../../components/FormModal';
import PopUp from '../../../components/PopUp';

const EditUserModal = ({ user, isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://127.0.0.1:8000/api/admin/users/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('User berhasil diupdate');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Gagal mengupdate user');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-20 w-96">
        <h2 className="text-lg font-semibold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            >
              <option value="admin">Admin</option>
              <option value="kepala_subbag">Kepala Subbag</option>
              <option value="staff">Staff</option>
             
            </select>
          </div>
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-black p-2 rounded">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};



const ListUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
 


  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdate = () => {
    fetchUsers();
    closeModal(); 
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (userId) => {
    const token = localStorage.getItem('token');
  
    if (window.confirm('Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success('Pengguna berhasil dihapus');
        fetchUsers(); // Refresh daftar pengguna
      } catch (error) {
        toast.error('Terjadi kesalahan saat menghapus pengguna');
      }
      //   alert('Pengguna berhasil dihapus');
      //   fetchUsers(); 
      // } catch (error) {
      //   console.error('Error deleting user:', error);
      //   alert('Terjadi kesalahan saat menghapus pengguna');
      // }
    }
  };


  // const handleDelete = (userId) => {
  //   toast.info(
  //     <div>
  //       Anda yakin ingin menghapus pengguna ini?
  //       <div>
  //         <button onClick={() => confirmDelete(userId)} className="mr-2">Ya</button>
  //         <button onClick={() => toast.dismiss()}>Tidak</button>
  //       </div>
  //     </div>,
  //     { autoClose: false }
  //   );
  // };
  
  // const confirmDelete = async (userId) => {
  //   const token = localStorage.getItem('token');
  //   try {
  //     await axios.delete(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     toast.success('Pengguna berhasil dihapus');
  //     fetchUsers(); 
  //   } catch (error) {
  //     toast.error('Terjadi kesalahan saat menghapus pengguna');
  //   }
  // };

  if (loading) {
    return <p>Loading users...</p>;
  }

  if (!Array.isArray(users)) {
    return <p>Error: Data tidak valid. Harap coba lagi.</p>;
  }
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <>
    <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    <div className="relative isolate px-4 pt-24 sm:px-6 lg:px-8">
      <NavbarDb />
      <div className='inline-flex items-center'>
      <a href="/Dashboard" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 inline-flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
        </svg>
        <span className="sr-only">Search</span>
      </a>
        <span className="ms-2">ListUser</span>

      </div>
      <a href="/Dashboard/TambahUser" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 inline-flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
<path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
</svg>
        
        <span className="ms-2">Tambah User</span>

      </a>

      <div className="flex justify-between items-center w-full">
        <p></p>
        <form className="flex items-center w-full sm:max-w-xs">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 py-2.5"
              placeholder="Cari tiket berdasarkan nama"
              value={searchTerm}
              onChange={handleSearch}
              required
            />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </form>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">No</th>
              <th scope="col" className="px-6 py-3">Nama Lengkap</th>
              <th scope="col" className="px-6 py-3">email</th>
              <th scope="col" className="px-6 py-3">Peran</th>
              <th scope="col" className="px-6 py-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user,index) => (
              <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </th>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.role}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                  <button onClick={() => openModal(user)} className="font-medium text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(user.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline ml-4">Hapus</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={closeModal}
          onUpdate={handleUpdate}
        />
   
    </div>
  </>
  );
};

export default ListUser;

// <div className="container mx-auto p-4">
//   <h1 className="text-2xl font-bold mb-4">User List</h1>
//   <table className="table-auto w-full border-collapse border border-gray-300">
//     <thead>
//       <tr className="bg-gray-100">
//         <th className="border border-gray-300 px-4 py-2">ID</th>
//         <th className="border border-gray-300 px-4 py-2">Name</th>
//         <th className="border border-gray-300 px-4 py-2">Email</th>
//       </tr>
//     </thead>
//     <tbody>
//       {users.map((user) => (
//         <tr key={user.id} className="hover:bg-gray-50">
//           <td className="border border-gray-300 px-4 py-2">{user.id}</td>
//           <td className="border border-gray-300 px-4 py-2">{user.username}</td>
//           <td className="border border-gray-300 px-4 py-2">{user.email}</td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>