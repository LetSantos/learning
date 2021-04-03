import React from 'react';
import { Switch,Route,BrowserRouter } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

import GlobalStyle from '../styles/global';

const Routes: React.FC = () => (
    <>
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/repository/:repository+" component={Repository} />
        </Switch>
        </BrowserRouter>
        <GlobalStyle />
    </>
)

export default Routes;
