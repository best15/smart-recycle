import React, { Fragment, useState } from 'react';

import axios from 'axios';
import distanceCalculator from "../utils/distance"
import Search from '../components/search';
import Result from '../components/result';

import "../assets/styles/Home.css";





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


    const [selectedViewState, setSelectedViewState] = useState("search");
    const [selectedCategoryName, setSelectedCategory] = useState("Metal");
    const [selectedSearchMaterial, setSelectedSearchMaterial] = useState("");
    const [searchLocation, setSearchLocation] = useState("");



    //back to landing page
    const backtoSearch = async (event) => {
        setSelectedSearchMaterial("");
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

        // console.log(distanceCalculator(-31.93452, 115.8859545, -31.9106372, 115.8251195));

        // Get search locations and coordinates
        if (searchLocation) {
            try {
                const response = await axios.get(`/api/location/${searchLocation}`)


                console.log(response);
                console.log(response.data.results[0].formatted_address, response.data.results[0].geometry.location);

            } catch (error) {
                console.error(error);
            }
        }

        setSelectedViewState("results");
    }


    const onClickMaterials = async (event) => {

        setSelectedSearchMaterial(event.target.innerText);

    }

    if (selectedViewState === "search") {
        return (<Search
            searchLocation={searchLocation}
            handleChangeSearchLocation={handleChangeSearchLocation}
            handleChangeSearchMaterials={handleChangeSearchMaterials}
            selectedSearchMaterial={selectedSearchMaterial}
            onClickSearch={onClickSearch}
            selectedCategoryName={selectedCategoryName}
            selectCategory={selectCategory}
            onClickMaterials={onClickMaterials}
        />)


    }
    else if (selectedViewState === "results") {
        return (<Result selectedSearchMaterial={selectedSearchMaterial} backtoSearch={backtoSearch} />)

    }
    else {
        return (<> </>);
    }

};
export default Home;