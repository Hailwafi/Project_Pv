import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const withAuthenticationKepala = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {


    // Tambahkan pengalihan jika pengguna tidak terotentikasi
    if (localStorage.getItem('token') == "") {
      return <Navigate to="/login" />;
    }
   
    if (localStorage.getItem('role') != "Kepala") {
      return <Navigate to="/login" />;
    }

    // Kembalikan komponen terotentikasi jika pengguna terotentikasi
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuthenticationKepala;
