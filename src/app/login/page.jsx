"use client"
import axios from 'axios';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Context } from '@/components/Clients';
import Cookies from 'js-cookie';

const page = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword]= useState("");
  const router = useRouter();
  const {setUser} = useContext(Context);

  const token = Cookies.get('token');
  console.log("token is",token);  
  useEffect(()=>{
    token && router.push('/');
  },[token])

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`http://localhost:3000/api/auth/login`,{
        email,
        password
      },{withCredentials: true}); 
      setUser(response.userId);
      console.log("User registered successfully");
      router.push('/');
    }catch(e){
      console.error(e);
    }
    
  }

  return (
    <div className="login">
      <section>
        <form>
        <input type="email" value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
        <input type="password" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
        <button type="submit" onClick={(e)=>handleLogin(e)}>Login</button>
          
          <p>OR</p>
          <Link href={"register"}>New User</Link>
        </form>
      </section>
    </div>
  )
}

// export const metadata = {
//     title: "Login",
//     description: "This is the Login page of Todo App",
//   };
export default page
