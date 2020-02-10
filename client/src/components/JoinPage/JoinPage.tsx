import React, { useState, FunctionComponent } from 'react';

import './JoinPage.css';

interface IProps {
  onSubmit: (name: string) => void;
}

const JoinPage: FunctionComponent<IProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (name.trim().length === 0) {
      return;
    }

    onSubmit(name);
  }

  return (
    <div className="join-page">
      <form className="join-page--form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={event => setName(event.target.value)}
        />

        <input type="submit" value="Join" className="join-page--join-btn" />
      </form>
    </div>
  );
};

export default JoinPage;
