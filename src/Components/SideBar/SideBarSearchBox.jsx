import React from 'react'
import SearchIcon from '@material-ui/icons/Search';

function SideBarSearchBox({query,handleQuery}) {
    
    
    return (
        <div className="SideBarSearchBox">
            <div className="searchBox flexBox">
                <SearchIcon className="searchIcon"/>
                <input type="text" value={query} onChange={handleQuery} placeholder="Search or start new conversation"/>
            </div>
        </div>
    ) //Rendering search bar
}

export default SideBarSearchBox
