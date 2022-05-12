import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Edit_item, action_Reset_index_edit, action_Reset__card_detailed, action_Set_index_edit, action_Set__card_detailed } from "../../Redux/actions";


import css from "./Card.module.css" // id={css.} // className={css.}

const copy = (e) =>  navigator.clipboard.writeText(e.target.innerHTML).then(alert("Copied!"));
 
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
  useEffect(()=> { if(indexOfEdit !== -1) setItemEdited({...items[indexOfEdit]}) },[indexOfEdit]);

  //HANDLERS
  const handle_out = () => dispatch( action_Reset__card_detailed() );
  
  const handle_edit = ({target}) => setItemEdited({...itemEdited, [target["name"]]:target.value});
  
  const handle_cancel = (e) =>
  { 
    e.preventDefault();
    dispatch( action_Reset_index_edit() );
  }
  const handle_save = (e)=>
  {
    e.preventDefault();
    dispatch( action_Edit_item({index:indexOfDetailed,itemEdited:itemEdited}) );
    dispatch( action_Reset_index_edit() );
  }

  //VARIABLES FOR DISPLAY
  const editingButs = (
    <div className={css.detailedHudCont}>
        <button id={css.leftBut} type="submit" onClick={handle_save}>Save</button>
        <button id={css.rightBut} type="button" onClick={handle_cancel}> Cancel</button>
    </div>
  );
  const detailedButs = (
    <div className={css.detailedHudCont}>
      <button id={css.leftBut} type="button" onClick={(e) => dispatch( action_Set_index_edit(indexOfDetailed) )}>
        Edit
      </button>
      <button id={css.rightBut} type="button" onClick={(e) => dispatch( action_Delete_item(items[indexOfDetailed]["Hauptartikelnr"]) )}>
        Delete
      </button>
    </div>
  );
  const innerEdit = indexOfEdit !== -1 ? (
    headers.map((header, index) => {
      return (
        header === "Beschreibung" ? 
        <div className={css.BeschreibungCellEdit} key={"tdEdit_"+index} id={index}>
          <p className={css.headerP}>{header}</p>
          <textarea className={css.BeschreibungCellInput} index={index} type="text" placeholder={header} id="BeschreibungEdit" name="Beschreibung" value={itemEdited[header]} onChange={handle_edit}/>
        </div> 
        :
        <div className={css.editableCell} key={"tdEdit_"+index}  id={index}>
          <p className={css.headerP}>{header}</p>
          <textarea className={css.editableInput} index={index} type="text" placeholder={header} name={header} value={itemEdited[header]} onChange={handle_edit}/>
        </div>
      )
    })
  ) : "";
  const innerInfo = indexOfDetailed!== -1 ? (        
    headers.map((header, index) => {
      return (
      header === "Beschreibung" ? 
      <div key={index} className={css.detailedDescriptionReadRow}> <p className={css.headerP}>{header}</p> <p className={css.infoP}>{items[indexOfDetailed].Beschreibung}</p> </div> :
      <div key={index} className={css.detailedReadRow} onClick={copy}> <p className={css.headerP}>{header}</p> <p className={css.infoP}>{header + items[indexOfDetailed][header]}</p></div>
    );
  })) : "" ;



  return(
    <section id={indexOfDetailed!==-1 ? css.cardDetailedCont : css.cardDeailedUnder}>
      <div id={css.cardDetailedBack} onClick={handle_out}> <FontAwesomeIcon icon={ faTimes }/></div>
      <div id={css.cardDetailed}>
        {indexOfEdit!==-1 ? innerEdit : innerInfo }
        {indexOfEdit!==-1 ? editingButs : detailedButs}
      </div>
    </section>
  )
}


export const Card = ({ item, index }) => 
{
  //REDUX
  const dispatch = useDispatch();

  //HANDLERS
  const handle_open_detailed = () => dispatch( action_Set__card_detailed(index))
  const handle_edit = () => dispatch( action_Set_index_edit(index) )
  const handle_delete = () => dispatch( action_Delete_item(item["Hauptartikelnr"]) )

  return(
    <div className={css.cardItemCont} onClick={handle_open_detailed}>
            
      <div className={css.infoShell}>
        <p className={css.cardNumber}>{item["Hauptartikelnr"]}</p>
        <p className={css.cardName}>{item["Artikelname"]}</p>
        <p className={css.cardDescrip}>{item["Beschreibung"]}</p>
      </div>

      <div className={css.cardHudShell}>
        <button className={css.cardEdit} type="button" onClick={ handle_edit }>
          Edit
        </button>
        <button className={css.cardDelete} type="button" onClick={ handle_delete }>
          Delete
        </button>
      </div>
    </div>
  );
};
