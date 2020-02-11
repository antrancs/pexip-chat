import React, { FunctionComponent } from 'react';

interface IProps {
  users: string[];
}

const ParticipantsList: FunctionComponent<IProps> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li key={user}>{user}</li>
      ))}
    </ul>
  );
};

export default ParticipantsList;
