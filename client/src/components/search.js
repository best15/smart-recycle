import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';



import { QUERY_CATEGORIES, } from '../utils/queries';


const Search = ({
    searchLocation,
    handleChangeSearchLocation,
    handleChangeSearchMaterials,
    selectedSearchMaterial,
    onClickSearch,
    selectedCategoryName,
    selectCategory,
    onClickMaterials
}) => {


    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];


    //Get all materials
    function getMaterials() {
        let materials = [];
        categories.map((category) => {
            category.materials.map((material) => {
                materials.push(material.materialname);
            })
        })
        return materials;
    }

    const materials = getMaterials();

    const [allMaterials, setAllMaterials] = useState("");




    return (

        <div className="home">

            <div className="page-header ui container">
                <h2>SEARCH FIND AND RECYCLE </h2>
            </div>
            <div className=" ui grid container">
                <div className="four wide column">
                    <div className="ui search">
                        <div className="ui large fluid icon input">
                            <input className="searchlocation prompt" value={searchLocation} onChange={handleChangeSearchLocation} type="text" placeholder="Location" />
                            <i className="search icon" />
                        </div>
                        <div className="results"></div>
                    </div>
                </div>
                <div className="eight wide column">
                    <div className="ui search">
                        <div className="ui large fluid icon input">
                            <input className="searchmaterial prompt" type="text" placeholder="Search materials like plastic,glass..." value={selectedSearchMaterial} onChange={handleChangeSearchMaterials} />
                            <i className="search icon" />
                        </div>
                        <div className="results"></div>

                    </div>
                </div>
                <div className="four wide column">
                    <button className="ui large fluid teal button" onClick={onClickSearch}>
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

                        {(categories.map((category) => (category.categoryname === selectedCategoryName) ? (
                            category.materials.map((material) => <li key={material._id} className="items column" onClick={onClickMaterials}>{material.materialname}</li>))
                            : (<> </>)
                        ))}


                    </ul>

                </div>
            </div>
        </div>
    )
}

export default Search;