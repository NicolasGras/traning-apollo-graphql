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
  
  // this query is exported to be used by AddChannel component
  // and so refresh (not very smartly) data
  export const channelsListQuery = gql`
    query ChannelsListQuery {
      channels {
        id
        name
      }
    }
  `;
  
// Add polling interva request to refresh data displayed  
//export default graphql(channelsListQuery)(ChannelsList);

export default graphql(channelsListQuery, {
    options: { pollInterval: 5000 },
  })(ChannelsList);