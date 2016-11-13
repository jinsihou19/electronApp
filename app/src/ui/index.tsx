/**
 * Created by vito on 2016/11/7.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import Content from './Content'

const AppUI: React.StatelessComponent<any> = () => {
    return <Router history={hashHistory}>
        <Route path="/" component={Content}>
        </Route>
    </Router>
};
ReactDOM.render(<AppUI/>, document.getElementById('main'));