import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Set_index_edit } from "../../Redux/actions";

import css from "./ReadOnlyRow.module.css"; // id={css.} // className={css.}

export const copy = (e) =>  navigator.clipboard.writeText(e.target.innerHTML).then(alert("Copied!"));

const ReadOnlyRow = ({ item, index }) => 
{
  //REDUX
  const dispatch = useDispatch();
  const headers = useSelector( state => state.headers )

  //HANDLERS
  const handle_edit = () => dispatch( action_Set_index_edit(index) );
  const handle_delete = () => dispatch( action_Delete_item(item["Hauptartikelnr"]) )

  return (
    <tr className={index%2 ? css.readRow : css.readRowIp}>
      {
        headers.map((header, index) => {
          return (
            header === "Beschreibung" ? 
            <td key={index}  className={css.descriptionReadCell} onClick={copy}> <p>{item.Beschreibung}</p> </td> :
            <td key={index}  className={css.readCell} onClick={copy} > <p>{item[header]}</p> </td>
          );
        })
      }
      <td className={css.actionRow}>
        <button type="button" onClick={ handle_edit} >
          Edit
        </button>
        <button type="button" onClick={ handle_delete }>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
//owo-Ivanna estuvo aqui