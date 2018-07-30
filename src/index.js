import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsAll from './components/PostsAll';
import PostsNew from './components/PostsNew';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    	<Switch>
	    	<Route path="/posts/new" component={PostsNew} />
    		<Route path="/" component={PostsAll} />
    	</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));