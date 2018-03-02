const channels = [
    {
        id: '1',
        name: 'soccer',
        messages: [{
            id: '2',
            text: 'soccer is life',
        }]
    },
    {
        id: '3',
        name: 'baseball',
        messages: [{
            id: '4',
            text: 'baseball is life',
        }]
    },
    {
        id: '5',
        name: 'handball',
        messages: [
            {
                id: '6',
                text: 'handball is life',
            },
            {
                id: '7',
                text: 'handball is real life'
            }
        ]
    }
];

let nextId = 8;

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

            let result = channels.find(channel => channel.id === id);

            if (result.messages === null) {
                result.messages = [];
            }

            console.log(result);

            return result;
        }
    },
    Mutation: {
        addChannel: (root, args) => {

            console.log("---------------------------------------");
            console.log(root);
            console.log("---------------------------------------");
            console.log(args);
            console.log("---------------------------------------");

            const newChannel = { id: String(nextId++), messages: [], name: args.name };

            const newMessage = { id: String(nextId++), text: "Welcome to " + args.name};
            newChannel.messages.push(newMessage);

            channels.push(newChannel);
            return newChannel;
        },

        addMessage: (root, args) => {

            console.log("----- addMessage ------");

            console.log(args);

            console.log("----- end addMessage ------");

            const messageInput = args.message;
            
            const newMessage = { id: String(nextId++), text: messageInput.text};

            const channel = channels.find(channel => channel.id === messageInput.channelId);

            if(channel) {
                channel.messages.push(newMessage);
            }

            return newMessage;
        }
    }
};