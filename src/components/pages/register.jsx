import axios  from 'axios';
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { context, server } from '../../main';
import {toast} from "react-hot-toast";

const Register = () => {
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Password,setPassword]=useState("");
    const {isAuthenticated,setisAuthenticated,Loading,setLoading}=useContext(context);

    const SubmitHandler= async (e)=>{
        e.preventDefault();
        setLoading(true);
        try
        {
            const {data}=await axios.post(`${server}/user/register`,{
                name: Name,
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
    if(isAuthenticated){
        return <Navigate to="/" />
    }
  return (
    <div className="login">
        <section>
            <form onSubmit={SubmitHandler}>
                <input 
                    value={Name} 
                    onChange={(e)=> setName(e.target.value)}
                    type="text" 
                    placeholder='Name' 
                    required
                />
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
                <button type='submit' disabled={Loading}>Register</button>
                <h4>Or</h4>
                <Link to="/login">Log In</Link>
            </form>
        </section>
    </div>
  )
}

export default Register