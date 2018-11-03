import React, { Component } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "./OneDeal.css";
import aws from '../../images/aws.png';
import { Link } from 'react-router-dom';

export default class OneDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deal: {},
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
    // console.log("ONE deal!")
    let id = {
      _id: this.props.match.params._id
    }
    axios.post('/deals/find/', id)
      .then(res => {
        this.setState({ deal: res.data[0] })
        console.log(this.state.deal);
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
    // if (this.state.matches.length > 0) {
    //   listOfRims = this.state.matches.map((rim, index) => {
    //     return (
    //       <Link to={`/rim/${rim._id}`} key={index}>
    //         <div>
    //           <div className="box" key={index}>
    //             <div className="container" id="rim">
    //               <div className="row">
    //                 <div className="col-md-12" id="top" >
    //                   <h1 id="title">{rim.brand} {rim.diameter} {rim.ratio} {rim.width}</h1>
    //                 </div>
    //               </div>
    //               <div className="row">
    //                 <div className="col-md-4">
    //                   {rim.photos.length === 0 && <img src={aws} alt="rim" id="photo" className="photos" />}
    //                   {rim.photos.length > 0 && <img src={rim.photos[0]} alt="rim" id="photo" className="photos" />}
    //                 </div>
    //                 <div className="col-md-4">
    //                   <p id="diameter">Count: {rim.count},  {rim.description}</p>
    //                   <p id="condition">Condition: {rim.condition} </p>
    //                 </div>
    //                 <div className="col-md-4">
    //                   <p id="price">${rim.price}</p>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </Link>
    //     )
    //   })
    // } else {
    //   listOfRims = '';
    // }

    return (
      <div>
        <div id="main">
          <div id="oneDeal">
            <div className="container" id="deal">
              <div className="row">
                <div className="col-md-12" id="top" >
                  <h1 id="title">{this.state.deal.brand} {this.state.deal.ratio} {this.state.deal.width} {this.state.deal.diameter}</h1>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 slider-parent-container">
                  {this.state.photos.length === 0 && <img className="empty-deal-img" src={aws} alt="default image of a deal" id="noImage"/>}
                  {this.state.deal.photos && <Slider className="slider-component" {...settings}>
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
                  <p id="price">${this.state.deal.price}</p>
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
          <div id="one-deal-matching-container">
            <h1 className="one-deal-matching-header">List of matching rims</h1>
            {listOfRims}
          </div>
        </div>
      </div>
    );
  }
}
