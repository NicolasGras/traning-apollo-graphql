import { PubSub, withFilter } from 'graphql-subscriptions';

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

const pubsub = new PubSub();

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

            const newMessage = { id: String(nextId++), text: "Welcome to " + args.name };
            newChannel.messages.push(newMessage);

            channels.push(newChannel);
            return newChannel;
        },

        addMessage: (root, args) => {

            console.log("----- addMessage ------");

            console.log(args);

            console.log("----- end addMessage ------");

            const messageInput = args.message;

            const newMessage = { id: String(nextId++), text: messageInput.text };

            const channel = channels.find(channel => channel.id === messageInput.channelId);

            if (channel) {
                channel.messages.push(newMessage);
            }

            pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: messageInput.channelId });

            return newMessage;
        }
    },


    Subscription: {
        messageAdded: {
            resolve: (payload) => {
                
                console.log("############## 2 ###############");
                console.log(payload);
                
                return {
                    customData: payload,
                };
            },
            // subscribe: () => pubsub.asyncIterator('messageAdded')
            subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), (payload, variables) => {
                
                console.log("################# 6 ##################");
                console.log(payload);
                console.log(variables);
                return payload.channelId === variables.channelId;
            })
        },

        // messageAddedChannel: {
        //     resolve: (payload) => {
                
        //         console.log("############## 3 ###############");
        //         console.log(payload);
                
        //         return {
        //             customData: payload,
        //         };
        //     },
        //     subscribe: withFilter(() => pubsub.asyncIterator('messageAddedChannel'), (payload, variables) => {
        //         // The `messageAdded` channel includes events for all channels, so we filter to only
        //         // pass through events for the channel specified in the query
                
        //         console.log("############## 4 ###############");
        //         console.log(payload);
        //         console.log(variables);
                
        //         return payload.channelId === variables.channelId;
        //     })
        // }
    }
};