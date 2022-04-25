import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { action_Change_new, action_New_item } from "../../Redux/actions";

import css from "./NewItem.module.css"; // id={css.} // className={css.}

const newItemInit = (newItem,element) =>{ return {...newItem,[element]:""}}

export default function NewItem()
{
  //REDUX
  const dispatch = useDispatch();
  const headers = useSelector( state => state.headers );
  const addShow = useSelector( state => state.showNew);

  //STATES
  const [newItem,setNewItem] = useState({});

  useEffect(()=>
  { 
    setNewItem( headers.reduce(newItemInit,{}) )
  },[addShow]);

  //CTEs
  //const newInputType =["normalNewWidth", "normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","bigNewWidth"] ;
  
  //HANDLERS
  const handleAddFormChange = (e) =>
  {
    setNewItem({...newItem,[e.target.getAttribute("name")]:e.target.value})
  }
  const handleSubmitNew = (e) =>
  {
    e.preventDefault();
    dispatch( action_New_item(newItem) );
    //dispatch(action_Change_new());
  }
  const handlerShowNew = ()=>dispatch(action_Change_new());
  
  return(
      <div className={addShow ? css.add : css.addBelow} >
        <div id={css.addOut} onClick={handlerShowNew}> <p>X</p> </div>
        <div id={css.addCard}>
          {
            headers.map((e,i) => {
              return (
              i !== 3 ? <input key={"newInput-"+i} className={`${css.addNewInput} ${css.normalNewWidth}`} value={newItem[e] ? newItem[e] : ""} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
              :
              <textarea key={"newInput-"+i} className={`${css.addNewInput} ${css.bigNewWidth}`} value={newItem[e] ? newItem[e] : ""} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
            )})
          }     
        <button id={css.addSubmit} type="submit" onClick={handleSubmitNew}>Add</button> 
      </div> 
     
    </div>
  )
}