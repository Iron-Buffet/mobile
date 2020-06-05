import React from 'react';
import {Wrap} from '../components';
import LoadingData from '../components/LoadingData';

const CheckAuth = () => {
  return (
    <Wrap>
      <LoadingData checkAuth />
    </Wrap>
  );
};

export default CheckAuth;
