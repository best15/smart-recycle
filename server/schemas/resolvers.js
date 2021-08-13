const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Material, RecycleCenter } = require('../models');
const { signToken } = require('../utils/auth');
const categorySeed = require("../seed/categorySeeds.json");



const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    categories: async () => {
      const categories = await Category.find({}).populate('materials');
      return categories;
    },
    materials: async () => {
      const materials = await Material.find({});
      return materials;
    },
    recycleCenters: async () => {
      return RecycleCenter.find({});
    }
  },

  Mutation: {

    createDefaultCategory: async () => {
      let newCategory;
      let newMaterial;


      categorySeed.map(async (category, index) => {
        let sanitizedName = category.categoryname.trim();

        try {
          let categoryCheck = await Category.findOne({ categoryname: sanitizedName });

          if (!categoryCheck) {
            newCategory = await Category.create({ categoryname: sanitizedName });
          } else {
            newCategory = categoryCheck
          }
        } catch {
          return
        }

        if (category.materialnames) {
          category.materialnames.map(async (materialname) => {
            let sanitizedMaterialName = materialname.trim();
            try {
              let checkMaterial = await Material.findOne({ materialname: sanitizedMaterialName });

              if (!checkMaterial) {
                newMaterial = await Material.create({ materialname: sanitizedMaterialName });
              } else {
                newMaterial = checkMaterial
              }
            } catch {
              return
            }
            const updateCategory = await Category.findOneAndUpdate({ categoryname: sanitizedName }, { $addToSet: { materials: newMaterial._id } })
            if (updateCategory) {
              console.log('Category updated with materials', updateCategory.categoryname)
            }
          })
        }
      })
    },


    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect username');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

  },
};

module.exports = resolvers;
