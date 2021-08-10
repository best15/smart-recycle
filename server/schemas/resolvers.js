const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Material, RecycleCenter } = require('../models');
const { signToken } = require('../utils/auth');
const categorySeed = require("../seed/categorySeeds.json");

// const fs = require("fs");
// const rawData = fs.readFile("../seed/categorySeeds.json", 'utf8');




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
      return await Material.find({});
    },
    recycleCenters: async () => {
      return RecycleCenter.find({}).populate('materials');;
    }
  },

  Mutation: {

    createDefaultCategory: async () => {

      await Category.deleteMany({});
      await Category.create(categorySeed);

      // categorySeed.map(async (category) => {
      //   console.log(category)
      //   if (category) {
      //     let name = category.categoryname;
      //     const category = await Category.create({ name })
      //     return { category }
      //   }

      // })

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
