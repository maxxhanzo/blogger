import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import PostsAll from './components/PostsAll';
import PostsNew from './components/PostsNew';
import PostShow from './components/PostShow';
import NotFound from './components/NotFound';
import EditPost from './components/EditPost';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    	<Switch>
	    	<Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id/edit" component= {EditPost} />
        <Route path="/posts/:id" component= {PostShow} />
        <Route path="/posts/" component= {PostsAll} />
        <Route path="/:ff" component={NotFound} />
    		<Route path="/" component={PostsAll} />
    	</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
