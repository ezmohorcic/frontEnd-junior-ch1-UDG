import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Edit_item, action_Reset_index_edit } from "../../Redux/actions";

import css from "./EditableRow.module.css"; // id={css.} // className={css.}

const EditableRow = ({editFormData, index}) => 
{

  //STATES
  const [itemEdited,setItemEdited] = useState({...editFormData});

  //REDUX
  const headers = useSelector( state => state.headers );
  const dispatch = useDispatch();

  //HANDLERS 
  const handleEdit = ({preventDefault,target}) =>
  { 
    preventDefault();
    setItemEdited({...itemEdited, [target["name"]]:target.value});
  }
  const handleCancel = (e) =>
  { 
    e.preventDefault();
    dispatch( action_Reset_index_edit() );
  }
  const handleSave = (e)=>
  {
    e.preventDefault();
    dispatch( action_Edit_item({index,itemEdited}) );
    dispatch( action_Reset_index_edit() );
  }

  return (
    <tr className={css.editableRow}>
      {
        headers.map((header, index) => {
          return (
            header === "Beschreibung" ? 
            <td key={"tdEdit_"+index} className={css.BeschreibungCell}  id={index}>
              <textarea index={index} type="text" placeholder={header} className={css.BeschreibungEdit} name="Beschreibung" value={itemEdited[header]} onChange={handleEdit}/>
            </td> 
            :
            <td key={"tdEdit_"+index}  className={css.editableCell} id={index}>
              <textarea index={index} type="text" placeholder={header} name={header} value={itemEdited[header]} onChange={handleEdit}/>
            </td>
          )
        })
      }
      <td className={css.actionsEditRow} >
        <button type="submit" onClick={handleSave}>Save</button>
        <button type="button" onClick={handleCancel}> Cancel</button>
      </td>
    </tr>
  );
};
export default EditableRow;
