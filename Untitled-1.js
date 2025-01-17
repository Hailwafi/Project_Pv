import { useState } from 'react'; // Sudah ada
import { ToastContainer, toast } from 'react-toastify'; // Sudah ada
import 'react-toastify/dist/ReactToastify.css'; // Sudah ada

const FromPw = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubmitting, setIsSubmitting] = useState(false); // Tambahkan state ini

  const [formData, setFormData] = useState({
    nama_lengkap: "",
    email: "",
    jabatan: "",
    nomor_induk_pegawai: "",
    kategori: "",
    sub_kategori: "",
    jenis_tiket: "",
    deskripsi: "",
  });

  const [unggah_file, setUnggah_file] = useState(null);
  const maxCharacters = 255;

  // Function handleSubmit dengan isSubmitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set tombol menjadi tidak aktif
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(formData.email)) {
      toast.error("Email tidak valid!");
      setIsSubmitting(false); // Reset tombol
      return;
    }

    const submitData = new FormData();
    submitData.append('nama_lengkap', formData.nama_lengkap);
    submitData.append('email', formData.email);
    submitData.append('jabatan', formData.jabatan);
    submitData.append('nomor_induk_pegawai', formData.nomor_induk_pegawai);
    submitData.append('kategori', formData.kategori);
    submitData.append('sub_kategori', formData.sub_kategori);
    submitData.append('jenis_tiket', formData.jenis_tiket);
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

      if (response.status === 200) {
        toast.success('Pengajuan berhasil!');
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast.error(`Error: ${response.data.message || "Terjadi kesalahan."}`);
      }
    } catch (error) {
      console.error("Error :", error.response ? error.response.data : error);
      toast.error("Kesalahan: " + (error.response ? error.response.data.message : "Kesalahan tidak terduga."));
    } finally {
      setIsSubmitting(false); // Reset tombol setelah proses selesai
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Navbar />
      <div className="relative isolate mt-10 px-6 pt-14 lg:px-52">
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            {/* ...Input fields lainnya */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting} // Nonaktifkan tombol saat isSubmitting
                className={`block w-full rounded-md py-1.5 text-white font-semibold shadow-sm sm:text-sm ${
                  isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                }`}
              >
                {isSubmitting ? 'Memproses...' : 'Ajukan'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default FromPw;

