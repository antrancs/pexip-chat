import React, { FunctionComponent, useState, useContext } from 'react';
import classnames from 'classnames';

import './ChatItem.css';
import { ChatItem } from '../ChatPage/ChatPage';
import AppContext from '../../context/AppContext';

interface IProps {
  item: ChatItem;
  onUpdate: (messageId: string, newText: string) => void;
  onDelete: (messageId: string) => void;
}

const ChatListItem: FunctionComponent<IProps> = ({
  item,
  onUpdate,
  onDelete
}) => {
  const { date, user, text, id, edited, deleted } = item;
  const [editMode, setEditMode] = useState(false);
  const [editText, setEditText] = useState(text);
  const { userName } = useContext(AppContext);

  const dateObj = new Date(date);

  function formatDate(date: Date) {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return `${hours <= 9 ? '0' + hours : hours}:${
      minutes <= 9 ? '0' + minutes : minutes
    }`;
  }

  const formattedDate = formatDate(dateObj);
  const canEdit = user === userName;

  function handleSave() {
    setEditMode(false);
    onUpdate(id, editText);
  }

  return (
    <div className="chat-item__wrapper">
      <div>
        <span className="chat-item__name">{user}</span>{' '}
        <span className="chat-item__date">{formattedDate}</span>
      </div>

      <div className="chat-item__message-content">
        {editMode ? (
          <input
            className="chat-item__text"
            value={editText}
            onChange={event => setEditText(event.target.value)}
          />
        ) : (
          <p
            className={classnames('chat-item__text', {
              'chat-item__delete-message': deleted
            })}
          >
            {text}
          </p>
        )}

        {!deleted && (
          <div className="chat-item__message-control">
            {edited && !editMode && (
              <span className="chat-item__edited-label">Edited</span>
            )}
            {canEdit &&
              (editMode ? (
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditMode(false);
                    setEditText(text);
                  }}
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>
                  <button onClick={() => onDelete(id)}>Delete</button>
                </>
              ))}

            {editMode && <button onClick={handleSave}>Save</button>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
