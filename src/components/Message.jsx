import React from 'react';

function Message({ body, username }) {
  return (
    <div className="text-break mb-2">
      <b>{`${username}: `}</b>
      <span>{body}</span>
    </div>
  );
}

export default Message;
