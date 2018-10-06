import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Cars from '../components/Cars/Cars';
import Rims from '../components/Rims/Rims';
import Admin from '../components/Admin/Admin';
import OneCar from '../components/Cars/OneCar/OneCar';
import OneRim from '../components/Rims/OneRim/OneRim';
import Login from '../components/Admin/Login/Login';

import NotFound from  '../components/NotFound/NotFound';

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/car/:_id" component={ OneCar } />
    <Route path="/rim/:_id" component={ OneRim } />
    <Route path="/cars" component={ Cars }/>
    <Route path="/rims" component={ Rims }/>
    <Route path="/admin" component={ Admin }/>
    <Route path="/login" component={ Login }/>
    
    <Route path="*" component={ NotFound }/>
  </Switch>
)