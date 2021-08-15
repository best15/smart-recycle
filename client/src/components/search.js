import React from 'react';
import { useQuery } from '@apollo/client';
import SearchAutoComplete from './SearchAutoComplete'
import LocationAutoComplete from './LocationAutoComplete'



import { QUERY_CATEGORIES, } from '../utils/queries';


const Search = ({
    searchLocation,
    handleAddressChange,
    handleChangeSearchMaterials,
    selectedSearchMaterial,
    onClickSearch,
    selectedCategoryName,
    selectCategory,
    onClickMaterials,
    filteredList,
    errorMessage
}) => {

    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];


    return (

        <div className="home">

            <div className="page-header ui container">
                <h2>SEARCH FIND AND RECYCLE </h2>
            </div>
            {errorMessage && (<h3 className="errorMessage ">{errorMessage}</h3>)}
            <div className=" ui grid container">
                <div className="four wide column">
                    <LocationAutoComplete address={searchLocation} onChange={handleAddressChange} />
                </div>
                <div className="eight wide column">
                    <div className="ui searchwrap search">
                        <div className="ui large fluid icon input">
                            <input className="searchmaterial prompt" type="text" placeholder="Search materials like plastic,glass..." value={selectedSearchMaterial} onChange={handleChangeSearchMaterials} />
                            <i className="search icon" />
                        </div>
                        <SearchAutoComplete filteredList={filteredList} handleMaterialClick={onClickMaterials} selectedSearchMaterial={selectedSearchMaterial} />
                    </div>
                </div>
                <div className="four wide column">
                    <button className="ui large fluid teal white button" onClick={onClickSearch}>
                        Search
                    </button>
                </div>
            </div>

            <div className="materials">
                <div className="category-section ui five column grid container">
                    {loading ? (<h3>Loading....</h3>) :
                        (categories.map((category) => (
                            <div key={category._id}
                                className={selectedCategoryName === category.categoryname ? "category column selected" : "category column"}
                                onClick={selectCategory}>{category.categoryname}</div>
                        )))}

                </div>
                <div className="ui five column grid container">
                    <ul className="row itemlist">

                        {(categories.map((category) => (category.categoryname === selectedCategoryName) && (
                            category.materials.map((material) => <li key={material._id} className="items column" onClick={onClickMaterials}>{material.materialname}</li>))
                        ))}
                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Search;