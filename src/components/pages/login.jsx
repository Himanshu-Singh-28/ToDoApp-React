import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { context, server } from '../../main';
import {toast} from "react-hot-toast";
import { Navigate } from "react-router-dom";


const Login = () => {
  const [Email,setEmail]=useState("");
  const [Password,setPassword]=useState("");
  const {isAuthenticated,setisAuthenticated,Loading,setLoading}=useContext(context);

  const LoginHandler=async(e)=>{
        e.preventDefault();
        setLoading(true);
        try
        {
            const { data }=await axios.post(`${server}/user/login`,{
                email: Email,
                password: Password
            },{
                withCredentials: true,
            })
            toast.success(data.message);
            setisAuthenticated(true);
            setLoading(false);
        }catch (error){
            toast.error(error.response.data.message);
            console.log(error);
            setisAuthenticated(false);
            setLoading(false);
        }      
  }
  if(isAuthenticated==true){
        return <Navigate to={"/"}/>
    }
  return (
    <div className="login">
        <section>
            <form onSubmit={LoginHandler}>
                <input 
                    type="email" 
                    placeholder='Email'
                    value={Email} 
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password" 
                    placeholder='password'
                    value={Password} 
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
                <button type='submit' disabled={Loading}>Submit</button>
                <h4>Or</h4>
                <Link to="/register">Sing Up</Link>
            </form>
        </section>
    </div>
  )
}

export default Login;