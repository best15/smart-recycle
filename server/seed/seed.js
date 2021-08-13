const db = require('../config/connection');
const { User, Category, Material, RecycleCenter } = require('../models');
const categoryseeds = require('./categorySeeds.json')
const recycleCenterSeeds = require('./recycleCenterSeeds.json')


db.once('open', async () => {
    try {
        // await Category.deleteMany({});

        await RecycleCenter.deleteMany({});

        await RecycleCenter.create(recycleCenterSeeds);

        // await Category.create(categoryseeds);
        // await Material.create(materialseeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Recycle Centers Seeded!');
    process.exit(0);
});

