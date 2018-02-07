import React from 'react';
import { gql, graphql } from 'react-apollo';

const AddChannel = ({ mutate }) => {
    const handleKeyUp = (evt) => {
        if (evt.keyCode === 13) {
          console.log(evt.target.value);
          evt.target.value = '';
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


export default AddChannel;