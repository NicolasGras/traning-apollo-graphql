import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import AddChannelComponent from './AddChannel';  // What's export default in AddChannel.js file

const ChannelsList = ({ data: {loading, error, channels }}) => {
    if (loading) {
      return <p>Loading ...</p>;
    }
    if (error) {
      return <p>{error.message}</p>;
    }
  
    return (
      <div className="channelsList">
        <AddChannelComponent />
        { channels.map( ch => 
          (<div key={ch.id} className="channel">{ch.name}</div>)
        )}
      </div>
    );
    
  };
  
  const channelsListQuery = gql`
    query ChannelsListQuery {
      channels {
        id
        name
      }
    }
  `;
  
export default graphql(channelsListQuery)(ChannelsList);