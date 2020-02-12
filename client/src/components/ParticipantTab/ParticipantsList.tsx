import React, { FunctionComponent } from 'react';

import './ParticipantList.css';

interface IProps {
  users: string[];
}

const ParticipantsList: FunctionComponent<IProps> = ({ users }) => {
  return (
    <ul>
      {users.map(user => (
        <li className="participant" key={user}>
          {user}
        </li>
      ))}
    </ul>
  );
};

export default ParticipantsList;
