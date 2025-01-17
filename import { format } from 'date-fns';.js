import { format } from 'date-fns';
import AssignTaskForm from './AssignTaskForm';
import React, { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import axios from 'axios';

const Detail = ({ tickets, onClose, staffList, onAssignTask }) => {
    const formatString = (str) => str.replace(/_/g, ' ');

    const [assignData, setAssignData] = useState(null);
    const [loading, setLoading] = useState(false);

    if (!tickets) return null;

    const formattedDate = tickets?.created_at
        ? format(new Date(tickets.created_at), 'dd MMMM yyyy')
        : 'Tanggal tidak tersedia';

    const handleAssignTask = (taskData) => {
        const taskWithTicketInfo = { ...taskData, ticketId: tickets.id };
        onAssignTask(taskWithTicketInfo);
        setAssignData(taskWithTicketInfo);
    };

    const isImageFile = (filePath) => {
        const ext = filePath.split('.').pop().toLowerCase();
        return ['jpg', 'jpeg', 'png', 'gif'].includes(ext);
    };

    const getFileNameFromPath = (filePath) => {
        return filePath.split('/').pop();
    };

    const handleDownload = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Token tidak ditemukan. Pastikan Anda sudah login.');
                return;
            }

            const response = await axios.get(`http://127.0.0.1:8000/api/view-or-download-file/${tickets.id}?download=true`, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', getFileNameFromPath(tickets.unggah_file));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
            alert('Gagal mengunduh file. Silakan coba lagi.');
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto mt-10">
                <div className="relative isolate mt-10 lg:px-8">
                    <form>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                                    {/* Tanggal Field */}
                                    <div>
                                        <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                            Tanggal:
                                        </label>
                                        <div className="mt-2">
                                            <div
                                                id="date"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                                                {formattedDate}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nama Lengkap */}
                                    <div>
                                        <label htmlFor="nama_lengkap" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nama Lengkap
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="nama_lengkap"
                                                name="nama_lengkap"
                                                type="text"
                                                value={tickets.nama_lengkap}
                                                readOnly
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Email
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="email"
                                                name="email"
                                                type="text"
                                                value={tickets.email}
                                                readOnly
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Jabatan */}
                                    <div>
                                        <label htmlFor="jabatan" className="block text-sm font-medium leading-6 text-gray-900">
                                            Jabatan
                                        </label>
                                        <div className="mt-2">
                                            {tickets.jabatan ? (
                                                <div
                                                    id="jabatan"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                >
                                                    {tickets.jabatan}
                                                </div>
                                            ) : (
                                                <div
                                                    id="jabatan"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100"
                                                >
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Nomor Induk Pegawai */}
                                    <div>
                                        <label htmlFor="nomor_induk_pegawai" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nomor Induk Pegawai
                                        </label>
                                        <div className="mt-2">
                                            {tickets.nomor_induk_pegawai ? (
                                                <div
                                                    id="nomor_induk_pegawai"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                >
                                                    {tickets.nomor_induk_pegawai}
                                                </div>
                                            ) : (
                                                <div
                                                    id="nomor_induk_pegawai"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-500 bg-gray-100"
                                                >
                                                    Not Available
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Kategori */}
                                    <div>
                                        <label htmlFor="kategori" className="block text-sm font-medium leading-6 text-gray-900">
                                            Kategori
                                        </label>
                                        <div className="mt-2">
                                            <div
                                                id="kategori"
                                                name="kategori"
                                                type="text"
                                                readOnly
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                            >
                                                {formatString(tickets.kategori)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Jenis Tiket */}
                                    <div>
                                        <label htmlFor="tiket" className="block text-sm font-medium leading-6 text-gray-900">
                                            Jenis Tiket
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="tiket"
                                                name="tiket"
                                                type="text"
                                                value={tickets.jenis_tiket}
                                                readOnly
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Foto */}
                                    <div>
                                        <label htmlFor="foto" className="block text-sm font-medium leading-6 text-gray-900">
                                            Foto
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="foto"
                                                name="foto"
                                                type="text"
                                                value={tickets.unggah_file}
                                                readOnly
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                            />
                                            {isImageFile(tickets.unggah_file) && (
                                                <>
                                                    <a
                                                        href={`http://127.0.0.1:8000/api/view-or-download-file/${tickets.id}`}
                                                        target="_blank"
                                                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                    >
                                                        Lihat Foto
                                                    </a>
                                                    <button
                                                        onClick={handleDownload}
                                                        className="mt-2 ml-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                    >
                                                        Unduh Foto
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Deskripsi */}
                                    <div className="col-span-full">
                                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                            Deskripsi
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                                                defaultValue={tickets.deskripsi_tiket}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-x-6">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Detail;
