import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home/Home';
import Tires from '../components/Tires/Tires';
import Rims from '../components/Rims/Rims';
import Admin from '../components/Admin/Admin';
import OneTire from '../components/Tires/OneTire/OneTire';
import OneRim from '../components/Rims/OneRim/OneRim';
import Login from '../components/Admin/Login/Login';

import NotFound from "../components/NotFound/NotFound";

export default (
  <Switch>
    <Route exact path="/" component={ Home } />
    <Route path="/tire/:_id" component={ OneTire } />
    <Route path="/rim/:_id" component={ OneRim } />
    <Route path="/tires" component={ Tires }/>
    <Route path="/rims" component={ Rims }/>
    <Route path="/admin" component={ Admin }/>
    <Route path="/login" component={ Login }/>

    <Route path="*" component={ NotFound }/>
  </Switch>
);
