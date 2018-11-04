import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "./OneTire.css";
import aws from '../../images/aws.png';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

export default class OneTire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tire: {},
      photos: [],
      matches: [],
      name: "",
      phone: "",
      message: "",
      showPopup: false
    };
  }
  handleChange(property, event) {
    event.preventDefault();
    this.setState({
      [property]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    let {
      name,
      phone,
      message
    } = this.state;
    let category = "tires";
    let product_id = this.state.tire._id;
    axios
      .post("/requests/new", {
        name,
        phone,
        message,
        category,
        product_id
      })
      .then(response => {
        console.log("response!", response);
        this.togglePopup();
      })
      .catch(error => console.log(error));
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentWillMount(){
    // console.log("ONE tire!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/tires/find/', id)
      .then(res => {
        this.setState({ tire: res.data, photos: res.data.photos, matches: res.data.matches })
        console.log(this.state.tire);
        console.log(this.state.tire.photos);
      })
      .catch(error => {
        console.log("===========================", error)
        this.props.history.push("/notfound");
      });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: true,
      speed: 1700,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3700, // Delay between each auto scroll
      pauseOnHover: true
    };

    const display = this.state.photos
    .map((element, index) => {
      return (
        <div key={ index }>
          <div className="slider-container">
            <img className="slider-container-img" src={ element } alt="hui"/>
          </div>
        </div>
      )
    });
    let listOfRims = null;
    if (this.state.matches.length > 0) {
      listOfRims = this.state.matches.map((rim, index) => {
        return (
          <Link to={`/rim/${rim._id}`} key={index}>
            <div>
              <div className="box" key={index}>
                <div className="container" id="rim">
                  <div className="row">
                    <div className="col-md-12" id="top" >
                      <h1 id="title">{rim.brand} {rim.diameter} {rim.ratio} {rim.width}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      {rim.photos.length === 0 && <img src={aws} alt="rim" id="photo" className="photos" />}
                      {rim.photos.length > 0 && <img src={rim.photos[0]} alt="rim" id="photo" className="photos" />}
                    </div>
                    <div className="col-md-4">
                      <p id="diameter">Count: {rim.count},  {rim.description}</p>
                      <p id="condition">Condition: {rim.condition} </p>
                    </div>
                    <div className="col-md-4">
                      <p id="price">${rim.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })
    } else {
      listOfRims = '';
    }

    return (
      <div>
        <div id="main">
          <div id="oneTire">
            <div className="container" id="tire">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.tire.brand} {this.state.tire.ration} {this.state.tire.width} {this.state.tire.diameter}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-tire-img" src={aws} alt="default image of a tire" id="noImage"/>}
                  {this.state.tire.photos && <Slider className="slider-component" {...settings}>
                    { display }
                    </Slider> }
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <p id="model">Count: {this.state.tire.count}, Type: {this.state.tire.type}, Condition: {this.state.tire.condition}</p>
                  <p id="condition">{this.state.tire.description}</p>
                </div>
                <div className="col-md-5">
                  <p id="price">${this.state.tire.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="one-tire-contact-section">
          {!this.state.showPopup ? (
            <div className="one-tire-contact-container">
              <h1 className="one-tire-contact-header">Here you can ask any question related to this product</h1>
              <form className="one-tire-contact-form" onSubmit={(event) => this.handleSubmit(event)}>
                Name: <input className="form-control" onChange={event => this.handleChange("name", event)}/>
                Phone: <input className="form-control" onChange={event => this.handleChange("phone", event)}/>
                Message:<textarea className="form-control" onChange={event => this.handleChange("message", event)}/>
                <button className="one-tire-contact-button btn btn-default submit">Send</button>
              </form>
            </div>
          ) : null}
        </div>
          <div id="one-tire-matching-container">
            <h1 className="one-tire-matching-header">List of matching rims</h1>
            {listOfRims}
          </div>
        </div>
      </div>
    );
  }
}
