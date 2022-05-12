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
    const [jumpPage, setJumPage] = useState(page);

    //CTEs
    const pageBounds = Math.ceil(items.length/10);

    //HANDLERS 
    const handle_last_page = () => 
    { 
        if(page!==1) 
        {
            setJumPage(page-1);
            dispatch( action_Last_page() );
        } 
    
    }
    const handle_next_page = () => 
    { 
        if(page!==pageBounds) 
        {
            setJumPage(page+1);
            dispatch( action_Next_page() );
        } 
    
    }
    const handler_jump_page = ({target}) =>
    {
        const middlePage = target.value? target.value : 1;

        setJumPage(middlePage);
        dispatch( action_Set_page(parseInt(middlePage)) )

    }

    //VARIABLES FOR DISPLAY
    const pageShow = 
    {
        left: <button className='pageButs' id="lastPageShell" > <FontAwesomeIcon icon={ faChevronLeft }/> </button> ,
        right: <button className='pageButs' id="nextPageShell"> <FontAwesomeIcon icon={ faChevronRight }/> </button>
    }
    
    return(
        <footer id={css.pageButsContainer}>
            {page!==1 && <div onClick={handle_last_page} id={css.leftPage}>{pageShow.left}</div>}

            {page+1!==pageBounds && <div onClick={handle_next_page} id={css.rightPage}>{pageShow.right}</div>}

            <div id={css.allPagesShell}>
                <p>Jump to: </p>
                <input type="number" name="currentPage" value={jumpPage} onChange={handler_jump_page} min={"1"} max={pageBounds} id={css.jumpPage}  />
                <button id={css.allPages}>/ {pageBounds}</button>
            </div>      
        </footer>
    )
}