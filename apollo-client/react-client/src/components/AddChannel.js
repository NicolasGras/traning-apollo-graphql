import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { channelsListQuery } from './ChannelList';

const AddChannel = (props) => {
    const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
          evt.persist();

          props.mutate({ 
            variables: { name: evt.target.value },
            refetchQueries: [ { query: channelsListQuery }]
          })
          .then( res => {
            evt.target.value = '';  
          });
                    
        }
      };

  return (
    <input
      type="text"
      placeholder="New channel"
      onKeyUp={handleKeyUp}
    />
  );
};

const addChannelMutation = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;
const AddChannelWithMutation = graphql(addChannelMutation)(AddChannel);

export default AddChannelWithMutation;