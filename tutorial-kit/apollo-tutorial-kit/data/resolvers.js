import { Author, View, FortuneCookie } from './connectors';

const resolvers = {
  Query: {
    testString(_, args) {
      return "YOUHOU " + JSON.stringify(args);
    },
    author(_, args) {
      console.log("-------------------------------------------");
      console.log(JSON.stringify(args));
      console.log("-------------------------------------------");
      return Author.find({ where: args });
    },
    allAuthors(_, args) {
      return Author.findAll();
    },
    getFortuneCookie(_, args) {
      return FortuneCookie.getOne();
    }
  },
  Author: {
    posts(author) {
      return author.getPosts();
    }
  },
  Post: {
    author(post) {
      return post.getAuthor();
    },
    views(post) {
      return View.findOne({ postId: post.id }).then(view => view.views);
    }
  }
};

export default resolvers;