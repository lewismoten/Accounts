import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import ErrorBoundary from './components/ErrorBoundary';
import RootFallback from './components/RootFallback';
import RootProvider from './components/RootProvider';
import Router from './containers/Router';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<RootFallback loading="root provider" />}>
        <RootProvider>
          <Suspense fallback={<RootFallback loading="router" />}>
            <Router />
          </Suspense>
        </RootProvider>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);