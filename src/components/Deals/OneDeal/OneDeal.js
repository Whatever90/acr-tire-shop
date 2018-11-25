import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "./OneDeal.css";
import aws from '../../images/aws.png';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";

export default class OneDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: null,
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
    let category = "deals";
    let product_id = this.state.deal._id;
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
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/deals/find/', id)
      .then(res => {
        console.log("RESPONSE!!!")
        var photos = [];
        for (let i = 0; i < res.data[0].rim[0].photos.length; i++){
          photos.push(res.data[0].rim[0].photos[i]);
        }
        for (let i = 0; i < res.data[0].tire[0].photos.length; i++){
          photos.push(res.data[0].tire[0].photos[i])
        }
        this.setState({ deal: res.data[0], photos: photos })
        console.log(this.state);
      })
      //.catch(error => console.log(error));
      .catch(error => {
        console.log("===========================",error)
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

    var display = this.state.photos.map((element, index) => {
      return (
        <div key={ index }>
          <div className="slider-container">
            <img className="slider-container-img" src={ element } alt="hui"/>
          </div>
        </div>
      )
    });
    let listOfRims = null;

    return (
      <div>
        {this.state. deal && <div className="main-container">
          <div id="oneDeal">
            <div className="container" id="deal">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.deal.rim[0].diameter}' {this.state.deal.rim[0].brand} + {this.state.deal.tire[0].brand} {this.state.deal.tire[0].ratio} {this.state.deal.tire[0].width} {this.state.deal.tire[0].diameter}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-deal-img" src={aws} alt="default image of a deal" id="noImage"/>}
                  {this.state.photos && <Slider className="slider-component" {...settings}>
                    { display }
                    </Slider> }
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <p id="model">Count: {this.state.deal.count}, Type: {this.state.deal.type}, Condition: {this.state.deal.condition}</p>
                  <p id="condition">{this.state.deal.description}</p>
                </div>
                <div className="col-md-5">
                  <p id="price">Price Separately ${this.state.deal.old_price}</p>
                </div>
                <div className="col-md-5">
                  <h2 id="price">Combo price ${this.state.deal.price}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="one-deal-contact-section">
          {!this.state.showPopup ? (
            <div className="one-deal-contact-container">
              <h1 className="one-deal-contact-header">Here you can ask any question related to this product</h1>
              <form className="one-deal-contact-form" onSubmit={(event) => this.handleSubmit(event)}>
                Name: <input className="form-control" onChange={event => this.handleChange("name", event)}/>
                Phone: <input className="form-control" onChange={event => this.handleChange("phone", event)}/>
                Message:<textarea className="form-control" onChange={event => this.handleChange("message", event)}/>
                <button className="one-deal-contact-button btn btn-default submit">Send</button>
              </form>
            </div>
          ) : null}
        </div>
        </div>}
      </div>
    );
  }
}
