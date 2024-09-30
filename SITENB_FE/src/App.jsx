// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Navbar from "./components/NavbarDb";
import Footer from "./components/Footer";

import Index from "./pages";

import Sign from "./pages/Sign"
import Ch_pass from "./pages/Ch_pass"
import Ck_Tiket from "./pages/Ck_Tiket"
import Ft_pass from "./pages/Ft_pass"

import From from "./pages/From"
import FromPb from "./pages/FromPb"

import Dashboard from "./pages/Dashboard/Index"

import FormModal from "./components/FormModal"
import  Notification from "./pages/Notification"
import NavbarDb from "./components/NavbarDb";
import Tes from "./pages/Tes"
import Tes2 from "./pages/tes2"
import Tes3 from "./pages/tes3"


import TesIsi from "./pages/TesIsi"
import TesIsi2 from "./pages/TesIsi2"


import ProductTable from "./pages/Dashboard/Staff/ProductTable"

import Task from "./pages/Dashboard/Staff/Task"

import TiketPb from "./pages/TiketPb"
import TiketPw from "./pages/TiketPw"


import Tiket from "./pages/Dashboard/Tiket"
import TiketPegawai from "./pages/Dashboard/TiketPegawai"
import TiketPublic from "./pages/Dashboard/TiketPublic"


import WorkStaff from "./pages/Dashboard/Admin/WorkStaff"
import ListUser from "./pages/Dashboard/Admin/ListUser"
import TambahUser from "./pages/Dashboard/Admin/TambahUser"

import withAuthenticationAdmin from './service/withAuthenticationAdmin'; 
import withAuthenticationLeader from './service/withAuthenticationLeader'; 
import withAuthenticationStaff from './service/withAuthenticationStaff'; 

const App = () => {
  return (
    <div>
      <Router>
        <div>
          <Routes>
     
  <Route path="/" element={<Index/>}/>

  <Route path="/TiketPb" element={<TiketPb/>}/> 
  <Route path="/TiketPw" element={<TiketPw/>}/> 
  <Route path="/From" element={<From/>}/>
  <Route path="/FromPb" element={<FromPb/>}/>
  <Route path="/Ft_pass" element={<Ft_pass/>}/>
  <Route path="/Ch_pass" element={<Ch_pass/>}/>

  <Route path="/TesIsi2" element={<TesIsi2/>}/>
  <Route path="/TesIsi" element={<TesIsi/>}/>


  <Route path="/Sign" element={<Sign/>}/>


  <Route path='/Dashboard/*' element={<AdminLayout />} />
  <Route path='/Leader/*' element={<LeaderLayout />} />
  <Route path='/Staff/*' element={<StaffLayout />} />
        
          </Routes>
        </div>
      </Router>
    </div>
  );
};


const AdminLayout = withAuthenticationAdmin(() => (
  <>
    <NavbarDb />
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/WorkStaff" element={<WorkStaff/>}/> 
        <Route path="/ListUser" element={<ListUser/>}/>
        <Route path="/TambahUser" element={<TambahUser/>}/>
        <Route path="/Tiket" element={<Tiket/>}/> 
        <Route path="/TiketPegawai" element={<TiketPegawai/>}/> 
        <Route path="/TiketPublic" element={<TiketPublic/>}/> 


    
      </Routes>
    </div>
  </>
));

const LeaderLayout = withAuthenticationLeader(() => (
  <>
    <NavbarDb />
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/Tiket" element={<Tiket/>}/> 
        <Route path="/TiketPegawai" element={<TiketPegawai/>}/> 
        <Route path="/TiketPublic" element={<TiketPublic/>}/> 
    
      </Routes>
    </div>
  </>
));

const StaffLayout = withAuthenticationStaff(() => (
  <>
    <NavbarDb />
    <div>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
      
    
      </Routes>
    </div>
  </>
));
 
export default App;