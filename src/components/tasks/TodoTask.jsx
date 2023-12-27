import React from 'react'

const TodoTask = ({title,description,isCompleted,updateHandler,deleteHandler,id}) => {
   

  return (
    <div className={isCompleted?"todo done": "todo yet"}>
        <div>
            <h1 style={{color: isCompleted?"darkgreen":"red"}}>{title}</h1>
            <p style={{color:"blueviolet"}}>{description}</p>
        </div>
        <div>
            <input  type="checkbox" checked={isCompleted} onChange={()=>updateHandler(id)} />
            <button  className="btn btn-remove" onClick={()=>deleteHandler(id)}>REMOVE</button>
        </div>
    </div>
  )
}

export default TodoTask