import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { action_Change_new, action_New_item } from "../../Redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

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

  useEffect( ()=> setNewItem( headers.reduce( newItemInit,{} ) ) , [addShow] );

  //HANDLERS
  const handle_add_form_change = (e) => setNewItem({...newItem,[e.target.getAttribute("name")]:e.target.value})
 
  const handle_submit_new = (e) =>
  {
    e.preventDefault();
    dispatch( action_New_item(newItem) );
  }

  const handler_show_new = ()=> dispatch(action_Change_new());
  
  return(
      <aside className={addShow ? css.add : css.addBelow} >
        <div id={css.addOut} onClick={handler_show_new}> <FontAwesomeIcon icon={ faTimes } /> </div>
        <div id={css.addCard}>
          {
            headers.map((e,i) => {
              return (
              e !== "Beschreibung" ? <input key={"newInput-"+i} className={`${css.addNewInput} ${css.normalNewWidth}`} value={newItem[e] ? newItem[e] : ""} type={e} name={e} placeholder={e} onChange={handle_add_form_change} />
              :
              <textarea key={"newInput-"+i} className={`${css.addNewInput} ${css.bigNewWidth}`} value={newItem[e] ? newItem[e] : ""} type={e} name={e} placeholder={e} onChange={handle_add_form_change} />
            )})
          }     
        <button id={css.addSubmit} type="submit" onClick={handle_submit_new}>Add</button> 
      </div> 
     
    </aside>
  )
}