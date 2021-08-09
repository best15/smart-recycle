import React from 'react'
import "../assets/styles/Home.css"


const Home = () => (

    <div className="home">
        <div className="page-header ui container">
            <h2>Check Your Item, Find A Recycle Center</h2>
        </div>

        <div className="materials">
            <div className="category-section ui five column grid container">
                <div className="category   column">Electronics</div>
                <div className="category   column">Glass</div>
                <div className="category   column">Metal</div>
                <div className="category   column">Paper</div>
                <div className="category   column">Plastic</div>
                <div className="category   column">Organic Waste</div>
                <div className="category   column">Household</div>
                <div className="category   column">Hazardous</div>
                <div className="category   column">Automotive</div>
                <div className="category   column">Construction</div>
            </div>
            <div className="ui five column grid container">
                <ul className="row itemlist">
                    <li className="items column">Small Appliances</li>
                    <li className="items column">Plastic</li>
                    <li className="items column">Construction Materials</li>
                    <li className="items column">Cups</li>
                    <li className="items column">Batteries
                    </li>
                </ul>

            </div>
        </div>
    </div>
)

export default Home;