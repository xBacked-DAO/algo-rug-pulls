import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

import './styles/main.css';

const withErrorBoundary = (Component) => (props) =>
  (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

const NotFound = () => (
  <div className="text-center mt-12">
    <h1 className="text-lg">Page not found</h1>
  </div>
);

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={withErrorBoundary(App)} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
