import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import "../assets/styles/Home.css";

import { QUERY_CATEGORIES } from '../utils/queries';

const Home = () => {

    let [selectedCategoryName, setSelectedCategory] = useState("Metal");

    const { loading, data } = useQuery(QUERY_CATEGORIES);
    const categories = data?.categories || [];


    const onClickCategory = async (event) => {
        event.preventDefault();
        const selectedCategory = event.target;
        setSelectedCategory(selectedCategoryName = selectedCategory.innerText);

    }

    const onClickSearch = async () => {
        const location = document.querySelector(".location").value.trim();
        const material = document.querySelector(".material").value.trim();

    }

    return (

        <div className="home">

            <div className="page-header ui container">
                <h2>SEARCH FIND AND RECYCLE </h2>
            </div>
            <div className=" ui grid container">
                <div className="four wide column">
                    <div className="ui search">
                        <div className="ui large fluid icon input">
                            <input className="location prompt" type="text" placeholder="Location" />
                            <i className="search icon" />
                        </div>
                        <div className="results"></div>
                    </div>
                </div>
                <div className="eight wide column">
                    <div className="ui search">
                        <div className="ui large fluid icon input">
                            <input className="material prompt" type="text" placeholder="Search materials like plastic,glass..." />
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
                                onClick={onClickCategory}>{category.categoryname}</div>
                        )))}

                </div>
                <div className="ui five column grid container">
                    <ul className="row itemlist">

                        {(categories.map((category) => (category.categoryname === selectedCategoryName) ? (
                            <li key={category._id} className="items column">{category.categoryname}</li>) : (<> </>)
                        ))}


                    </ul>

                </div>
            </div>
        </div>
    )
};

export default Home;