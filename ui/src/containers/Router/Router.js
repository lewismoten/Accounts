import React, { Suspense } from 'react';
import { useDispatch } from 'react-redux';
import RootFallback from '../../components/RootFallback';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from '../Home';

const Router = () => {
  const dispatch = useDispatch();

  return (
    <Suspense fallback={<RootFallback loading="route" />}>
      <HashRouter>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </Suspense>
  );
};

export default Router;