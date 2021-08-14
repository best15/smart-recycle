import React, { Fragment, useState } from 'react';

import axios from 'axios';
// import distanceCalculator from "../utils/distance"
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
    const [selectedLatLon, setSelectedLatLon] = useState([]);

    const filteredMaterialList = () => {
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
        handleGooglePlacesAPI(event.target.value)
    }

    const handleGooglePlacesAPI = (place) => {

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
                setSelectedLatLon(response.data.results[0].geometry.location);
            } catch (error) {
                console.error(error);
            }
        }

        setSelectedViewState("results");
    }

    const handleAddressChange = (address) => {
        setSearchLocation(address)
    }


    const onClickMaterials = (event) => {
        setSelectedSearchMaterial(event.target.innerText);
        setFilteredList([])

    }

    if (selectedViewState === "search") {
        return (<Search
            searchLocation={searchLocation}
            handleAddressChange={handleAddressChange}
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
        return (<Result selectedSearchMaterial={selectedSearchMaterial} backtoSearch={backtoSearch} selectedLatLon={selectedLatLon} />)

    }
    else {
        return (<> </>);
    }

};
export default Home;