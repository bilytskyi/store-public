import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import classes from '../styles/Pages.module.css';

const Pages = observer(({ deviceListRef }) => {
  const { device } = useContext(Context);
  const pageCount = Math.ceil(device.totalCount / device.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  return (
    <div className={classes.pagesContainer}>
      {pages.map(page => (
        <div
          key={page}
          className={
            device.page === page
              ? `${classes.pageItem} ${classes.active}`
              : classes.pageItem
          }
          onClick={() => {
            device.setPage(page);
            deviceListRef.current.scrollIntoView();
          }}
        >
          {page}
        </div>
      ))}
    </div>
  );
});

export default Pages;
