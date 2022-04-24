import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Edit_item, action_Reset_index_edit, action_Reset__card_detailed, action_Set_index_edit, action_Set__card_detailed } from "../../Redux/actions";
import copy from "../RowItem/ReadOnlyRow.jsx";

import css from "./Card.module.css"

export const DetailedCard = () =>
{
  //STATES
  const [itemEdited,setItemEdited] = useState({});

  //REDUX
  const dispatch = useDispatch();
  const indexOfDetailed = useSelector(state => state.indexOfDetailed);
  const indexOfEdit = useSelector(state => state.indexOfEdit);
  const items = useSelector( state => state.items.items );
  const headers = useSelector( state => state.headers );
  //UPDATE
  useEffect(()=>
  {
    if(indexOfEdit !== -1) setItemEdited({...items[indexOfEdit]})
  },[indexOfEdit]);

  //HANDLERS
  const handleOut = () => dispatch( action_Reset__card_detailed() );
  
  const handleEdit = (e) =>
  { 
    e.preventDefault();
    setItemEdited({...itemEdited, [e.target.getAttribute("name")]:e.target.value});
  }
  const handleCancel = (e) =>
  { 
    e.preventDefault();
    dispatch( action_Reset_index_edit() );
  }
  const handleSave = (e)=>
  {
    console.log(indexOfDetailed,itemEdited)
    e.preventDefault();
    dispatch( action_Edit_item({index:indexOfDetailed,itemEdited:itemEdited}) );
    dispatch( action_Reset_index_edit() );
  }

  //VARIABLES FOR DISPLAY
  const editingButs = (
    <div className={css.detailedHudCont}>
        <button type="submit" onClick={(e)=>{handleSave(e)}}>Save</button>
        <button type="button" onClick={(e)=>{handleCancel(e)}}> Cancel</button>
    </div>
  );
  const detailedButs = (
    <div className={css.detailedHudCont}>
      <button type="button" onClick={(e) => dispatch( action_Set_index_edit(indexOfDetailed) )}>
        Edit
      </button>
      <button type="button" onClick={(e) => dispatch( action_Delete_item(items[indexOfDetailed]["Hauptartikelnr"]) )}>
        Delete
      </button>
    </div>
  );
  const innerEdit = indexOfEdit !== -1 ? (
    headers.map((header, index) => {
      return (
        header === "Beschreibung" ? 
        <td key={"tdEdit_"+index} className="BeschreibungCell" id={index}>
          <textarea index={index} type="text" placeholder={header} id="BeschreibungEdit" name="Beschreibung" value={itemEdited[header]} onChange={(e)=>{handleEdit(e)}}/>
        </td> 
        :
        <td key={"tdEdit_"+index}  className="editableCell" id={index}>
          <textarea index={index} type="text" placeholder={header} name={header} value={itemEdited[header]} onChange={(e)=>{handleEdit(e)}}/>
        </td>
      )
    })
  ) : "";
  const innerInfo = indexOfDetailed!== -1 ? (        
    headers.map((header, index) => {
      return (
      header === "Beschreibung" ? 
      <td key={index} className="descriptionReadRow"> <p>{items[indexOfDetailed].Beschreibung}</p> </td> :
      <td key={index} onClick={copy} className={header}>{items[indexOfDetailed][header]}</td>
    );
  })) : "" ;



  return(
    <div id={indexOfDetailed!==-1 ? css.cardDetailedCont : css.cardDeailedUnder}>
      <div id={css.cardDetailedBack} onClick={handleOut}>X</div>
      <div id={css.cardDetailed}>
        {indexOfEdit!==-1 ? innerEdit : innerInfo }
        {indexOfEdit!==-1 ? editingButs : detailedButs}
      </div>
    </div>
  )
}


export const Card = ({ item, index }) => 
{
  //REDUX
  const dispatch = useDispatch();
  const header = useSelector( state=> state.header );

  //HANDLERS
  const handleOpenDetailed = () => dispatch( action_Set__card_detailed(index))

  return(
    <div className="cardItemCont" onClick={handleOpenDetailed}>
            
      <div>
        <p>{item["Artikelname"]}</p>
        <p>{item["Beschreibung"]}</p>
      </div>

      <div>
        <button type="button" onClick={(event) => dispatch( action_Set_index_edit(index) )}>
          Edit
        </button>
        <button type="button" onClick={(event) => dispatch( action_Delete_item(item["Hauptartikelnr"]) )}>
          Delete
        </button>
      </div>
    </div>
  );
};
