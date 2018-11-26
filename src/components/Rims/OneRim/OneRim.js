import React, { Component } from "react";
import axios from "axios";
import aws from "../../images/aws.png";
import Navbar from "../../Navbar/Navbar";
import Slider from 'react-slick';
import "./OneRim.css";
import { Link } from 'react-router-dom';
import Popup from "../../Contact/PopupOneProduct/PopupOneProduct";

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
                      <h1 iclassNamed="title">{tire.brand} {tire.ratio} {tire.width} {tire.diameter}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
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
        <div className="main-container">
          <div className="oneRim">
            <div className="container" id="rim">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 className="title">{this.state.rim.brand} {this.state.rim.diameter} {this.state.rim.ratio} {this.state.rim.width}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-rim-img" src={aws} alt="default image of a car" className="noImage"/>}
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
          <div className="one-tire-contact-section">
            {!this.state.showPopup ? (
              <div className="one-tire-contact-container">
                <h1 className="one-tire-contact-header">Here you can ask any question related to this product</h1>
                <form className="one-tire-contact-form" onSubmit={(event) => this.handleSubmit(event)}>
                  Name: <input className="form-control one-tire-contact-input" onChange={event => this.handleChange("name", event)}/>
                  Phone: <input className="form-control one-tire-contact-input" onChange={event => this.handleChange("phone", event)}/>
                  Message:<textarea className="form-control one-tire-contact-input" onChange={event => this.handleChange("message", event)}/>
                  <button className="one-tire-contact-button btn btn-default submit">Send</button>
                </form>
              </div>
            ) : null}
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
          <div className="one-tire-matching-container">
            <h1 className="one-tire-matching-header">List of matching tires</h1>
            {listOftires}
          </div>
        </div>
      </div>
    );
  }
}
