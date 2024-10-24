import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import FormModal from '../../../components/FormModal';
import Detail from '../../../components/Detail';

const TaskPw = () => {
    const [selectedTicket, setSelectedTicket] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [isForm1Open, setIsForm1Open] = useState(false);
    const [newStatus, setNewStatus] = useState('');
    const [isUpdating, setIsUpdating] = useState(false); 

    const openForm1 = () => setIsForm1Open(true);
    const closeForm1 = () => setIsForm1Open(false);
  
    const [tickets, setTickets] = useState({
        tiket_pegawai: [],
        tiket_publik: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async () => {
            const token = localStorage.getItem('token'); 
            try {
                const response = await axios.get('http://localhost:8000/api/staff/staff-tickets', {
                    headers: { Authorization: `Bearer ${token}` } 
                });
                setTickets(response.data.data); 
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Gagal mendapatkan tiket. Silakan coba lagi.'); 
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const handleDetailClick = (ticket) => {
        setSelectedTicket(ticket); 
        setIsModalOpen(true); 
    };
      
    const handleCloseModal = () => {
        setSelectedTicket(null);
        setIsModalOpen(false); 
    };
      
    const handleStatusChange = async () => {
        setIsUpdating(true); 
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:8000/api/staff/tickets/${selectedTicket.id}/status`, {
                status: newStatus,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const updatedData = await axios.get('http://localhost:8000/api/staff/staff-tickets', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTickets(updatedData.data.data); 
            closeForm1(); 
        } catch (error) {
            console.error('Error updating status:', error.response?.data);
            alert('Gagal mengubah status tiket. Silakan coba lagi.');
        } finally {
            setIsUpdating(false); 
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            <div className='relative px-4 pt-24 sm:px-6 lg:px-8'>
                <a href="/Dashboard/Tiket" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-blue-300 inline-flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clipRule="evenodd" />
                    </svg>
                    <span className="sr-only">Search</span>
                </a>

                <div className="flex justify-between items-center w-full">
                    <p>v Tiket Pegawai </p>
                    <form className="flex items-center w-full sm:max-w-xs">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="cari tiket berdasarkan nama" required />
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
                                <th scope="col" className="px-6 py-3">Email</th>
                                <th scope="col" className="px-6 py-3">Jabatan</th>
                                <th scope="col" className="px-6 py-3">Kategori</th>
                                <th scope="col" className="px-6 py-3">Jenis Tiket</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.tiket_pegawai.length > 0 ? (
                                tickets.tiket_pegawai.map((ticket) => (
                                    <tr key={`pegawai-${ticket.id}`} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {ticket.id}
                                        </th>
                                        <td className="px-6 py-4">{ticket.nama_lengkap}</td>
                                        <td className="px-6 py-4">{ticket.email}</td>
                                        <td className="px-6 py-4">{ticket.jabatan}</td>
                                        <td className="px-6 py-4">{ticket.kategori}</td>
                                        <td className="px-6 py-4">{ticket.jenis_tiket}</td>
                                        <td className="px-6 py-4">{ticket.status}</td>
                                        
                                        <td className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-4">
                                            <button onClick={() => { openForm1(); setSelectedTicket(ticket); }} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Ganti Status</button>
                                            <button onClick={() => handleDetailClick(ticket)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Detail</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center">
                                        Tidak ada tiket ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedTicket && (
                <FormModal isOpen={isForm1Open} onClose={closeForm1} onSave={handleStatusChange} title="Ubah Status">
                    <div className="sm:col-span-3">
                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status Baru</label>
                        <select
                            id="status"
                            value={newStatus}
                            onChange={(e) => setNewStatus(e.target.value)}
                            className="block w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Pilih Status</option>
                            <option value="proses">Proses</option>
                            <option value="selesai">Selesai</option>
                        </select>
                    </div>
                </FormModal>
            )}

       
        </>
    );
};

export default TaskPw;
