import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarDb from '../../../components/NavbarDb';
import FormModal from '../../../components/FormModal';
import PopUp from '../../../components/PopUp';

const ListUser = () => {
  const [isForm1Open, setIsForm1Open] = useState(false);
  const openForm1 = () => setIsForm1Open(true);
  const closeForm1 = () => setIsForm1Open(false);

  const [isOpen, setIsOpen] = useState(false);
  const openDetail = () => setIsOpen(true);
  const closeDetail = () => setIsOpen(false);

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Halaman saat ini
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Cek apakah ada lebih banyak data

  const fetchData = async (pageNum) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://127.0.0.1:8000/api/admin/users?page=${pageNum}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedData = response.data.data.data;

      // Jika data yang diambil kurang dari limit, berarti tidak ada lagi data yang tersedia
      if (fetchedData.length === 0) {
        setHasMore(false);
      } else {
        setData((prevData) => [...prevData, ...fetchedData]); // Tambahkan data baru ke list
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Panggil fetchData pada initial render dan saat page berubah
  useEffect(() => {
    setLoading(true);
    fetchData(page);
  }, [page]);

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight ||
        loading
      )
        return;

      // Tambah page saat mencapai bagian bawah halaman
      if (hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <>
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
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="cari akun berdasarkan nama" required />
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
              {data.map((user, index) => (
                <tr key={user.id} className="odd:bg-white even:bg-gray-50 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </th>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button onClick={openDetail} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                      <button onClick={openDetail} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Hapus</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

       
        {loading && <p>Loading more data...</p>}

    
        {!hasMore && <p>No more data to load</p>}
      </div>
    </>
  );
};

export default ListUser;
