import { format } from 'date-fns';
import AssignTaskForm from './AssignTaskForm';
import React, { useState } from 'react';

const Detail = ({ tickets, onClose, staffList, onAssignTask }) => {

  const formatString = (str) => {
    return str.replace(/_/g, ' ');
  };

  const [assignData, setAssignData] = useState(null);

  if (!tickets) return null;

  const formattedDate = tickets?.created_at
    ? format(new Date(tickets.created_at), 'dd MMMM yyyy')
    : 'Tanggal tidak tersedia';

  const handleAssignTask = (taskData) => {
    const taskWithTicketInfo = { ...taskData, ticketId: tickets.id }; 
    onAssignTask(taskWithTicketInfo);
    setAssignData(taskWithTicketInfo); 
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
                        placeholder="Deskripsi"
                        value={tickets.deskripsi}
                        readOnly
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </form>
          
          {/* Assign Task Form */}
          <AssignTaskForm
            ticketId={tickets.id}
            onAssignTask={handleAssignTask}
          />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-red-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
