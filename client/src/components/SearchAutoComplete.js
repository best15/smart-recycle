import React from 'react'

const SearchAutoComplete = ({ filteredList, handleMaterialClick, selectedSearchMaterial }) => {
    return (
        <ul id="results" className={(filteredList && filteredList.length > 0) && selectedSearchMaterial ? 'show' : 'hide'}>
            {(filteredList) && filteredList.map((material, index) => (
                <li key={index}><button onClick={handleMaterialClick}>{material}</button></li>
            ))}
        </ul>
    )
}

export default SearchAutoComplete;