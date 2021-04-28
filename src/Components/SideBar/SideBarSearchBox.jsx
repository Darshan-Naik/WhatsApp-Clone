import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

function SideBarSearchBox({query,handleQuery}) {
    
    //Rendering search bar
    return (
        <div className="SideBarSearchBox">
            <div className="searchBox flexBox">
                <SearchIcon className="searchIcon"/>
                <input type="email" value={query} onChange={handleQuery} placeholder="Search or start new conversation"/>
            </div>
        </div>
    )
}

export default SideBarSearchBox
