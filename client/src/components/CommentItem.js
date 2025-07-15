import React from 'react';

const CommentItem = ({ name, isoDate, comment }) => {
  const date = new Date(isoDate);
  return (
    <div style={{ border: '1px solid lightgray', marginBottom: 15 }}>
      <div
        style={{ background: '#212529', color: 'white' }}
        className="d-flex justify-content-between p-1 align-items-center"
      >
        <strong>{name}</strong>
        <div>{date.toLocaleString()}</div>
      </div>
      <div style={{ padding: '10px 10px 10px 60px' }}>{comment}</div>
    </div>
  );
};

export default CommentItem;
