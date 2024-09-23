import React from 'react'
import NavbarDb from '../../components/NavbarDb';

const Tiket = () => {
  return (
    <div className='relative isolate px-6 pt-14 lg:px-8'>
    <NavbarDb/>
    <div className="container mx-auto max-w-2xl py-16 sm:py-48" id="Page2">
    {/* <div className="text-center">
      <h2 className="text-3xl font-bold leading-9 text-gray-800 mb-6">
      Apa itu SI-TENB (Sistem Informasi Ticketing BNPT)
      </h2>
    </div> */}
 <div className="flex flex-col lg:flex-row items-center space-y-31 lg:space-y-0 lg:space-x-31">
  <div className="flex flex-col space-y-2">
    <a href="/Dashboard/TiketPegawai">&gt;Tiket Pegawai BNPT</a>
    <a href="/Dashboard/TiketPublic">&gt;Tiket Public</a>
  </div>


  <form className="flex items-center max-w-sm mx-auto w-full box-border">
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
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
      </svg>
      <span className="sr-only">Search</span>
    </button>
  </form>
</div>

    


  </div>
 </div>
    
  )
}

export default Tiket
