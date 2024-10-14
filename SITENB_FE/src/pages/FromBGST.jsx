import { PhotoIcon } from '@heroicons/react/24/solid';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { useState, useEffect } from 'react';

const FromBGST = () => {
  const location = useLocation();
  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    jabatan: "",
    nomor_induk_pegawai: "",
    kategori: "",
    jenis_tiket: "",
    sub_kategori: "",
    deskripsi: "",
  });

  const [unggah_file, setUnggah_file] = useState(null);

  // Data kategori dan jenis tiket
  const kategoriData = {
    layanan_pengolahan_data: {
      options: [
        { label: 'Laptop', value: 'laptop' },
        { label: 'Komputer', value: 'komputer' },
        { label: 'Wifi', value: 'wifi' },
      ],
      jenis: [
        { label: 'Permohonan', value: 'permohonan' },
        { label: 'Kendala', value: 'kendala' },
      ],
    },
    kebocoran_data: {
      options: [
        { label: 'kebocoran Data', value: 'kebocoran_data' },
        { label: 'Web Defacement', value: 'web_defacement' },
        { label: 'Denial Of Service', value: 'denial_of_service' },
        { label: 'Unauthorized Access', value: 'unauthorized_access' },
        { label: 'Malicious Code', value: 'malicious_code' },
        { label: 'Unplanned Downtime', value: 'unplanned_downtime' },
      ],
      jenis: [
        { label: 'Permohonan', value: 'permohonan' },
      ],
    },
    printer: {
      options: [
        { label: 'Printer', value: 'printer' },
      ],
      jenis: [
        { label: 'Permohonan', value: 'permohonan' },
      ],
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setUnggah_file(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Email tidak valid!");
      return;
    }

    const submitData = new FormData();
    submitData.append('nama_lengkap', formData.nama_lengkap);
    submitData.append('email', formData.email);
    submitData.append('jabatan', formData.jabatan);
    submitData.append('nomor_induk_pegawai', formData.nomor_induk_pegawai);
    submitData.append('kategori', formData.kategori);
    submitData.append('jenis_tiket', formData.jenis_tiket);
    submitData.append('sub_kategori', formData.sub_kategori);
    submitData.append('deskripsi', formData.deskripsi);
    if (unggah_file) {
      submitData.append('unggah_file', unggah_file);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tickets', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Pengajuan berhasil!');
      } else {
        toast.error(`Error: ${response.data.message || "Terjadi kesalahan."}`);
      }
    } catch (error) {
      console.error("Error :", error.response ? error.response.data : error);
      toast.error("Terjadi kesalahan: " + (error.response ? error.response.data.message : "Kesalahan tidak terduga."));
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Navbar />
      <div className="relative isolate mt-10 px-6 pt-14 lg:px-52">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <h2 className="text-xl text-center font-semibold leading-7 text-gray-900">
              Silahkan lengkapi formulir di bawah ini
            </h2>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 gap-x-6 gap-y-8">

                {/* Input Nama */}
                <div className="sm:col-span-3">
                  <label htmlFor="nama_lengkap" className="block text-sm font-medium leading-6 text-gray-900">
                    Nama
                  </label>
                  <div className="mt-2">
                    <input
                      id="nama_lengkap"
                      name="nama_lengkap"
                      type="text"
                      required
                      value={formData.nama_lengkap}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Input Email */}
                <div className="sm:col-span-3">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Input Jabatan */}
                <div className="sm:col-span-3">
                  <label htmlFor="jabatan" className="block text-sm font-medium leading-6 text-gray-900">
                    Jabatan
                  </label>
                  <div className="mt-2">
                    <input
                      id="jabatan"
                      name="jabatan"
                      type="text"
                      required
                      value={formData.jabatan}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Input Nomor Induk Pegawai */}
                <div className="sm:col-span-3">
                  <label htmlFor="nomor_induk_pegawai" className="block text-sm font-medium leading-6 text-gray-900">
                    Nomor Induk Pegawai
                  </label>
                  <div className="mt-2">
                    <input
                      id="nomor_induk_pegawai"
                      name="nomor_induk_pegawai"
                      type="text"
                      required
                      value={formData.nomor_induk_pegawai}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Input Kategori */}
                <div className="sm:col-span-3">
                  <label htmlFor="kategori" className="block text-sm font-medium leading-6 text-gray-900">
                    Kategori
                  </label>
                  <div className="mt-2">
                    <select
                      id="kategori"
                      name="kategori"
                      required
                      value={formData.kategori}
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        setFormData({
                          ...formData,
                          kategori: selectedCategory,
                          jenis_tiket: '',
                          sub_kategori: '',
                        });
                      }}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>Pilih Kategori</option>
                      {Object.keys(kategoriData).map((kat) => (
                        <option key={kat} value={kat}>
                          {kat.charAt(0).toUpperCase() + kat.slice(1).replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Input Jenis Tiket */}
                <div className="sm:col-span-3">
                  <label htmlFor="jenis_tiket" className="block text-sm font-medium leading-6 text-gray-900">
                    Jenis Tiket
                  </label>
                  <div className="mt-2">
                    <select
                      id="jenis_tiket"
                      name="jenis_tiket"
                      required
                      value={formData.jenis_tiket}
                      onChange={handleChange}
                      disabled={!formData.kategori}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>Pilih Jenis Tiket</option>
                      {formData.kategori && kategoriData[formData.kategori].jenis.map((jenis) => (
                        <option key={jenis.value} value={jenis.value}>
                          {jenis.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Input Sub Kategori */}
                <div className="sm:col-span-3">
                  <label htmlFor="sub_kategori" className="block text-sm font-medium leading-6 text-gray-900">
                    Sub Kategori
                  </label>
                  <div className="mt-2">
                    <select
                      id="sub_kategori"
                      name="sub_kategori"
                      required
                      value={formData.sub_kategori}
                      onChange={handleChange}
                      disabled={!formData.kategori}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      <option value="" disabled>Pilih Sub Kategori</option>
                      {formData.kategori && kategoriData[formData.kategori].options.map((sub) => (
                        <option key={sub.value} value={sub.value}>
                          {sub.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Input Deskripsi */}
                <div className="sm:col-span-3">
                  <label htmlFor="deskripsi" className="block text-sm font-medium leading-6 text-gray-900">
                    Deskripsi
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="deskripsi"
                      name="deskripsi"
                      required
                      value={formData.deskripsi}
                      onChange={handleChange}
                      rows="3"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* Input Unggah File */}
                <div className="sm:col-span-3">
                  <label htmlFor="unggah_file" className="block text-sm font-medium leading-6 text-gray-900">
                    Unggah File
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      name="unggah_file"
                      id="unggah_file"
                      onChange={handleImageChange}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 focus:outline-none"
                    />
                    <p className="mt-1 text-sm text-gray-500" id="file_input_help">PNG, JPG (maksimal 2MB)</p>
                  </div>
                </div>

                {/* Tombol Kirim */}
                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FromBGST;
