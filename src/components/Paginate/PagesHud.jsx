import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action_Last_page, action_Next_page, action_Set_page } from '../../Redux/actions';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import css from './PagesHud.module.css'; // id={css.} // className={css.}

export function PageButtons()
{
    //REDUX
    const dispatch = useDispatch();
    const page = useSelector (state => state.page);
    const items = useSelector (state => state.items.items);

    //STATE
    let jumpPage=page;

    //CTEs
    const pageBounds = Math.ceil(items.length/10);


    //HANDLERS 
    function handleLastPage() { if(page!==1) dispatch( action_Last_page() ); }
    function handleNextPage() { if(page!==pageBounds) dispatch( action_Next_page() ); }
    function handleMiddlePage(e,newPage) { dispatch( action_Set_page(newPage) ); }
    const handlerJumpPage = (e) =>
    {
        jumpPage = e.target.value;
        dispatch( action_Set_page(parseInt(e.target.value)) )
    }

    //VARIABLES FOR DISPLAY
    let lastPageShow='';
    let nextPageShow='';
    let middlePage='';

    //LOGIC FOR DISPLAY
    if(page!==0){lastPageShow=<button className='pageButs' id="lastPageShell" onClick={()=>{handleLastPage()}}><FontAwesomeIcon icon={ faChevronLeft }/></button>}
    if(page+1!==pageBounds){nextPageShow=<button className='pageButs' id="nextPageShell" onClick={()=>{handleNextPage()}}><FontAwesomeIcon icon={ faChevronRight }/></button>}
    
    
    if(page===1)
    {
        middlePage= (
        <div id={css.middleShell}>
            <button id={css.currentPage}>1</button>
            <button className={css.sidePages} onClick={(e)=>handleMiddlePage(e,2)}>2</button>
        </div>)
    }
    else if(page===pageBounds)
    {
        middlePage= (
        <div id={css.middleShell}>
            <button id={css.currentPage} onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button>
            <button className={css.sidePages}>{page}</button> 
        </div>)
    }
    else
    {
        middlePage= (
        <div id={css.middleShell}>
            <button className={css.sidePages} onClick={(e)=>handleMiddlePage(e,(page-1))}>{page-1}</button>
            <button id={css.currentPage}>{page}</button>
            <button className={css.sidePages} onClick={(e)=>handleMiddlePage(e,(page+1))}>{page+1}</button>
        </div>)
    }
    
    return(
        <div id={css.pageButsContainer}>
            <div id={css.leftPage}>{lastPageShow}</div>
            {middlePage}
            <div id={css.rightPage}>{nextPageShow}</div>

            <div id={css.allPagesShell}>
                <p>Jump to: </p>
                <input type="number" name="currentPage" value={jumpPage} onChange={handlerJumpPage} min={"1"} max={pageBounds} id={css.jumpPage}  />
                <button id={css.allPages}>/ {pageBounds}</button>
            </div>
            
        </div>
    )
}