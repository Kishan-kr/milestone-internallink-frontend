
import React, { useState, createContext, useEffect, useContext } from "react";
export const LinkContext = createContext();

export const useLink = () => {
  return useContext(LinkContext);
}

function LinkProvider({children}) {
  const url = process.env.REACT_APP_BACKEND_URL;
  const [linksArray, setLinksArray] = useState([])
  const [linkItems, setLinkItems] = useState([])
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLinkItems(linksArray);
  
  // }, [linksArray])
  

  // 1 method to add new link 
  const addLink = async (linkObject) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-type': 'application/json', 'token': localStorage.getItem('token') },
      body: JSON.stringify(linkObject)
    };
    try {
      const response = await fetch(`${url}/link`, requestOptions);
      return response;
    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }

  // 2 method to update a link 
  const updateLink = async ( updateFields ) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'token': localStorage.getItem('token') },
      body: JSON.stringify(updateFields)
    };
    try {
      const response = await fetch(`${url}/link/`, requestOptions);
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }
  
  // 3 method to delete link 
  const deleteLink = async (linkId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'token': localStorage.getItem('token') },
      body: JSON.stringify(linkId)
    };

    try {
      const response = await fetch(`${url}/link/`, requestOptions);
      return response

    } catch (error) {
      console.log(error);
      return { 'error': 'Server error! Try again later' };
    }
  }

  // 4 method to fetch all links 
  const getAllLinks = async () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'token': localStorage.getItem('token') }
    };

    try {
      const response = await fetch(`${url}/link/`, requestOptions);
      const data = await response.json()
      if(!response.ok) {
        alert(data.error)
      }

      setLinkItems(data.links)
      setLinksArray(data.links)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return { 'error': 'Server error! Try again later' };
    }
  }

  return (
    <LinkContext.Provider
      value={{ 
        addLink, 
        updateLink, 
        deleteLink, 
        getAllLinks,
        linkItems, 
        setLinkItems, 
        linksArray,
        loading
      }}
    >
      {children}
    </LinkContext.Provider>
  )
}

export default LinkProvider;