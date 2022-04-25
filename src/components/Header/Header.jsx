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
        dispatch( action_Set_filter(e.target.value.toLowerCase()) );
    };
    const handleSearchChange = (e) => 
    {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    const handleChangeItems = () => dispatch( action_Set_type_list(!typeItem) );


    //DOWNLOAD CSV
    const DownloadNewCsv = () => {
      let csv = Papa.unparse(itemsOut);
      let blob = new Blob([csv], { type: "text/csv" });
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = "Artikel.csv";
      a.click();
    };

    return(
        <div id={css.headerCont}>
            <div id={css.typeShell}><button id={css.typeBut} onClick={handleChangeItems}><FontAwesomeIcon icon={typeItem ? faThLarge : faThList}/></button></div>

            <div id={css.searchShell}>
                <input type="text" value={searchInput} placeholder="Search" id={css.searchInput} onChange={(e) => handleSearchChange(e)}/>
                <button value={searchInput} id={css.searchButton} type="submit" onClick={(e) => Search(e)}><FontAwesomeIcon icon={ faSearch }/></button>
            </div>
            
            <div id={css.downloadShell}><h2 id={css.downloadBut} onClick={()=>DownloadNewCsv()}>Download</h2></div>
        </div>
    )
}