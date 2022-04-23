import React from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function ItemsShow()
{
  //REDUX
  // const dispatch = useDispatch();
  const page = useSelector (state => state.page);
  const items = useSelector (state => state.items.slice((page-1)*10,page*10));
  const indexOfEdit = useSelector (state => state.indexOfEdit)

  //VARIABLES FOR DISPLAY
  const headers = headers.map((header) => <th key={header}>{header}</th>)

  return(
    <form  className="table_form">
    <table>
      <thead> <tr id='listHead'> {headers} <th>Actions</th> </tr> </thead>
      <tbody>
        {
        items.map((item, index) => {
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