const channels = [
    {
        id: 1,
        name: 'soccer',
    }, 
    {
        id: 2,
        name: 'baseball',
    }, 
    {
        id: 3,
        name: 'handball',
    }
];

let nextId=4;

export const resolvers = {
    Query: {
        channels: () => {
            return channels;
        },
    },
    Mutation: {
        addChannel: (root, args) => {
            
            console.log("---------------------------------------");
            console.log(root);
            console.log("---------------------------------------");
            console.log(args);
            console.log("---------------------------------------");
            
            const newChannel = { id: nextId++, name: args.name };
            channels.push(newChannel);
            return newChannel;
        }
    }
};