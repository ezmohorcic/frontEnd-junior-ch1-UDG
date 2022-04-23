import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { action_Set_filter } from "../../Redux/actions";


export default function Header()
{

    //STATES
    const [searchInput, setSearchInput] = useState("");

    //REDUX
    const dispatch = useDispatch();

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

    return(
        <div className="SearchCont">
            <input type="text" value={searchInput} placeholder="Search" id='searchInput' onChange={(e) => handleSearchChange(e)}/>
            <button value={searchInput} id='search_button' type="submit" onClick={(e) => Search(e)}>search</button>
        </div>
    )
}