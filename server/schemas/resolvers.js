const { AuthenticationError } = require('apollo-server-express');
const { Profile } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
  },

  Mutation: {
    createProfile: async (parent, { userName, password }) => {
      const profile = await Profile.create({ userName, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { userName, password }) => {
      const profile = await Profile.findOne({ userName });

      if (!profile) {
        throw new AuthenticationError('No profile with this userName found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

  },
};

module.exports = resolvers;
