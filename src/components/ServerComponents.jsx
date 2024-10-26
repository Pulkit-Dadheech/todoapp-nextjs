import React from 'react'
import { TodoButton } from './Clients'
import axios from 'axios';

export const TodoItem = ({title,description,id,completed}) => {
  return (
    <div className="todo">
      <div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div>
        <TodoButton id={id} completed={completed}/>
      </div>
    </div>
  )
}

export const fetchUserDetails = async () => {
  try {
    const userDetails = await axios.get('http://localhost:3000/api/getUserDetails', { withCredentials: true });
    console.log("userDetails",userDetails);
    return userDetails.data;
  } catch (e) {
    console.log('Error fetching user', e);
  }
};

export const addNewTask = async({title,description})=>{
  try{
    const response = await axios.post(`http://localhost:3000/api/newtask`,{title,description},{withCredentials: true});
    console.log("Task added successfully",response);
    return response;
  }
  catch(error){
    console.log(error);
  }
}

export const deleteTask = async({id})=>{

  try{
    const response = await axios.post(`http://localhost:3000/api/deletetask`,{taskId: id},{withCredentials: true});
    console.log('Task deleted successfully');
    return {success: true};
  }
  catch(e){
    return {success: false,error: e};
  }

}




