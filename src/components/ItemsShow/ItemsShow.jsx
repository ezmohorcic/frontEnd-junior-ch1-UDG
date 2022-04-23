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

const pagination = (page) => [(page-1)*10,page*10];
const outerLocalCompare = (a,b,order) =>
{
    if(a[order] && b[order]) return a[order].localeCompare(b[order]);
    else if (a[order] && !b[order]) return -1;
    else if (!a[order] && b[order]) return 1;
    else if (!a[order] && !b[order]) return 0;
    else return 0
}

const filter_and_order = (array,options) =>
{
  let out=[];
  options.filter!=="" ? 
    out = array.filter( (item) => Object.keys(item).some( (key) => String(item[key]).toLowerCase().includes(options.filter))) 
      : 
    out = array;

  options.order.length ?
    out = out.sort(
    (a, b) => options.order[1]===true ?  outerLocalCompare(a,b,options.order[0]) : outerLocalCompare  (b,a,options.order[0]) ) 
      : 
    out = out ;
  return out;
}



function ListHeader({header})
{
  //STATES
  const [type,setType] = useState(false);

  //REDUX
  const dispatch = useDispatch();

  //HANDLERS
  const handleOrder = (e) =>
  {
    e.preventDefault();
    dispatch( action_Set_order( [header,!type]) );
    setType(!type);
  }

  return <th  key={header}><button value={header} onClick={handleOrder}>{header} <FontAwesomeIcon icon={ type? faCaretUp: faCaretDown }/></button></th>
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

  const cardType = (
    itemsShow.map((item, index) => {
      return (
        <Card index={index} item={item}/>   
      );
    })
  );
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
  if( items.status === LOADING) return( <div> LOADING CVS...</div>)
  if( items.status === ERROR) return( <div> ERROR ON CVS...</div>)
    console.log(typeItem)
  //RETURN
  return(
    <form  className="table_form">
    <table>
      <thead><tr id='listHead'><ListHeaders/><th>Actions</th></tr></thead>
      <tbody>
        { typeItem ? "" : listType }
      </tbody>
    </table>
    {typeItem ? cardType : ""}
  </form>
  )
}