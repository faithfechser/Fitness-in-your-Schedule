const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');
const request = require("request");
const { promisify } = require("util");
const apiKey = process.env.api_key;

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log(context.user)
      if (context.user) {
        const user = await User.findOne({ _id: context.user._id });
        console.log(user)
        return user
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    getExercises: async (_, { muscle }) => {
      const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`;

      const promisifiedRequest = promisify(request.get);

      try {
          const response = await promisifiedRequest({
              url,
              headers: {
                  'X-Api-Key': apiKey,
              },
          });

          const body = JSON.parse(response.body);
          return body;
      } catch (error) {
          console.error('Request failed:', error);
          throw new Error('Failed to retrieve exercises');
      }
  },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(email, password)
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    saveExercise: async (parent, { newExercise }, context) => {
      if (context.user) {

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: {
              savedExercises: newExercise
            }
          }
        );

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {

        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedExercises: { exerciseId } } },
          { new: true }
        );

        return user;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;