import { useState } from 'react'

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FormModal from '../components/FormModal';

// const navigation = [
//   {name: 'Pemeliharaan Jaringan Internet', href: '' },
//   {name: 'Perbaiki Alat Internet', href: '/p' },
//   {name: 'Hosting APK', href: '#' },
//   {name: 'Keamanan Sistem', href: '#' },
// ]


const index = () => {
  const [isForm1Open, setIsForm1Open] = useState(false);
  

const openForm1 = () => setIsForm1Open(true);
const closeForm1 = () => setIsForm1Open(false);


  return (
    <>

      <div className="relative isolate px-6  lg:px-8">
        <Navbar />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          {/* <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          /> */}
        </div>
        {/* Page 1 */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 " id="Page1">

          <div className="text-center">

            <p className="mt-6 text-xl leading-8 text-gray-600">
              Memudahkan pelaporan permohonan dan kendala
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
              Selamat Datang Di SI-TENB
            </h1>
            <div class="relative mt-10 flex items-center justify-center gap-x-6">
              <input type="text" placeholder="Masukan kode tiket anda" class="w-full box-border rounded-xl outline outline-offset-2 px-3 py-4.2" />

              <button class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg class="text-slate-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#Page2"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
             Unduh panduan penggunaan SI-TENB -&gt;
              </a>
            </div>
          </div>
        </div>
        {/* Page 2 */}
        <div className="container mx-auto max-w-2xl py-16 sm:py-48" id="Page2">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-9 text-gray-800 mb-6">
            Apa itu SI-TENB (Sistem Informasi Ticketing BNPT)
            </h2>
          </div>
          <div className="flex flex-col lg:flex-row items-center space-y-20 lg:space-y-0 lg:space-x-20">
            <img src="Logo1.png" alt="" className="w-56 h-56" />
           
            <p className="text-xl font-bold leading-7 text-gray-600 text-justify">
            Sistem Informasi Ticketing BNPT dirancang untuk memudahkan proses pelaporan dan penanganan pengaduan secara terintegrasi. Dengan sistem ini, pengguna dapat melaporkan masalah atau kebutuhan secara cepat dan efisien, baik oleh pegawai internal maupun publik.
            </p>
          </div>
          <div className='text-1xl font-bold leading-9 text-gray-800 mb-6  py-16 '>
             <h1>Pengajuan Tiket Berdasarkan Akses</h1>
        
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4 ">

          <a  href="/TiketPb" className="flex justify-center items-center rounded-md bg-customYellow2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
         Public 
         
          </a>
          <a  href="/TiketPw" className=" flex justify-center items-center  rounded-md  bg-customRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
        Pegawai
         
          </a>
  </div>  </div>
        </div>


        {/* <div
      aria-hidden="true"
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            
        }}
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
    </div> */}
        <div className="container mx-auto max-w-2xl py-16 sm:py-48" id="Page3">
          {/* <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Selamat Datang Di SI-TENB
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias adipisci dolor iste facilis, aliquid vitae repellendus? Nesciunt mollitia iure reiciendis.
          </p>
        </div> */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            {/* <a
              href=""
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </a> */}
            <a href="#" className="text-3xl  font-bold  leading-6 text-gray-900">
              Layanan Tiket<span aria-hidden="true"></span>
            </a>

          </div>
          {/* <div className="mt-10 items-center justify-center gap-x-6 ">
               <div className=" flex flex-nowrap  grid-cols-4 gap-4 place-items-stretch h-5 ">       
              {navigation.map((item) => (
                <div key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-gray-900">
                  {item.name}
                </div>
              ))}
            </div>
          </div> */}

          {/* <div className=" col-lg-9 mt-10 flex items-center justify-center gap-x-6">
            <div class="row x-gap-20 y-gap-20 items-center p-3 mb-20 filter-items">
              <div className='col-lg-9 text-lg font-bold'>
                <h4>Layanan Pengolah Data</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  {navigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="flex flex-col justify-center items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
    >
      {item.name}
    </a>
  ))}
</div>

  </div>
  </div> */}

          <div className="col-lg-9 mt-10 flex items-center justify-center gap-x-6">
            <div className="row x-gap-20 y-gap-20 items-center p-3 mb-20 filter-items">
              {/* Layanan Pengolah Data */}
              <div className="col-lg-9 text-lg font-bold">
                <h4>Layanan Pengolah Data</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                <button
        onClick={openForm1}
                
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Laptop.png"
                    alt="Logo"
                    className="w-16 h-16 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Laptop</span>
                </button>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Computer.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Komputer</span>
                </a>

                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Printer.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Printer</span>
                </a>
              </div>

              {/* Layanan Jaringan Internet */}

              <div className="col-lg-9 text-lg font-bold">
                <h4>Layanan Jaringan Internet</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Internet.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Internet</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Cctv.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Cctv</span>
                </a>
              </div>

              {/* Layanan Aplikasi */}
              <div className="col-lg-9 text-lg font-bold">
                <h4>Layanan Aplikasi </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Installation.png"
                    alt="Logo"
                    className="w-11  h-11   mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Pemasangan</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Consultation.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Konsultasi</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Unplanned Downtime.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Unplanned Downtime</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Email.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Email</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Peneration Test.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Peneration  Test</span>
                </a>
              </div>

              {/* Layanan Layanan Aduan Keamanan Siber */}

              <div className="col-lg-9 text-lg font-bold">
                <h4>Layanan Layanan Aduan Keamanan Siber </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Kebocoran Data.png"
                    alt="Logo"
                    className="w-11  h-11   mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Kebocoran Data</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Web Defacement.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Web Defacement</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Denial Of Service.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Denial Of Service</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Unauthorized Access.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Unauthorized Access</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Malicious Code.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Malicious Code</span>
                </a>
                <a
                  className="flex flex-col md:flex-row items-center p-5 text-lg font-medium border border-gray-300 rounded-md bg-white hover:bg-blue-100 transition-colors"
                >
                  <img
                    src="src/img/Unplanned Downtime.png"
                    alt="Logo"
                    className="w-11 h-11 mb-4 md:mb-0 md:mr-4"
                  />
                  <span>Unplanned Downtime</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
      <Footer />
      <FormModal isOpen={isForm1Open} onClose={closeForm1} title="Ajukan Tiket Berdasarkan akses">
        <div className='flex flex-col items-center box-border'>
          <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block mb-2">
          Tiket Pegawai BNPT   -&gt;
         
          </button>
          <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 block mb-1">
          Tiket Publik          -&gt;
          
          </button>
         
        </div>
      </FormModal> 
    </>

  )
}

export default index