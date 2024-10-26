"use client"
import Link from 'next/link';
import React, { useState } from 'react'

const page = () => {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword]= useState("");

  const handleRegister = async(e) =>{
    e.preventDefault();
    try{
      const data = {name,email,password};
      const response = await fetch(`${process.env.BASE_URL}/api/auth/register`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })

      if(!response.ok) throw new Error('Network response not ok')

      const registeredData = await response.json();
      setName("");
      setEmail("");
      setPassword("");
      console.log("User registered successfully",registeredData);
    }catch(e){
      console.error(e);
    }
  }

  return (
    <div className="login">
      <section>
        <form>
          <input type="text" value={name} placeholder="Enter Username" onChange={(e)=>setName(e.target.value)}/>
          <input type="email" value={email} placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" value={password} placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} />
          <button type="submit" onClick={(e)=>handleRegister(e)}>Register</button>
          
          <p>OR</p>
          <Link href={"/login"}>Login</Link>
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
