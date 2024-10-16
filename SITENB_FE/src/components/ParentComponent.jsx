import React, { useState, useEffect } from 'react';
import Detail from './Detail';
import axios from 'axios';

const ParentComponent = () => {
  const [tickets, setTickets] = useState(null); // data tiket yang akan di-detailkan
  const [staffList, setStaffList] = useState([]); // daftar staf
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin/pantau-pekerjaan');
        setStaffList(response.data);
      } catch (error) {
        console.error('Error fetching staff list:', error);
      }
    };

    fetchStaffList();
  }, []);

  const handleAssignTask = async (taskData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/pantau-pekerjaan', taskData);
      console.log('Task assigned successfully:', response.data);
      alert('Tugas berhasil ditugaskan!');
    } catch (error) {
      console.error('Error assigning task:', error);
      alert('Gagal menugaskan tugas.');
    }
  };

  const openModal = (ticket) => {
    setTickets(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Tambahkan contoh ticketData jika diperlukan
  const ticketData = { id: 1, kode_tiket: 'TK-123', created_at: '2024-01-01', nama_lengkap: 'John Doe', email: 'john@example.com', Jabatan: 'Staff', nomor_induk_pegawai: '123456' }; // Data tiket contoh

  return (
    <div>
      {/* Tombol atau daftar tiket yang bisa membuka modal */}
      <button onClick={() => openModal(ticketData)}>Lihat Detail Tiket</button>

      {/* Modal untuk detail tiket */}
      {isModalOpen && (
        <Detail
          tickets={tickets}
          onClose={closeModal}
          staffList={staffList}
          onAssignTask={handleAssignTask}
        />
      )}
    </div>
  );
};

export default ParentComponent;
