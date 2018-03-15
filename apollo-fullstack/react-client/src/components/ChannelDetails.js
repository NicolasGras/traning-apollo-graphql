import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import MessageListComponent from './MessageList';
import NotFoundComponent from './NotFound';

class ChannelDetails extends Component {

  componentWillMount() {
  
    console.log("===================== ChannelDetails.componentWillMount =====================");

    console.log(this.props);

    this.props.data.subscribeToMore({
      document: messagesSubscription,
      variables: {
        channelId: this.props.match.params.channelId,
      },
      updateQuery: (prev, {subscriptionData}) => {
        
        console.log("----- updateQuery -----");
        
        console.log(" - prev");
        console.log(prev);

        console.log(" - subscriptionData");
        console.log(subscriptionData);

        if (!subscriptionData.data || !subscriptionData.data.messageAdded) {
          
          return prev;
        }
        const newMessage = subscriptionData.data.messageAdded;

        console.log(" - subscriptionData");
        console.log(subscriptionData);

        console.log(" - newMessage");
        console.log(newMessage);

        // don't double add the message
        if (!prev.channel.messages.find((msg) => msg.id === newMessage.id)) {
          return Object.assign({}, prev, {
            channel: Object.assign({}, prev.channel, {
              messages: [...prev.channel.messages, newMessage],
            })
          });
        } else {
          return prev;
        }
      }
    });
  }

  render() {
    
    const { data: {loading, error, channel }, match } = this.props;

    console.log("===================== ChannelDetails.render =====================");

    console.log(" - loading");
    console.log(loading);
    console.log(" - error");
    console.log(error);
    console.log("- channel");
    console.log(channel);
    console.log(" - match");
    console.log(match);
    console.log(" - match.params.channelId");
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
    return (
      <div>
        <div className="channelName">
          {channel.name}
        </div>
        <MessageListComponent messages = {channel.messages}/>
      </div>);
  }

} 


// Rendering of ChannelDetails
// const ChannelDetails = ({ data: {loading, error, channel }, match }) => {
  
//   console.log(loading);
//   console.log(error);
//   console.log(channel);
//   console.log(match);

//   console.log(match.params.channelId);
  
//   if (loading) {
//     return <p>Loading ChannelDetails...</p>;
//   }
//   if (error) {
//     return <p>{error.message}</p>;
//   }
//   if(channel === null){
//     return <NotFoundComponent />
//   }
//   return (<div>
//       <div className="channelName">
//         {channel.name}
//       </div>
//       <MessageListComponent messages = {channel.messages}/>
//     </div>);
// }

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

const messagesSubscription = gql`
  subscription messageAdded($channelId: ID!) {
    messageAdded(channelId: $channelId) {
      id
      text
    }
  }
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },   // (*)
  }),
})(ChannelDetails));

