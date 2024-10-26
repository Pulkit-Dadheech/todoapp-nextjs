"use client";

import Link from "next/link";
import { createContext, useContext, useState } from "react";
import { deleteTask } from "./ServerComponents";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";



export const Context = createContext({ user: {} });
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData,setUserData]= useState([]);
  return (
    <Context.Provider value={{ user, setUser,userData,setUserData }}>{children}</Context.Provider>
  );
};

export const LogoutButton = () => {
  const { user } = useContext(Context);
  const router = useRouter();
  const logoutHandler = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };
  console.log(user);
  return user ? (
    <button onClick={logoutHandler} className="btn">
      Logout
    </button>
  ) : (
    <Link href={"/login"}>Login</Link>
  );
};

export const TodoButton = ({ id, completed }) => {
  const {setUserData} = useContext(Context);
  const handleDelete=async(id)=>{
    const taskDelete = await deleteTask(id);
    if(taskDelete.success){
      setUserData((userData)=>userData.filter((user)=>user._id !== id));
    }
  }
  return (
    <>
      <input type="checkbox" checked={completed} />
      <button className="btn" onClick={()=>handleDelete(id)}>
        Delete
      </button>
    </>
  );
};

