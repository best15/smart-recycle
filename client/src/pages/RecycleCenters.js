import React, { useState } from 'react';

import "../assets/styles/Center.css";

const RecycleCenters = () => {


    return (

        <div className="centerlist" >
            <h3>Recycling Centers</h3>
            <div className=" ui container">

                <div class="ui list">
                    <div class="center-details item">
                        <div class="header">New York City</div>
                        A lovely city
                    </div>
                    <div class="item">
                        <div class="header">Chicago</div>
                        Also quite a lovely city
                    </div>
                    <div class="item">
                        <div class="header">Los Angeles</div>
                        Sometimes can be a lovely city
                    </div>
                    <div class="item">
                        <div class="header">San Francisco</div>
                        What a lovely city
                    </div>
                </div>
            </div>
        </div>
    )


}

export default RecycleCenters;