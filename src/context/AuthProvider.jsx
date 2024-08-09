/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://13.60.171.7:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status) {
        localStorage.setItem('authToken', data.token);
        setUser({ email, token: data.token, userType: data.user.userType });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    return signOut(auth);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setUser({ token });
    }
    setLoading(false);
  }, []);

  const authInfo = {
    user,
    loading,
    login,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
