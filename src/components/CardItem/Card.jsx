import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Set_index_edit } from "../../Redux/actions";
import copy from "../RowItem/ReadOnlyRow.jsx";


export const DetailedCard = () =>{}


export const Card = ({ item, index }) => 
{
  //REDUX
  const dispatch = useDispatch();
  const header = useSelector( state=> state.header );

  return(
    <div className="cardItemCont">
            
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
