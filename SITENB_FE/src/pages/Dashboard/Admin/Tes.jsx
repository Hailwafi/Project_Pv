// src/ticketsModal.js
import React from 'react';
import { format } from 'date-fns';

const Tes = ({ tickets, onClose }) => {
  if (!tickets) return null;

  // Format tanggal created_at
  const formattedDate = tickets?.created_at 
    ? format(new Date(tickets.created_at), 'dd MMMM yyyy') 
    : 'Tanggal tidak tersedia';

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/2 max-h-[80vh] overflow-y-auto mt-10">
        <div className="relative isolate mt-10 lg:px-8">
          <form>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-3 gap-x-6 gap-y-8 sm:grid-cols-9">
                  
                  <div className="sm:col-span-3">
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

                  <div className="sm:col-span-3">
                    <label htmlFor="kode_tiket" className="block text-sm font-medium leading-6 text-gray-900">
                      Kode Tiket
                    </label>
                    <div className="mt-2">
                      <input
                        id="kode_tiket"
                        name="kode_tiket"
                        type="text"
                        value={tickets.kode_tiket}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
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

                  <div className="sm:col-span-3">
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

                  <div className="sm:col-span-3">
                    <label htmlFor="jabatan" className="block text-sm font-medium leading-6 text-gray-900">
                      Jabatan
                    </label>
                    <div className="mt-2">
                      <input
                        id="jabatan"
                        name="jabatan"
                        type="text"
                        value={tickets.jabatan}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="nomor_induk_pegawai" className="block text-sm font-medium leading-6 text-gray-900">
                      Nomor Induk Pegawai
                    </label>
                    <div className="mt-2">
                      <input
                        id="nomor_induk_pegawai"
                        name="nomor_induk_pegawai"
                        type="text"
                        value={tickets.nomor_induk_pegawai}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="kategori" className="block text-sm font-medium leading-6 text-gray-900">
                      Kategori
                    </label>
                    <div className="mt-2">
                      <input
                        id="kategori"
                        name="kategori"
                        type="text"
                        value={tickets.kategori}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="sub_kategori" className="block text-sm font-medium leading-6 text-gray-900">
                      Sub Kategori
                    </label>
                    <div className="mt-2">
                      <input
                        id="sub_kategori"
                        name="sub_kategori"
                        type="text"
                        value={tickets.sub_kategori}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="jenis_tiket" className="block text-sm font-medium leading-6 text-gray-900">
                      Jenis Tiket
                    </label>
                    <div className="mt-2">
                      <input
                        id="jenis_tiket"
                        name="jenis_tiket"
                        type="text"
                        value={tickets.jenis_tiket}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                      Status
                    </label>
                    <div className="mt-2">
                      <input
                        id="status"
                        name="status"
                        type="text"
                        value={tickets.status}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                      Deskripsi
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        value={tickets.deskripsi}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  {/* <div className="sm:col-span-3">
                    <label htmlFor="unggah_file" className="block text-sm font-medium leading-6 text-gray-900">
                      Unggah File
                    </label>
                    <div className="mt-2">
                      <a href={tickets.unggah_file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Lihat File
                      </a>
                    </div>
                  </div> */}

                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-end space-x-4 gap-5">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mt-4">
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tes;
