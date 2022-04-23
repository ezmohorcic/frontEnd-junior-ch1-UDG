import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ReadOnlyRow from "../RowItem/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";
import { ERROR, LOADING } from "../../Redux/consts";


const pagination = (page) => [(page-1)*10,page*10]

const filter_and_order = (array,options) =>
{
  let out=[];
  options.filter!=="" ? 
    out = array.filter( (item) => Object.keys(item).some( (key) => String(item[key]).toLowerCase().includes(options.filter))) 
      : 
    out = array;

  options.order.length ?
    out = out.sort(
    (a, b) => options.order[1]==="alph" ?  a[options.order[0]].localeCompare(b[options.order[0]]) : b[options.order[0]].localeCompare(a[options.order[0]]) ) 
      : 
    out = out ;
  return out;
}

export default function ItemsShow()
{
  //REDUX
  const page = useSelector (state => state.page);
  const items = useSelector (state => state.items);
  const indexOfEdit = useSelector (state => state.indexOfEdit);
  const headers = useSelector( state => state.headers );
  const options = useSelector( state => state.options)

  //VARIABLES FOR DISPLAY
  const headersShow = headers.map((header) => <th key={header}>{header}</th>)
  const itemsShow = filter_and_order(items.items,options).slice(...pagination(page));

  //LOADING AND ERROR STATUS RETURN
  if( items.status === LOADING) return( <div> LOADING CVS...</div>)
  if( items.status === ERROR) return( <div> ERROR ON CVS...</div>)
  //RETURN
  return(
    <form  className="table_form">
    <table>
      <thead> <tr id='listHead'>{headersShow}<th>Actions</th></tr> </thead>
      <tbody>
        {
        itemsShow.map((item, index) => {
          return (
            <Fragment key={"row_"+index}>
              {index === indexOfEdit ? (
                <EditableRow index={index} editFormData={item}/>
              ) : (
                <ReadOnlyRow index={index} item={item}/>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  </form>
  )
}