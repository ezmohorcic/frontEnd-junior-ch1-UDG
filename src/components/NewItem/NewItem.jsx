import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";



export default function NewItem({addShow,setAddShow,handleAddFormSubmit,handleAddFormChange})
{
  //REDUX
  const headers = useSelector( state => state.headers );

  //STATES
  const [newItem,setNewItem] = useState({});

  //CTEs
  const newInputType =["normalNewWidth", "normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","bigNewWidth"] ;
  
  return(
      <form onSubmit={handleAddFormSubmit} className={addShow ? "add" : "addBelow"} >
      <div id='addOut' onClick={()=>setAddShow(!addShow)}> <p>X</p> </div>
      <div id='addCard'>
        {
          headers.map((e,i) => {
            return (
            i !== 15 ? <input key={"newInput-"+i} className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
            :
            <textarea key={"newInput-"+i} className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
          )})
        }     
        <button id='addSubmit' type="submit">Add</button> 
      </div> 
     
    </form>
  )
}