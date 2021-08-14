import React, { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_MATERIAL_RECYCLING_CENTRES, } from '../utils/queries';

const Result = ({ selectedSearchMaterial, backtoSearch }) => {

    const recycling_materials = selectedSearchMaterial;

    const { loading, data } = useQuery(QUERY_MATERIAL_RECYCLING_CENTRES, {
        variables: { recycling_materials }
    });
    const materialRecycleCenters = data?.materialRecycleCenters || [];
    console.log(materialRecycleCenters);



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

                    {selectedSearchMaterial ? (<h1 className="search-header">Recycle Centres Nearby <p className="sub-header">Material: {selectedSearchMaterial}</p></h1>) : (<h1 className="search-header">Recycle Centres Nearby</h1>)}

                    {loading ? (<h3>Loading....</h3>) :
                        materialRecycleCenters.map((recycle_center) => (
                            <div key={recycle_center._id} className=" ui  two column centered grid container">
                                <div className="centre  column">
                                    <div className="info">
                                        <div className="name">{recycle_center.name.trim()}</div>
                                        <div className="address"><i className="fas fa-map-marker-alt"></i>
                                            {recycle_center.address}</div>
                                    </div>
                                    <button className="direction big ui green button">Direction
                                        {/* <a src='https://www.google.com/maps/search/?api=1&query=optus+stadium' className="row">
                            Get Direction
                        </a> */}
                                    </button>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </Fragment>
    )

}

export default Result;