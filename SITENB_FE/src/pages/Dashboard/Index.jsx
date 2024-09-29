
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarDb from '../../components/NavbarDb';
import Tesnav from '../../components/Tesnav';

const Index = () => {
  
  const [TotalUserCount, setTotalUserCount] = useState(0);
  const [TotalCategoriesCount, setTotalCategoriesCount] = useState(0);
  const [TotalPostsCount, setTotalPostsCount] = useState(0);
  const [TotalOrdersCount, setTotalOrdersCount] = useState(0);

useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Ambil data dari respons API
      const { users, categories, posts, transactions } = response.data.data;

      // Update state dengan data yang diterima dari API
      setTotalUserCount(users);
      setTotalCategoriesCount(categories);
      setTotalPostsCount(posts);
      setTotalOrdersCount(transactions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

  return (
    
        <>
        {/* <NavbarDb/> */}
        <NavbarDb/>
            <div className="col-lg-9 mt-10 flex items-center justify-center gap-x-6  pt-14">
            <div className="row x-gap-20 y-gap-20 items-center p-3 mb-20 filter-items">
              
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
               <a
  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border bg-customRed rounded-md  hover:bg-blue-100 transition-colors"
>
  <img
    src="src/img/Waiting.png"
    alt="Logo"
    className="w-16 h-16 mb-4 md:mb-0 md:mr-4"
  />
 <div className='text-white'>
 <p className="text-center">{TotalUserCount}</p>
   <span>Tiket Menunggu Pengerjaan</span>
 </div>
 <div>
  
  {/* <div className="text-center mb-2 text-lg font-bold">Teks di atas</div>
  <span>Laptop</span> */}
</div>

</a>

                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border bg-customOrange rounded-md hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Proses.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <div className='text-white'>
                    <p className="text-center">{TotalCategoriesCount}</p>
                  <span>Tiket Proses Pengerjaan</span>
                  </div>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border bg-customGreen rounded-md hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Tes.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <div className='text-white'>
                    
                    <p className="text-center">{TotalPostsCount}</p>
                  <span>Tiket Selesai</span>
                  </div>
                </a>
              </div>

              {/* Layanan Jaringan Internet */}

    
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 p-4 ">
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border bg-customBlue rounded-md hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Tiket.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <div className='text-white'>
                    <p className="text-center">{TotalOrdersCount}</p>
                  <span>Tiket Pegawai BNPT</span>
                  </div>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border bg-customBlue rounded-md hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Tiket.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <div className='text-white'>
                    <p className="text-center">1</p>
                  <span>Tiket Public</span>
                  </div>
                </a>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-5 p-4 ">
                
              {/* <a
  className="flex flex-col items-center text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors py-11  "
>
  <div className="bg-slate-600 w-full p-2 rounded-md mb-2 ">
    <h2 className="text-white text-xl font-bold text-center">Pemasangan</h2>
  </div>
  <span>1</span>
</a> */}

<table class="items-center border-spacing-none border border-slate-500">
  <thead>
    <tr>
      <th class="border bg-customAbu py-4 text-white">Jumlah tiket Kendala</th>
    
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="text-center py-14">1</td>
     
    </tr>
  </tbody>
</table>
<table class="border-spacing-none border border-slate-500 ">
  <thead>
    <tr>
      <th class="border bg-customAbu py-4 text-white">Jumlah tiket Permohonan</th>
    
    </tr>
  </thead>
  <tbody>
    <tr>
     
      <td class="text-center py-14 ">1</td>
     
    </tr>
  </tbody>
</table>

                {/* <a
                  className="flex flex-col items-center  p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                   <span>Pemasangan</span>
                 
                  <span>1</span>
                </a> */}
            
             
              </div>
            </div>
          </div>

    
      </>
  )
}

export default Index
