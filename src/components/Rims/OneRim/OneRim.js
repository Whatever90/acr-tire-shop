import React, { Component } from "react";
import axios from "axios";
import aws from "../../images/aws.png";
import Navbar from "../../Navbar/Navbar";
import Slider from 'react-slick';
import "./OneRim.css";

export default class OneRim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rim: {},
      photos: []
    };
  }

  componentWillMount() {
    // console.log("ONE PART!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/rims/find/', id)
      .then(res => {
        this.setState({ rim: res.data, photos: res.data.photos })
        console.log(this.state.rim);
        console.log(this.state.rim.photos);
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

    return (
      <div>
        <Navbar />
        <div id="main">
          <div id="oneCar">
            <div className="container" id="rim">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.rim.year} {this.state.rim.brand} {this.state.rim.model}</h1>
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
                  <p id="model">Mileage: {this.state.rim.mileage} Color: {this.state.rim.color}</p>
                  <p id="condition">{this.state.rim.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${this.state.rim.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
