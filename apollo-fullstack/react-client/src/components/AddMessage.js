import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { channelDetailsQuery } from './ChannelDetails';

import { withRouter } from 'react-router';

// props.match exists as soon as 'withRouter' is used to expose this component as a graphql component
// const AddMessageWithMutation = graphql(addMessageMutation)(AddMessage);
// ==> const AddMessageWithMutation = graphql(addMessageMutation)(withRouter(AddMessage));

const AddMessage = (props) => {
    
    console.log("--------------- AddMessage --------------------");
    console.log(props);
    console.log("--------------- End AddMessage --------------------");

    const handleKeyUp = (evt) => {
    
        if (evt.keyCode === 13) {
        
            console.log(evt.target.value);

            evt.persist();

            props.mutate({

                variables: {
                    message: {
                        channelId: props.match.params.channelId,
                        text: evt.target.value
                    }
                },
                
                optimisticResponse: {
                    addMessage: {
                        text: evt.target.value,
                        id: Math.round(Math.random() * -1000000),
                        __typename: 'Message',
                    },
                },

                update: (store, { data: { addMessage } }) => {
                    
                    // Read the data from the cache for this query.
                    const data = store.readQuery({
                        query: channelDetailsQuery,
                        variables: {
                            channelId: props.match.params.channelId,
                        }
                    });

                    // Add our Message from the mutation to the end.
                    data.channel.messages.push(addMessage);

                    // Write the data back to the cache.
                    store.writeQuery({
                        query: channelDetailsQuery,
                        variables: {
                            channelId: props.match.params.channelId,
                        },
                        data
                    });    
                }
            })
            .then( res => {
                evt.target.value = '';  
            });
        }
        
      };

  return (
    <div className="messageInput">
        <input
            type="text"
            placeholder="New Message"
            onKeyUp={handleKeyUp}
        />
    </div>        
  );
};

const addMessageMutation = gql`
  mutation addMessage($message: MessageInput!) {
    addMessage(message: $message) {
      id
      text
    }
  }
`;

const AddMessageWithMutation = graphql(addMessageMutation)(withRouter(AddMessage));

export default AddMessageWithMutation;