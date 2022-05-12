import { faSearch, faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Set_filter, action_Set_type_list } from "../../Redux/actions";
import Papa from 'papaparse';

import css from "./Header.module.css"; // id={css.} // className={css.}

export default function Header()
{

    //STATES
    const [searchInput, setSearchInput] = useState("");

    //REDUX
    const dispatch = useDispatch();
    const typeItem = useSelector( state => state.typeItem );
    const itemsOut = useSelector( state => state.items.items );
    
    //HANDLERS
    const Search = (e) => 
    {
        e.preventDefault(); 
        dispatch( action_Set_filter(searchInput.toLowerCase()) );
    };
    const handle_search_change = (e) => 
    {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const handle_change_items = () => dispatch( action_Set_type_list(!typeItem) );


    //DOWNLOAD CSV
    const download_new_csv = () => {
      let csv = Papa.unparse(itemsOut);
      let blob = new Blob([csv], { type: "text/csv" });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "Artikel.csv";
      a.click();
    };

    return(
        <header id={css.headerCont}>
            <div id={css.typeShell}><button id={css.typeBut} onClick={handle_change_items}><FontAwesomeIcon icon={typeItem ? faThLarge : faThList}/></button></div>

            <div id={css.searchShell}>
                <input type="text" value={searchInput} placeholder="Search" id={css.searchInput} onChange={handle_search_change}/>
                <button value={searchInput} id={css.searchButton} type="submit" onClick={Search}><FontAwesomeIcon icon={ faSearch }/></button>
            </div>
            
            <div id={css.downloadShell}><h2 id={css.downloadBut} onClick={download_new_csv}>Download</h2></div>
        </header>
    )
}