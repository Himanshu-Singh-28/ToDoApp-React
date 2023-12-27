import  axios  from "axios";
import React ,{ useContext, useEffect, useState } from "react";
import {Navigate} from "react-router-dom";
import { context, server } from "../../main";
import toast from 'react-hot-toast';
import TodoTask from "../tasks/TodoTask";

const Home = () => {
  const [Task, setTask] = useState("");
  const [Description, setDescription] = useState("");
  const [loading,setLoading]=useState(false);
  const [taskdata,setTaskData]=useState([]);
  const [refresh,setRefresh]=useState(false);
  const [login,setLogin]=useState(false);
  const {isAuthenticated}=useContext(context);
  

  const updateHandler=(id)=>{
      axios.put(`${server}/task/${id}`,{},{
        withCredentials: true,
      }).then(res=>{
        toast.success(res.data.message);
        setRefresh(!refresh);
      }).catch(error=>{
        toast.error(error.response.data.message);
        setRefresh(!refresh);
      })
  }

  const deleteHandler=(id)=>{
    const want=confirm("Do You Wnat To Remove the Task");
    if(want){
      axios.delete(`${server}/task/${id}`,{
        withCredentials: true,
      }).then(res=>{
        toast.success(res.data.message);
        setRefresh(!refresh);
      }).catch(error=>{
        toast.error(error.response.data.message);
        setRefresh(!refresh);
      })
    }
    
  }

  const submitHandler=async(e)=>{
    e.preventDefault();
    setLoading(true);
    try {
        const {data}=await axios.post(`${server}/task/new`,{
            title: Task,
            description: Description,
        },{
            withCredentials: true,
        })
        toast.success(data.message);
        setLoading(false);
        setTask("");
        setDescription("");
    } catch (error) {
        toast.error(error.response.data.message);
        setLoading(false);
    }
  };

  useEffect(()=>{
    axios.get(`${server}/task/mytask`,{
        withCredentials: true,
    }).then(res=>{
        setTaskData(res.data.task);
    }).catch(error=>{
        setTaskData([]);
    })
    
  },[ refresh ,taskdata])

  if(login){
    return <Navigate to={"/login"}/>
  }


  return (
    <>
      <div>
        <div className="login">
          <section>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="Task"
                value={Task}
                onChange={(e) => setTask(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Task Description"
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <button type="submit" disabled={loading} onClick={()=>{
                if(!isAuthenticated){ 
                  toast.error("Login first");
                  setLogin(true);
                }
              }}>Add Task</button>
            </form>
          </section>
        </div>

        <section className="todosContainer">
            {
                taskdata.map((i)=>(
                    <TodoTask title={i.title} description={i.description}  isCompleted={i.isCompleted}
                    updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id}/>
                ))
            }
        </section>
      </div>
    </>
  );
};

export default Home;
