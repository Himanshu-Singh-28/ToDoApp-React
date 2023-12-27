import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/app.scss';
import { createContext } from 'react';


export const server="https://nodejs-todoapp-3yo1.onrender.com/api/v1";

export let context=createContext({isAuthenticated: false});

const AppWrapper=()=>{
  let [isAuthenticated,setisAuthenticated]=useState(false);
  let [Loading,setLoading]=useState(false);
  let [User,setUser]=useState({});
  let [name,setname]=useState("");

  return(
  <context.Provider value={
    {isAuthenticated,
    setisAuthenticated,
    Loading,
    setLoading,
    User,
    setUser,
    name,
    setname,
  }
  }>
    <App />
</context.Provider>);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper/>
  </React.StrictMode>,
)
