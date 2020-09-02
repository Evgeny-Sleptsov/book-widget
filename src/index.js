import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Redirect} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {getFilterParams} from './helpers/getFilterParams';
import BookWidget from './BookWidget';

const customHistory = createBrowserHistory();


ReactDOM.render(
  <Router history={customHistory}>
      {!getFilterParams('tab') ? <Redirect to="/?tab=start" /> : null}
      <Route 
        path="/"
        component={BookWidget}> 
      </Route>
  </Router>,
  document.getElementById('root')
);
