import React from 'react'

const SearchAutoComplete = ({ filteredList, handleMaterialClick }) => {
    return (
        <ul id="results" className={(filteredList && filteredList.length > 0) ? 'show' : 'hide'}>
            {(filteredList) && filteredList.map((material, index) => (
                <li key={index}><button onClick={handleMaterialClick}>{material}</button></li>
            ))}
        </ul>
    )
}

export default SearchAutoComplete;