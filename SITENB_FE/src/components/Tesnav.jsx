import { useState, useEffect } from 'react';

function Navbar() {
  const [role, setRole] = useState('');

  useEffect(() => {

    const userRole = localStorage.getItem('role'); 
    setRole(userRole); 
  }, []);

  return (
    <nav>
      <ul>
        {role === 'admin' && (
          <>
            <li>Dashboard</li>
            <li>Manage Users</li>
          </>
        )}

        {role === 'user' && (
          <>
            <li>Home</li>
            <li>Profile</li>
          </>
        )}

        {!role && (
          <>
            <li>Login</li>
            <li>Register</li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
