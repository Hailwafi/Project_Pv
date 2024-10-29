import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import NavbarDb from "./components/NavbarDb";

import withAuthenticationAdmin from './service/withAuthenticationAdmin'; 
import withAuthenticationLeader from './service/withAuthenticationLeader'; 
import withAuthenticationStaff from './service/withAuthenticationStaff'; 

// Lazy load halaman-halaman
const Index = lazy(() => import('./pages'));
const Sign = lazy(() => import('./pages/Sign'));
const Ch_pass = lazy(() => import('./pages/Ch_pass'));
const Ck_Tiket = lazy(() => import('./pages/Ck_Tiket'));
const Ft_pass = lazy(() => import('./pages/Ft_pass'));

const From = lazy(() => import('./pages/From'));
const FromBGST = lazy(() => import('./pages/FromBGST'));
const FromPb = lazy(() => import('./pages/FromPb'));
const FromPw = lazy(() => import('./pages/FromPw'));

const Dashboard = lazy(() => import('./pages/Dashboard/Index'));

const Staff = lazy(() => import('./pages/Dashboard/Staff/Index'));
const FormModal = lazy(() => import('./components/FormModal'));
const Notification = lazy(() => import('./pages/Notification'));
const Tes = lazy(() => import('./pages/Dashboard/Admin/Tes'));
const Tes2 = lazy(() => import('./pages/Dashboard/Admin/Tes2'));
const Tes3 = lazy(() => import('./pages/Dashboard/Admin/Tes3'));

const TesIsi = lazy(() => import('./pages/TesIsi'));
const TesIsi2 = lazy(() => import('./pages/TesIsi2'));

const TaskPw = lazy(() => import('./pages/Dashboard/Staff/TaskPw'));
const TaskPb = lazy(() => import('./pages/Dashboard/Staff/TaskPb'));
const TaskList = lazy(() => import('./pages/Dashboard/Staff/TaskList'));

const TiketPb = lazy(() => import('./pages/TiketPb'));
const TiketPw = lazy(() => import('./pages/TiketPw'));

const Tiket = lazy(() => import('./pages/Dashboard/Tiket'));
const TiketPegawai = lazy(() => import('./pages/Dashboard/TiketPegawai'));
const TiketPublic = lazy(() => import('./pages/Dashboard/TiketPublic'));
const StaffList = lazy(() => import('./pages/Dashboard/StaffList'));
const StaffDetail = lazy(() => import('./pages/Dashboard/StaffDetail'));

const WorkStaff = lazy(() => import('./pages/Dashboard/Admin/WorkStaff'));
const ListUser = lazy(() => import('./pages/Dashboard/Admin/ListUser'));
const TambahUser = lazy(() => import('./pages/Dashboard/Admin/TambahUser'));

// Komponen utama
const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/TiketPb" element={<TiketPb />} />
          <Route path="/TiketPw" element={<TiketPw />} />
          <Route path="/From" element={<From />} />
          <Route path="/FromBGST" element={<FromBGST />} />
          <Route path="/FromPb" element={<FromPb />} />
          <Route path="/FromPw" element={<FromPw />} />
          <Route path="/Ft_pass" element={<Ft_pass />} />
          <Route path="/Ch_pass" element={<Ch_pass />} />
          <Route path="/Ck_Tiket/:kodetiket" element={<Ck_Tiket />} />
          <Route path="/TesIsi2/:kodetiket" element={<TesIsi2 />} />
          <Route path="/TesIsi/:id" element={<TesIsi />} />
          <Route path="/Tes3" element={<Tes3 />} />
          <Route path="/Sign" element={<Sign />} />
          <Route path="/Dashboard/*" element={<AdminLayout />} />
          <Route path="/Leader/*" element={<LeaderLayout />} />
          <Route path="/Staff/*" element={<StaffLayout />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

// Admin Layout
const AdminLayout = withAuthenticationAdmin(() => (
  <>
    <NavbarDb />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/Tes" element={<Tes />} />
        <Route path="/Tes2" element={<Tes2 />} />
        <Route path="/Tes3" element={<Tes3 />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/WorkStaff" element={<WorkStaff />} />
        <Route path="/ListUser" element={<ListUser />} />
        <Route path="/TambahUser" element={<TambahUser />} />
        <Route path="/Tiket" element={<Tiket />} />
        <Route path="/TiketPegawai" element={<TiketPegawai />} />
        <Route path="/TiketPublic" element={<TiketPublic />} />
        <Route path="/StaffList" element={<StaffList />} />
        <Route path="/StaffDetail/:id" element={<StaffDetail />} />
      </Routes>
    </Suspense>
  </>
));

// Leader Layout
const LeaderLayout = withAuthenticationLeader(() => (
  <>
    <NavbarDb />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Tiket" element={<Tiket />} />
        <Route path="/TiketPegawai" element={<TiketPegawai />} />
        <Route path="/TiketPublic" element={<TiketPublic />} />
        <Route path="/StaffList" element={<StaffList />} />
        <Route path="/StaffDetail/:id" element={<StaffDetail />} />
      </Routes>
    </Suspense>
  </>
));

// Staff Layout
const StaffLayout = withAuthenticationStaff(() => (
  <>
    <NavbarDb />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Staff />} />
        <Route path="/TaskPw" element={<TaskPw />} />
        <Route path="/TaskPb" element={<TaskPb />} />
        <Route path="/TaskList" element={<TaskList />} />
      </Routes>
    </Suspense>
  </>
));

export default App;
