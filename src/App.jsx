import Header from './components/Header/header'
import Home from './components/home/home'
import{ BrowserRouter,Routes,Route} from "react-router-dom"
import Profile from './components/pages/Profile';
import Login from './components/pages/login';
import Register from './components/pages/register';
import {Toaster} from "react-hot-toast";
import { useContext, useEffect } from 'react';
import axios  from 'axios';
import { context, server } from './main';

function App() {

  const {User,setUser,setisAuthenticated,setLoading,name,setname,isAuthenticated,Loading}=useContext(context);
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/user/me`,{
      withCredentials: true,
    }).then(res=>{
      setUser(res.data.user);
      setisAuthenticated(true);
      setLoading(false);
    }).catch((error)=>{
      setUser({});
      setisAuthenticated(false);
      setLoading(false);
    })
  },[name,""])
  useEffect(()=>{
    if(isAuthenticated){
        setname(User.name);
        console.log(name);
    }else{
        setname("");
    }
  },[Loading]);
  return (
    <BrowserRouter>
        <Header/>
        <Routes>
           <Route path="/" element={<Home/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/register" element={<Register/>}/>
        </Routes>
        <Toaster/>
        
    </BrowserRouter>
    
  );
}

export default App
