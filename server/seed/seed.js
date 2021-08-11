const db = require('../config/connection');
const { User, Category, Material, RecycleCenter } = require('../models');
const categoryseeds = require('./categorySeeds.json')
const materialseeds = require('./materialsSeeds.json')


db.once('open', async () => {
    try {
        await Category.deleteMany({});
        await Material.deleteMany({});


        // await Category.create(categoryseeds);
        // await Material.create(materialseeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Categories and Materials Deleted');
    process.exit(0);
});

