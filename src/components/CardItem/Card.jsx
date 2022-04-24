import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Delete_item, action_Reset__card_detailed, action_Set_index_edit, action_Set__card_detailed } from "../../Redux/actions";
import copy from "../RowItem/ReadOnlyRow.jsx";

import css from "./Card.module.css"

export const DetailedCard = () =>
{
  //REDUX
  const dispatch = useDispatch();
  const indexOfDetailed = useSelector(state => state.indexOfDetailed);
  const indexOfEdit = useSelector(state => state.indexOfEdit);
  const items = useSelector( state => state.items.items );

  //HANDLERS
  const handleOut = () =>
  {
    dispatch( action_Reset__card_detailed() );
  }

  return(
    <div id={indexOfDetailed!==-1 ? css.cardDetailedCont : css.cardDeailedUnder}>
      <div onClick={handleOut}>X</div>
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
