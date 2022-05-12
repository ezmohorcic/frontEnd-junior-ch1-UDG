import React, { useState } from "react";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReadOnlyRow from "../RowItem/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";
import { ERROR, LOADING } from "../../Redux/consts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { action_Set_order } from "../../Redux/actions";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Card } from "../CardItem/Card";

import css from "./ItemsShow.module.css"; // id={css.} // className={css.}

const pagination = (page) => [(page-1)*10,page*10];
const outerLocalCompare = (a,b,order) =>
{
    if(a[order] && b[order]) return a[order].localeCompare(b[order]);
    if (a[order] && !b[order]) return -1;
    if (!a[order] && b[order]) return 1;
    if (!a[order] && !b[order]) return 0;
    return 0
}
const handle_filter_inner = (filter) => (item) => Object.keys(item).some( (key) => String(item[key]).toLowerCase().includes(filter)) ;
const handle_order_inner = (order) => (first, second) => order[1] ?  outerLocalCompare(first, second, order[0]) : outerLocalCompare  (second, first, order[0]) ; 


const filter_and_order = (array,options) =>
{
  const filterReducer = handle_filter_inner(options.filter)
  const orderReducer = handle_order_inner(options.order)

  return array.filter( filterReducer ).sort( orderReducer ) 
}

function ListHeader({header})
{
  //STATES
  const [type,setType] = useState(false);

  //REDUX
  const dispatch = useDispatch();

  //HANDLERS
  const handle_order = (e) =>
  {
    e.preventDefault();
    dispatch( action_Set_order( [header,!type]) );
    setType(!type);
  }

  return <th className={css.listHead}  key={header}><button value={header} onClick={handle_order}>{header} <FontAwesomeIcon icon={ type? faCaretUp: faCaretDown }/></button></th>
}

const ListHeaders = () => useSelector( state => state.headers ).map((header,index) => <ListHeader key={"header_"+index} header={header}/>);


export default function ItemsShow()
{
  //REDUX
  const page = useSelector (state => state.page);
  const items = useSelector (state => state.items);
  const indexOfEdit = useSelector (state => state.indexOfEdit);
  const typeItem = useSelector ( state => state.typeItem);
  const options = useSelector( state => state.options)
  
  //VARIABLES FOR DISPLAY
  const itemsShow = filter_and_order(items.items,options).slice(...pagination(page));

  const cardType = <div id={css.cardsCont}>{itemsShow.map((item, index) =>  <Card key={"Card_"+index} index={index} item={item}/> )}</div> 

  const listType = (
    itemsShow.map((item, index) => {
      return (
        <Fragment key={"row_"+index}>
          {index === indexOfEdit ? ( <EditableRow index={index} editFormData={item}/> ) : ( <ReadOnlyRow index={index} item={item}/> )}
        </Fragment>
      );
    })
  );
  
  //LOADING AND ERROR STATUS RETURN
  if( items.status === LOADING) return( <div id={css.status}> LOADING CVS...</div>)
  if( items.status === ERROR) return( <div id={css.status}> ERROR ON CVS...</div>)

  //RETURN
  return(
    <form  id={css.table_form}>
    <table id={css.innerTable}>
      <thead><tr id={css.listHeadTr}><ListHeaders/><th className={css.listHead} ><button >Actions</button></th></tr></thead>
      { typeItem ? "" : <tbody>{listType}</tbody> }
    </table>
    {typeItem ? cardType : ""}
  </form>
  )
}