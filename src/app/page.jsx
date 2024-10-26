"use client";

import { fetchUserDetails, TodoItem } from "@/components/ServerComponents";
import { TodoForm } from "./addTodoForm";
import { useContext, useEffect } from "react";
import { Context } from "@/components/Clients";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const { user, userData, setUserData, setUser } = useContext(Context);

  useEffect(() => {
    const token = Cookies.get("token");
    console.log("token is", token);
    token ? setUser(token) : router.push("/login");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const task = await fetchUserDetails();
      setUserData(task.data);
    };
    fetchData();
  }, [user]);

  return (
    <div className="container">
      <TodoForm />
      <section className="todosContainer">
        {userData?.length > 0 ? (
          userData.map((task) => (
            <TodoItem
              key={task._id}
              title={task.title}
              description={task.description}
              id={task._id}
            />
          ))
        ) : (
          <p>No tasks available.</p>
        )}
      </section>
    </div>
  );
}
