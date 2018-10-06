import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

const NotFound = () =>
<div>
  <Navbar />
  <div class="error-404" id="body">
    <div id="cont">
      <div class="error-code m-b-10 m-t-20">404 <i class="fa fa-warning"></i></div>
      <h2 class="font-bold">Oops 404! That page can’t be found.</h2>

      <div class="error-desc">
          Sorry, but the page you are looking for was either not found or does not exist. <br/>
          Try refreshing the page or click the button below to go back to the Homepage.
          <div><br/>
              <Link to="/"><button class="btn btn-primary"><span class="glyphicon glyphicon-home"></span> Go back to Homepage</button></Link>
          </div>
      </div>
    </div>
  </div>
</div>
export default NotFound;