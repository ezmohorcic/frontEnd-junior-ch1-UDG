import { faThLarge, faThList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { action_Set_filter, action_Set_type_list } from "../../Redux/actions";


export default function Header()
{

    //STATES
    const [searchInput, setSearchInput] = useState("");

    //REDUX
    const dispatch = useDispatch();
    const typeItem = useSelector( state => state.typeItem );

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
    const handleChangeItems = () => dispatch( action_Set_type_list(!typeItem) )

    return(
        <div className="SearchCont">
            <div>
                <input type="text" value={searchInput} placeholder="Search" id='searchInput' onChange={(e) => handleSearchChange(e)}/>
                <button value={searchInput} id='search_button' type="submit" onClick={(e) => Search(e)}>search</button>
            </div>
            <div><button onClick={handleChangeItems}><FontAwesomeIcon icon={typeItem ? faThLarge : faThList}/></button></div>
        </div>
    )
}