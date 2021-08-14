const db = require('../config/connection');
const { User, Category, Material, RecycleCenter } = require('../models');
const categorySeed = require('./categorySeeds.json')
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





// db.once('open', async () => {

//     let newCategory;
//     let newMaterial;


//     categorySeed.map(async (category, index) => {
//         let sanitizedName = category.categoryname.trim();
//         console.log(category);
//         try {
//             console.log("check");
//             let categoryCheck = await Category.findOne({ categoryname: sanitizedName });
//             console.log("check", categoryCheck);
//             if (!categoryCheck) {
//                 newCategory = await Category.create({ categoryname: sanitizedName });
//                 console.log("category", newCategory);
//             } else {
//                 newCategory = categoryCheck
//             }
//         } catch {
//             return
//         }

//         if (category.materialnames) {
//             category.materialnames.map(async (materialname) => {
//                 let sanitizedMaterialName = materialname.trim();
//                 try {
//                     let checkMaterial = await Material.findOne({ materialname: sanitizedMaterialName });

//                     if (!checkMaterial) {
//                         newMaterial = await Material.create({ materialname: sanitizedMaterialName });
//                         console.log("material", newMaterial);
//                     } else {
//                         newMaterial = checkMaterial
//                     }
//                 } catch {
//                     return
//                 }
//                 const updateCategory = await Category.findOneAndUpdate({ categoryname: sanitizedName }, { $addToSet: { materials: newMaterial._id } })
//                 if (updateCategory) {
//                     console.log('Category updated with materials', updateCategory.categoryname)
//                 }
//             })
//         }
//     });

//     console.log('Recycle Centers Seeded!');
//     process.exit(0);
// });





