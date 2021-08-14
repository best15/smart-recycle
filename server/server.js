require('dotenv').config()
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const axios = require('axios');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/api/location/:location', async (req, res) => {

    try {
        const { data } = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: req.params.location,
                key: process.env.APP_ID
            }
        })
        res.json(data)

    } catch (error) {
        console.error(error);
    }
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
    console.log("Database connection successfull");
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
});
