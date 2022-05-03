import React from 'react';

function Message({ body, author }) {
  return (
    <div className="text-break mb-2">
      <b>{`${author}: `}</b>
      <span>{body}</span>
    </div>
  );
}

export default Message;
