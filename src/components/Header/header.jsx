
import React,{ useContext} from "react";
import { Link } from "react-router-dom";
import { context, server } from "../../main";
import axios from "axios";
import {toast} from "react-hot-toast";

const Header=()=>{
    const {name,isAuthenticated,setisAuthenticated,Loading,setLoading}=useContext(context);
    const LogoutHandler=async()=>{
        setLoading(true);
        try
        {
            const { data }=await axios.get(`${server}/user/logout`,{
                withCredentials: true,
            })
            toast.success(data.message);
            setisAuthenticated(false);
            setLoading(false);
        }catch (error){
            toast.error(error.response.data.message);
            console.log(error);
            setisAuthenticated(true);
            setLoading(false);
        }      
  }
  
    return(
       <nav className="header">
        <div style={{display:"flex", color: "white",alignItems:"center",justifyContent:"space-between",margin:"1mm"}}>
            <img src="../../../OIP.jpeg" alt="{ToDoApp}" className="logo" />
            <h3 style={{margin:"2mm"}}>To Do App</h3>
        </div>
        <div className="user-name">
            {name}
        </div>
        <article>
            <Link to="/" className="btn">Home</Link>
            <Link to="/profile">Profile</Link>
            {isAuthenticated==true?<button className="btn btn-remove" onClick={LogoutHandler} disabled={Loading}>LogOut</button>:
            <Link to="/login"  className="btn btn-login">Longin</Link>}   
        </article>
       </nav>
    )
}

export default Header;