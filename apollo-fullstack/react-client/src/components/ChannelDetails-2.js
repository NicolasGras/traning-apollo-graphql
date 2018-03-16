import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import MessageListComponent from './MessageList';
import NotFoundComponent from './NotFound';

class ChannelDetails extends Component {

  componentWillMount() {
  
    console.log("===================== ChannelDetails.componentWillMount =====================");

    console.log(this.props);

    const result = this.props.subscribeToNewMessage({
      channelId: parseInt(this.props.match.params.channelId)
    })

    console.log("========== RESULT");
    console.log(result);
  }

  render() {
    
    const { data: {loading, error, channel }, match } = this.props;

    console.log("===================== ChannelDetails.render =====================");
    console.log(" - this.props");
    console.log(this.props);
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

const withData = graphql(channelDetailsQuery, {
  // name: 'myData',
  options: (props) => ({
     variables: { channelId: props.match.params.channelId },   // (*)
  }),
  props: props => {
    return  {
      ...props,
      subscribeToNewMessage: params => {
        console.log("- params");
        console.log(params);

        console.log(props);

        const toto = props.data.subscribeToMore({
          document: messagesSubscription,
          variables: {
            channelId: props.data.variables.channelId
          },
          updateQuery: (prev, {subscriptionData}) => {
            console.log("----- updateQuery -----");
        
            console.log(" - prev");
            console.log(prev);

            console.log(" - subscriptionData");
            console.log(subscriptionData);
          }
        });

        console.log(toto);

        
        return toto;
      }
    }
  }
});

export default withData(ChannelDetails);





// export default (graphql(channelDetailsQuery, {
//   options: (props) => ({
//     variables: { channelId: props.match.params.channelId },   // (*)
//   }),
// })(ChannelDetails));

