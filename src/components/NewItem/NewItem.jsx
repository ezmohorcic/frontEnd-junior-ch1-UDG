import React from "react";




export default function NewItem({headers,addShow,setAddShow,handleAddFormSubmit,handleAddFormChange})
{
    const newInputType =["normalNewWidth", "normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","normalNewWidth","bigNewWidth"] ;

    return(
        <form onSubmit={handleAddFormSubmit} className={addShow ? "add" : "addBelow"} >
        <div id='addOut' onClick={()=>setAddShow(!addShow)}> <p>X</p> </div>
        <div id='addCard'>
          {
            headers.map((e,i) => {
              return (
              i !== 15 ? <input className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
              :
              <textarea className={'addNewInput '+ newInputType[i]} type={e} name={e} placeholder={e} onChange={handleAddFormChange} />
            )})
          }     
          <button id='addSubmit' type="submit">Add</button> 
        </div> 
       
      </form>
    )
}