"use client"
import { Context } from '@/components/Clients';
import { addNewTask } from '@/components/ServerComponents';
import axios from 'axios';
import React, { useContext, useState } from 'react'

export const TodoForm = () => {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const {userData,setUserData} = useContext(Context);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    const newTaskData = await addNewTask({title,description});
    setUserData((userData)=>[...userData,newTaskData.data.data]);
  }
  return (
    <div className="login">
      <section>
        <form>
          <input type="text" placeholder="Task Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <input type="text" placeholder="Task Description" value={description} onChange={(e)=>setDescription(e.target.value)} />
          <button type="submit" onClick={(e)=>handleSubmit(e)}>Add Task</button>          
        </form>
      </section>
    </div>
  )
}

