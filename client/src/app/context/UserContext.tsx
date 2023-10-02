import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  // Initialize userData from localStorage if available
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    name: 'Name',
    email: 'email@example.com',
    isLoggedIn: false,
  };

  const [userData, setUserData] = useState(initialUserData);

  // Use useEffect to keep localStorage in sync with userData changes
  useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;