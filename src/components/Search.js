import {useState} from "react";
import React from "react";

//Handles interaction with the search bar, including submitting and clearing search values.
function Search(props) {
    const [searchValue, setSearchValue] = useState("");

    //Manages the values entered into the search field
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }

    //Clears the search field
    const resetInputField = () => {
        setSearchValue("");
    }

    //Calls the search function passed via the component's prop and clears the search field
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(searchValue);
        resetInputField();
    }

    return(
        <form className="search">
            <input value={searchValue} onChange={handleSearchInputChanges} type="text" className="search-bar" />
            <input onClick={callSearchFunction} type="submit" value="SEARCH" />
        </form>
    )
}

export default Search;