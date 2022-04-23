import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action_Last_page, action_Next_page, action_Set_page } from '../../Redux/actions';


import css from './PagesHud.module.css';

export function PageButtons()
{
    //REDUX
    const dispatch = useDispatch();
    const page = useSelector (state => state.page);
    const items = useSelector (state => state.items.items);
    //CTEs
    const pageBounds = Math.ceil(items.length/10);


    //HANDLERS 
    function handleLastPage() { if(page!==1) dispatch( action_Last_page() ); }
    function handleNextPage() { if(page!==pageBounds) dispatch( action_Next_page() ); }
    function handleMiddlePage(e,newPage) { dispatch( action_Set_page(newPage) ); }

    //VARIABLES FOR DISPLAY
    let lastPageShow='';
    let nextPageShow='';
    let middlePage='';

    //LOGIC FOR DISPLAY
    if(page!==0){lastPageShow=<button className='pageButs' id="lastPageShell" onClick={()=>{handleLastPage()}}>{"<"}</button>}
    if(page+1!==pageBounds){nextPageShow=<button className='pageButs' id="nextPageShell" onClick={()=>{handleNextPage()}}>{">"}</button>}
    
    
    if(page===1)
    {
        middlePage= (
        <div>
            <button>1</button>
            <button onClick={(e)=>handleMiddlePage(e,2)}>2</button>
        </div>)
    }
    else if(page===pageBounds)
    {
        middlePage= (
        <div>
            <button onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button>
            <button >{page}</button> 
        </div>)
    }
    else
    {
        middlePage= (
        <div>
            <button onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button>
            <button >{page}</button>
            <button onClick={(e)=>handleMiddlePage(e,(page+1))}>{page+1}</button>
        </div>)
    }
    
    return(
        <div id={css.pageButsContainer}>
            <div className="pageButsShell leftPageShell">{lastPageShow}</div>
            {middlePage}
            <div className="pageButsShell rightPageShell">{nextPageShow}</div>
            <button>/ {pageBounds}</button>
        </div>
    )
}