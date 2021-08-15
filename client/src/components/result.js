import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_MATERIAL_RECYCLING_CENTRES, } from '../utils/queries';

import getDistanceFromLatLonInKm from '../utils/distance'

const Result = ({ selectedSearchMaterial, backtoSearch, selectedLatLon, searchLocation }) => {
    console.log(searchLocation);
    const recycling_materials = selectedSearchMaterial;

    const { loading, data } = useQuery(QUERY_MATERIAL_RECYCLING_CENTRES, {
        variables: { recycling_materials }
    });
    const materialRecycleCenters = data?.materialRecycleCenters || [];


    const allRecycleCentres = [];

    // Create new array of available recycle centres
    materialRecycleCenters.map((recycle_center) => {

        //Calculate distance between searched location and available recycle centres
        let distance = getDistanceFromLatLonInKm(selectedLatLon.lat, selectedLatLon.lng, recycle_center.lattitude, recycle_center.longitude)

        const newRecyclecentre = new Object();
        newRecyclecentre.name = recycle_center.name;
        newRecyclecentre.address = recycle_center.address;
        newRecyclecentre.distance = distance;

        allRecycleCentres.push(newRecyclecentre);
    })

    // sort Recycle Centres by distance
    const sortedRecyleCentres = allRecycleCentres.sort(function (a, b) {
        return a.distance - b.distance;
    })


    // Check received Recycle centers list
    if (!sortedRecyleCentres.length) {

        return (
            <div className="container">
                <div className="back">

                    <button className="ui  teal button" onClick={backtoSearch}>
                        <i className="arrow alternate circle left outline icon large fluid" />
                        Back to Search
                    </button>
                </div>
                {loading ? (<h3>Loading....</h3>) :
                    <h1 className="noResult-header">No Results Found For Material {selectedSearchMaterial}
                        <p className="noResult-sub-header">**Please provide name from the list** </p>
                    </h1>}
            </div>
        )
    }
    else {
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

                        <h1 className="result-header">Recycle Centres Nearby <p className="result-location">{searchLocation}</p> <p className="result-sub-header">For Material: {selectedSearchMaterial}</p></h1>
                        {/* <div className="ui grid">
                            <div>Incoming Lat: {selectedLatLon.lat}</div>
                            <div>Incoming Lon: {selectedLatLon.lng}</div>
                        </div> */}
                        {loading ? (<h3>Loading....</h3>) :
                            sortedRecyleCentres.map((recycle_center, index) => {
                                // let distance = getDistanceFromLatLonInKm(selectedLatLon.lat, selectedLatLon.lng, recycle_center.lattitude, recycle_center.longitude)
                                let url = "https://www.google.com/maps/search/?api=1&query=" + recycle_center.name;
                                return (
                                    <div key={index} className="ui  two column centered grid container">
                                        <div className="centre  column">
                                            <div className="info">
                                                <div className="name">{recycle_center.name.trim()}</div>
                                                <small className="address"><i className="fas fa-map-marker-alt"></i>
                                                    {recycle_center.address}</small>
                                                {/* <div> Lat: {recycle_center.lattitude}</div>
                                            <div> Lon: {recycle_center.longitude}</div> */}
                                            </div>
                                            <div className="direction">
                                                <strong>Distance: {Math.round(recycle_center.distance)}km</strong>
                                                <a href={url} target="_blank" className="row">
                                                    <button className=" big ui green button">Direction</button>
                                                </a>


                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                </div>
            </Fragment >
        )
    }
}

export default Result;