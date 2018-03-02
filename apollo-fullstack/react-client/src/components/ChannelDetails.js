import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import MessageListComponent from './MessageList';
import NotFoundComponent from './NotFound';

// Rendering of ChannelDetails
const ChannelDetails = ({ data: {loading, error, channel }, match }) => {
  
  console.log(loading);
  console.log(error);
  console.log(channel);
  console.log(match);

  console.log(match.params.channelId);
  
  if (loading) {
    return <p>Loading ChannelDetails...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(channel === null){
    return <NotFoundComponent />
  }
  return (<div>
      <div className="channelName">
        {channel.name}
      </div>
      <MessageListComponent messages = {channel.messages}/>
    </div>);
}

// (*): variable's name ("channelId") must be the same
// than in export default definition
export const channelDetailsQuery = gql`
  query ChannelDetailsQuery($channelId : ID!) {
    channel(id: $channelId) {                 
      id
      name
      messages {
        id
        text
      }
    }
  }
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },   // (*)
  }),
})(ChannelDetails));

