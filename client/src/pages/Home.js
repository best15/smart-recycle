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
    const [selectedCategoryName, setSelectedCategory] = useState("Automotive");
    const [selectedSearchMaterial, setSelectedSearchMaterial] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [filteredList, setFilteredList] = useState([]);
    const [selectedLatLon, setSelectedLatLon] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);


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


    const handleChangeSearchMaterials = (event) => {
        setSelectedSearchMaterial(event.target.value)
        filteredMaterialList()

    }

    const onClickMaterials = (event) => {
        setSelectedSearchMaterial(event.target.innerText);
        setFilteredList([])

    }

    //back to landing page
    const backtoSearch = async (event) => {
        setSelectedSearchMaterial("");
        setSearchLocation("");
        setSelectedViewState("search");
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

        let allMaterialName = [];
        materials.map((material) => {
            allMaterialName.push(material.materialname.toLowerCase());
        })
        const checkMaterial = allMaterialName.includes(selectedSearchMaterial.toLowerCase());

        if (searchLocation === '') {
            setErrorMessage("Please Enter location");
        }
        else if (selectedSearchMaterial === '') {
            setErrorMessage("Please Select Materials");
        }
        else if (!checkMaterial) {
            setErrorMessage("Material not in the list");
        }
        // Get search locations and coordinates
        else {
            try {
                const response = await axios.get(`/api/location/${searchLocation}`)
                setSelectedLatLon(response.data.results[0].geometry.location);
                setSearchLocation(response.data.results[0].formatted_address);
            } catch (error) {
                console.error(error);
            }
            setErrorMessage("");
            setSelectedViewState("results");
        }


    }

    const handleAddressChange = (address) => {
        setSearchLocation(address)
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
            errorMessage={errorMessage}
        />)


    }
    else if (selectedViewState === "results") {
        return (<Result selectedSearchMaterial={selectedSearchMaterial}
            backtoSearch={backtoSearch}
            selectedLatLon={selectedLatLon}
            searchLocation={searchLocation} />)

    }
    else {
        return (<> </>);
    }

};
export default Home;