import React, { Component } from "react";
import axios from "axios";
import aws from "../../images/aws.png";
import Navbar from "../../Navbar/Navbar";
import Slider from 'react-slick';
import "./OneRim.css";
import { Link } from 'react-router-dom';
import Popup from "../../Contact/Popup/Popup";

export default class OneRim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rim: {},
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
    let category = "rims";
    let product_id = this.state.rim._id;
    axios
      .post("/requests/new", {
        name,
        phone,
        message,
        category,
        product_id
      })
      .then(response => {
        console.log("response!",response);
        this.togglePopup();
      })
      .catch(error => console.log(error));
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentWillMount() {
    // console.log("ONE PART!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/rims/find/', id)
      .then(res => {
        this.setState({ rim: res.data, photos: res.data.photos, matches: res.data.matches })
      })
      .catch(error => console.log(error));
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

    const display = this.state.photos.map((element, index) => {
      return (
        <div key={index}>
          <div className="slider-container">
            <img className="slider-container-img" src={element} alt="hui" />
          </div>
        </div>
      );
    });
var listOftires
    if (this.state.matches.length > 0) {
      listOftires = this.state.matches.map((tire, index) => {
        return (
          <Link to={`/tire/${tire._id}`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="tire">
                  <div className="row">
                    <div className="col-md-12" id="top" >
                      <h1 id="title">{tire.brand} {tire.ratio} {tire.width} {tire.diameter}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      {/* 
                        not sure which css is right. have to check
                        {tire.photos.length === 0 && <img src={aws} alt="tire" id="tire-photo"/>} 
                        {tire.photos.length>0 && <img src={tire.photos[0]} alt="tire" id="tire-photo"/>}
                      */}
                      {tire.photos.length === 0 && <img src={aws} alt="rim" className="photos" />}
                      {tire.photos.length > 0 && <img src={tire.photos[0]} alt="rim" className="photos" />}
                    </div>
                    <div className="col-md-4">
                      <p id="model">Count {tire.count}, Type: {tire.type} , Condition: {tire.condition}</p>
                      <p>{tire.description}</p>
                    </div>
                    <div className="col-md-4">
                      <p id="price">${tire.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })
    } else {
      listOftires = ``
    }
    

    return (
      <div>
        <div id="main">
          <div id="oneCar">
            <div className="container" id="rim">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.rim.brand} {this.state.rim.diameter} {this.state.rim.ratio} {this.state.rim.width}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-rim-img" src={aws} alt="default image of a car" id="noImage"/>}
                  {this.state.rim.photos && <Slider className="slider-component" {...settings}>
                    { display }
                    </Slider> }
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p id="model">Condition: {this.state.rim.condition} Count: {this.state.rim.count}</p>
                  <p id="condition">{this.state.rim.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${this.state.rim.price}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact">
            <div id="_contact">
        
        <div className="contact-section">
          {!this.state.showPopup ? (
            <div className="container">
              <form
                className="contact-form"
                onSubmit={(event) => this.handleSubmit(event)}
              >
                <div className="col-md-6 form-line">
                  <div className="form-group">
                    <label htmlFor="exampleInputUsername">Your name</label>
                    <input
                      type="text"
                      className="form-control"
                      id=""
                      placeholder=" Enter Name"
                      onChange={event => this.handleChange("name", event)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telephone">Mobile No.</label>
                    <input
                      type="tel"
                      type="number"
                      className="form-control"
                      id="telephone"
                      placeholder=" Enter 10-digit mobile no."
                      onChange={event => this.handleChange("phone", event)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="description"> Message</label>
                    <textarea
                      className="form-control"
                      id="description"
                      placeholder="Enter Your Message"
                      onChange={event => this.handleChange("message", event)}
                    />
                  </div>
                  <div>
                    <button
                      // onClick={this.togglePopup.bind(this)}
                      type="submit"
                      value="Send"
                      className="btn btn-default submit"
                    >
                      <i className="fa fa-paper-plane" aria-hidden="true" />{" "}
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="contact-section">
          <div className="popup-container">
            {this.state.showPopup ? (
              <Popup
                className="popup-element"
                closePopup={this.togglePopup.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
          </div>
          <div id="main2">
            {listOftires}
          </div>
        </div>
      </div>
    );
  }
}
