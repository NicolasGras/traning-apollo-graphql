const channels = [
    {
        id: '1',
        name: 'soccer',
    }, 
    {
        id: '2',
        name: 'baseball',
        messages: [{
          id: '21',
          text: 'baseball is life',
        }]
    }, 
    {
        id: '3',
        name: 'handball',
    }
];

let nextId=4;

export const resolvers = {
    Query: {
        channels: () => {
            return channels;
        },
        channel: (root, { id }) => {
            
            console.log("---------- root ------------------");
            console.log(root);
            console.log({ id });
            console.log(channels);

            return channels.find(channel => channel.id === id);
        }
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