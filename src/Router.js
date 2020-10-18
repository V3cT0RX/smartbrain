import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Navigator from './Components/Navigator';
const Routes = () => (
    <BrowserRouter>
        <Switch>
        <Route path="/" exact={true} component={Navigator} />
        
        </Switch>
    </BrowserRouter>
);

export default Routes;
