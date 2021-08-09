import React from 'react'
import "../assets/styles/Home.css"


const Home = () => (

    <div className="home">
        <div className="page-header ui container">
            <h2>Check Your Item, Find A Recycle Center</h2>
        </div>

        <div className="ui grid container">
            <div className="category four wide column">Electronics</div>
            <div className="category four wide column">Glass</div>
            <div className="category four wide column">Metal</div>
            <div className="category four wide column">Paper</div>
            <div className="category four wide column">Plastic</div>
            <div className="category four wide column">Organic Waste</div>
            <div className="category four wide column">Household</div>
            <div className="category four wide column">Packaging</div>
        </div>
    </div>

)

export default Home;