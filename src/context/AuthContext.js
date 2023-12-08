
import React, { useState, createContext, useEffect, useContext } from "react";
export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

function AuthProvider({children}) {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({ _id: '', email: '', role: ''});

  // 1 login method for authentication 
  const login = async (email, password) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    try {
      const response = await fetch(`${url}/user/login`, requestOptions);
      return response;
    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }

  // 2 registration 
  const register = async ( email, password ) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    try {
      const response = await fetch(`${url}/user/`, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }
  
  // 3 method to fetch user details 
  const fetchUser = async (token) => {
    const requestOptions = {
      accept: '/',
      method: 'GET',
      headers: { 'token': token }
    };

    try {
      const response = await fetch(`${url}/user/`, requestOptions);
      const data = await response.json();
      if (data.user) {
        setUser(data.user);
      }

    } catch (error) {
      console.log(error);
    }
  }

  // 6 change password when already logged in
  const changePassword = async (currentPassword, newPassword) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
      body: JSON.stringify({ currentPassword, newPassword })
    };
    try {
      const response = await fetch(`${url}/user/change-password`, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
      fetchUser(token);
    }

    setLoading(false);

  }, [loggedIn])

  return (
    <AuthContext.Provider
      value={{
        login, 
        register, 
        changePassword,
        user, 
        setUser,
        fetchUser, 
        loggedIn, 
        setLoggedIn,  
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;