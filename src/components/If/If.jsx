import React, { Fragment } from 'react';

const If = (props) => {
  if (props.c) {
    return(
      <Fragment>
        {props.children}
      </Fragment>
    );
  } else {
    return null;
  }
}

export default If;