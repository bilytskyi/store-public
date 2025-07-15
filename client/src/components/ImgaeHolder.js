import React from 'react';

const ImgaeHolder = ({ children }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ background: '#212529', width: 550, height: 500 }}
    >
      {children}
    </div>
  );
};

export default ImgaeHolder;
