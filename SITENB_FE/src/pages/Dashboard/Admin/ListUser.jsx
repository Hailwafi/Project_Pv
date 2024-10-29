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
    password: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        password: user.password,
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
          {/* <div>
            <label>password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </div> */}
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

const DeleteUserModal = ({ userId, isOpen, onClose, onDelete }) => {
  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://127.0.0.1:8000/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Akun Ini berhasil dihapus');
      onDelete();
      onClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Terjadi kesalahan saat menghapus Akun Ini');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg p-6 z-20 w-80">
        <h2 className="text-lg font-semibold mb-4">Hapus Akun Ini</h2>
        <p>Anda yakin ingin menghapus Akun ini?</p>
        <div className="flex justify-end mt-4">
          <button type="button" onClick={onClose} className="mr-2 bg-gray-300 text-black p-2 rounded">
            Cancel
          </button>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

const ListUser = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedUser(null);
  };

  const openDeleteModal = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedUserId(null);
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
    closeEditModal();
  };

  const handleDelete = () => {
    fetchUsers();
    closeDeleteModal();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
          </a>
          <span className="ms-2">ListUser</span>
        </div>
        <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
          <table className="w-full text-sm text-left rtl:text-right">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">No</th>
                <th scope="col" className="px-6 py-3">Nama Lengkap</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Peran</th>
                <th scope="col" className="px-6 py-3 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => openEditModal(user)} className="font-medium text-blue-600 hover:underline">Edit</button>
                      <button onClick={() => openDeleteModal(user.id)} className="font-medium text-red-600 hover:underline ml-4">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <EditUserModal
          user={selectedUser}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onUpdate={handleUpdate}
        />
        <DeleteUserModal
          userId={selectedUserId}
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default ListUser;
