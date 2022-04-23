import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Set_index_edit } from "../../Redux/actions";

const ReadOnlyRow = ({ item, index }) => 
{
  //REDUX
  const dispatch = useDispatch();
  const headers = useSelector( state => state.headers )

  return (
    <tr className="readRow">
      {
        headers.map((header, index) => {
          return (
            header === "Beschreibung" ? 
            <td key={index} className="descriptionReadRow"> <p>{item.Beschreibung}</p> </td> :
            <td key={index} className={header}>{item[header]}</td>
          );
        })
      }
      <td className="actionsRow">
        <button type="button" onClick={(event) => dispatch( action_Set_index_edit(index) )}>
          Edit
        </button>
        <button type="button" onClick={(event) => dispatch( action_Delete_item(item["Hauptartikelnr"]) )}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
//owo-Ivanna estuvo aqui