import casual from 'casual';

const mocks = {
  String: () => 'It works!',
  
  Query: () => ({
  
    author: (root, args) => {
      return {
        firstName: args.firstName,
        lastName: args.lastName
      };
  
    }
  }),

  Author: () => ({
    firstName: () => casual.first_name,
    lastName: () => casual.lastName + " - " + args.createAt
  }),

  Post: () => ({
    title: casual.title,
    text: casual.sentences(3)
  })
};

export default mocks;
