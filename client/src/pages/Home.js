import React, { Fragment, useState } from 'react';

import axios from 'axios';
import distanceCalculator from "../utils/distance"
import Search from '../components/search';
import Result from '../components/result';

import { useQuery } from '@apollo/client'
import { QUERY_MATERIALS } from '../utils/queries';

import "../assets/styles/Home.css";





const Home = () => {
    const { loading, data } = useQuery(QUERY_MATERIALS);
    const materials = data?.materials || [];

    const [selectedViewState, setSelectedViewState] = useState("search");
    const [selectedCategoryName, setSelectedCategory] = useState("Metal");
    const [selectedSearchMaterial, setSelectedSearchMaterial] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [filteredList, setFilteredList] = useState([]);

    // console.log(materials)
    const filteredMaterialList = () => {
        console.log('only work onchange')
        let allMaterials = [];

        if (!loading) {
            materials.forEach(element => {
                allMaterials.push(element.materialname)
            });
            const regex = new RegExp(`^${selectedSearchMaterial}`, 'i');
            setFilteredList(allMaterials.sort().filter(i => regex.test(i)))
        }

        return filteredList
    }


    //back to landing page
    const backtoSearch = async (event) => {
        setSelectedSearchMaterial("");
        setSelectedViewState("search");
    }

    const handleChangeSearchMaterials = (event) => {
        setSelectedSearchMaterial(event.target.value)
        filteredMaterialList()

    }

    const handleChangeSearchLocation = (event) => {
        setSearchLocation(event.target.value);
    }

    const selectCategory = (event) => {
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


    const onClickMaterials = (event) => {
        setSelectedSearchMaterial(event.target.innerText);
        setFilteredList([])

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
            filteredList={filteredList}
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