const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Material, RecycleCenter } = require('../models');
const { signToken } = require('../utils/auth');

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
