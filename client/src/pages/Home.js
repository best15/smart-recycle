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

    return (

        <div className="home">
            <div className="page-header ui container">
                <h2>SEARCH FIND AND RECYCLE </h2>
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