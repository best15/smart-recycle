import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import axios from 'axios';
// const axios = require('axios').default;

import "../assets/styles/Home.css";

import { QUERY_CATEGORIES, QUERY_MATERIALS, QUERY_CATEGORIES_AND_MATERIALS } from '../utils/queries';



const Home = () => {

    // const { loading1, data1 } = useQuery(QUERY_CATEGORIES_AND_MATERIALS);
    // console.log(data1);
    // const categories1 = data1?.categories || [];

    // const [cat, mat] = useQuery([QUERY_CATEGORIES, QUERY_MATERIALS]);
    // const { loading, data } = cat;
    // const categories = data?.cat || [];

    // const queryMultiple = () => {
    //     const res1 = useQuery(QUERY_CATEGORIES);
    //     const res2 = useQuery(QUERY_MATERIALS);
    //     return [res1, res2];
    // }

    // const [
    //     { loading: loading1, data: data1 },
    //     { loading: loading2, data: data2 }
    // ] = queryMultiple()
    // const categories = data1?.categories || [];

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

    const [allMaterials, setAllMaterials] = useState(materials);
    const [selectedViewState, setSelectedViewState] = useState("search");
    const [selectedCategoryName, setSelectedCategory] = useState("Metal");
    const [selectedSearchMaterial, setSelectedSearchMaterial] = useState("");
    const [searchlocation, setSearchLocation] = useState("");

    const backtoSearch = async (event) => {

        setSelectedViewState("search");

    }

    const handleChangeSearchMaterials = async (event) => {
        setSelectedSearchMaterial(event.target.value);
    }

    const handleChangeSearchLocation = async (event) => {
        setSearchLocation(event.target.value);
    }

    const selectCategory = async (event) => {
        event.preventDefault();
        const selectedCategory = event.target;
        setSelectedCategory(selectedCategory.innerText);

    }

    const onClickSearch = async (event) => {

        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: searchlocation,
                    key: ''
                }
            }).then(function (response) {
                console.log(response);
                console.log(response.data.results[0].formatted_address, response.data.results[0].geometry.location);
            })
        } catch (error) {
            console.error(error);
        }
        console.log(searchlocation);

        setSelectedViewState("results");
    }


    const onClickMaterials = async (event) => {

        setSelectedSearchMaterial(event.target.innerText);

    }

    if (selectedViewState === "search") {
        return (

            <div className="home">

                <div className="page-header ui container">
                    <h2>SEARCH FIND AND RECYCLE </h2>
                </div>
                <div className=" ui grid container">
                    <div className="four wide column">
                        <div className="ui search">
                            <div className="ui large fluid icon input">
                                <input className="searchlocation prompt" value={searchlocation} onChange={handleChangeSearchLocation} type="text" placeholder="Location" />
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
                            {(categories.map((category) =>
                                <div className="results">{category.categoryname}</div>))}
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
                                category.materials.map((material) => <li key={material.materialname} className="items column" onClick={onClickMaterials}>{material.materialname}</li>))
                                : (<> </>)
                            ))}


                        </ul>

                    </div>
                </div>
            </div>
        )

    }
    else if (selectedViewState === "results") {

        return (
            <Fragment>
                <div className="container">
                    <div className="back">

                        <button className="ui  teal button" onClick={backtoSearch}>
                            <i className="arrow alternate circle left outline icon large fluid" onClick={backtoSearch} />
                            Back to Search
                        </button>
                    </div>
                    <div className="results">


                        <h1>Recycle Centers Nearby</h1>

                        <div className="ui one column grid">
                            <div className="row">
                                center
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
    else {
        return (<> </>);
    }

};
export default Home;