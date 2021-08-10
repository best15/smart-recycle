const db = require('../config/connection');
const { User, Category, RecycleCenter } = require('../models');
const categoryseeds = require('./categorySeeds.json')


db.once('open', async () => {
    try {
        await Category.deleteMany({});


        await Category.create(categoryseeds);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('Categories seeded');
    process.exit(0);
});

// db.once('open', async () => {
//     try {

//         await User.deleteMany({});

//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }

//     console.log('all done!');
//     process.exit(0);
// });
