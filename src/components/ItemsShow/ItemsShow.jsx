import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ReadOnlyRow from "../RowItem/ReadOnlyRow";
import EditableRow from "../EditableRow/EditableRow";

export default function ItemsShow()
{
  //REDUX
  // const dispatch = useDispatch();
  const page = useSelector (state => state.page);
  const items = useSelector (state => state.items);
  const indexOfEdit = useSelector (state => state.indexOfEdit);
  const headers = useSelector( state => state.headers );

  //VARIABLES FOR DISPLAY
  const headersShow = headers.map((header) => <th key={header}>{header}</th>)

  return(
    <form  className="table_form">
    <table>
      <thead> <tr id='listHead'>{headersShow}<th>Actions</th></tr> </thead>
      <tbody>
        {
        items.items.slice((page-1)*10,page*10).map((item, index) => {
          return (
            <Fragment>
              {index === indexOfEdit ? (
                <EditableRow index ={index} item = {item}/>
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