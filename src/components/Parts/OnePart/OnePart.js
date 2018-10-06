import React, { Component } from "react";
import axios from "axios";
import aws from "../../images/aws.png";
import Navbar from "../../Navbar/Navbar";
import Slider from "react-slick";
import "./OnePart.css";

export default class OneCar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      part: {},
      photos: []
    };
  }

  componentWillMount() {
    // console.log("ONE PART!")
    let id = {
      _id: this.props.match.params._id
    };
    axios
      .post("/parts/find/", id)
      .then(res => {
        this.setState({ part: res.data, photos: res.data.photos });
        console.log(this.state.part);
        console.log(this.state.part.photos);
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
            <div className="container" id="part">
              <div className="row">
                <div className="col-md-12" id="top">
                  <h1 id="title">
                    {this.state.part.year} {this.state.part.brand}{" "}
                    {this.state.part.model}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && (
                    <img
                      className="empty-part-img"
                      src={aws}
                      alt="default image of a tire"
                      id="noImage"
                    />
                  )}
                  {this.state.part.photos && (
                    <Slider className="slider-component" {...settings}>
                      {display}
                    </Slider>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <p id="model">
                    Mileage: {this.state.part.mileage} Color:{" "}
                    {this.state.part.color}
                  </p>
                  <p id="condition">{this.state.part.description}</p>
                </div>
                <div className="col-md-4">
                  <p id="price">${this.state.part.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
