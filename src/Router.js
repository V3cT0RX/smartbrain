import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Login from './Components/Forms/Login';
import Navigator from './Components/Navigator';
const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route path="/" exact={true} component={Login} />
        
        </Switch>
    </BrowserRouter>
);

export default Routes;
