import React, {
  Component
} from "react";
import axios from "axios";
import {
  connect
} from "react-redux";
// import { urlsend } from "../../../redux/ducks/reducer";
import "./AddNewDeal.css";
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import {
  getPhotos,
  savePhotos
} from "../../../redux/ducks/reducer"

class AddNewDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rims: [],
      tires: [],
      rim: null,
      tire: null,
      tires_matches: [],
      rims_matches: [],
      price: 0,
      selected_id: null,
      selected_id2: null,
      matching_diameter: null,
      matching_category: null,
      selected_product1: null,
      selected_product2: null,
      deal: null
    };
  }
  componentWillMount() {
    axios.all([
      axios.get(`/tires/all`),
      axios.get(`/rims/all`)
    ]).then(axios.spread((tires, rims) => {
      this.setState({
        tires: tires.data,
        rims: rims.data
      })
    })).catch(err => console.log(err));
    console.log(this.state)
  }
  handleChange(property, event) {
    event.preventDefault();
    this.setState({
      [property]: event.target.value
    }); //directly changes state's values
  }

  handleSubmit(event) { //adding a new deal
   
  }
  chooseTarget(id, category, diameter, product){
    this.setState({
      selected_id: id,
      matching_diameter: diameter,
      matching_category: category,
      selected_product1: product
    });
  }
  async createDeal(product){
    console.log("CREATING A NEW DEAL!", product)
    
    var rim;
    var tire;
    var price = this.state.selected_product1.price + product.price;
    if(this.state.matching_category==="tire"){
      rim = this.state.selected_product1;
      tire = product;
    }else{
      rim = product;
      tire = this.state.selected_product1;
    }
    var deal = {"rim": rim, "tire": tire}
    console.log("that's deal! => ", deal)
    this.setState({
      rim: rim,
      tire: tire,
      deal: deal,
      price: price,
      selected_product2: product
    })
    console.log(this.state)
  }
  cancel(){
    this.setState({
      rim: null,
      tire: null,
      price: 0,
      selected_id2: null,
      selected_product2: null,
      deal: null
    })
  }
  confirmCreatingDeal(){
    console.log("confirming")
  }
  show_state(){
    console.log(this.state)
  }

  render() {
    var listOfRims;
    if(this.state.rims.length>0){
      listOfRims = this.state.rims.map((rim, index) => (
      <div key={rim._id}>
        {this.state.selected_id === rim._id && <div className = "addNewDealRimSelected"  onClick={ function(){
          this.chooseTarget(rim._id, "tire", rim.diameter, rim)
          }.bind(this)
        }>
        <h1>{rim.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {rim.diameter}</p>
            <p>Count: {rim.count}</p>
            <p>Price: ${rim.price}</p>
            <p>Condition: {rim.condition}</p>
            <p>Description: {rim.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {rim.photos && rim.photos.length > 0 && rim.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
        </div>}
        {
          this.state.selected_id !== rim._id && this.state.matching_diameter !== rim.diameter && < div className = "addNewDealRim"  onClick={ function(){
          this.chooseTarget(rim._id, "tire", rim.diameter, rim)
          }.bind(this)
        }>
        <h1>{rim.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {rim.diameter}</p>
            <p>Count: {rim.count}</p>
            <p>Price: ${rim.price}</p>
            <p>Condition: {rim.condition}</p>
            <p>Description: {rim.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {rim.photos && rim.photos.length > 0 && rim.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
        </div>}
        {this.state.matching_diameter === rim.diameter && this.state.matching_category==="rim" && <div className = "addNewDealRimMatched"  onClick={ function(){
          this.createDeal(rim)
          }.bind(this)
        }>
        <h1>{rim.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {rim.diameter}</p>
            <p>Count: {rim.count}</p>
            <p>Price: ${rim.price}</p>
            <p>Condition: {rim.condition}</p>
            <p>Description: {rim.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {rim.photos && rim.photos.length > 0 && rim.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
          
        </div>}
      </div>
    ));
    }
    var listOfTires;
    if(this.state.tires.length>0){
      listOfTires = this.state.tires.map((tire, index) => (
      <div key={tire._id}>
        {this.state.selected_id === tire._id && < div className = "addNewDealRimSelected" onClick={ function(){
          this.chooseTarget(tire._id, "rim", tire.diameter, tire)
          }.bind(this)
        }>
        <h1>{tire.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {tire.diameter}</p>
            <p>Width: {tire.width}</p>
            <p>Ratio: {tire.ratio}</p>
            <p>Count: {tire.count}</p>
            <p>Price: ${tire.price}</p>
            <p>Condition: {tire.condition}</p>
            <p>Description: {tire.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
        </div>}
        {
          this.state.selected_id !== tire._id && this.state.matching_diameter !== tire.diameter && < div className = "addNewDealRim" onClick={ function(){
          this.chooseTarget(tire._id, "rim", tire.diameter, tire)
          }.bind(this)
        }>
        <h1>{tire.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {tire.diameter}</p>
            <p>Width: {tire.width}</p>
            <p>Ratio: {tire.ratio}</p>
            <p>Count: {tire.count}</p>
            <p>Price: ${tire.price}</p>
            <p>Condition: {tire.condition}</p>
            <p>Description: {tire.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
        </div>}
        {
          this.state.matching_diameter === tire.diameter && this.state.matching_category === "tire" && < div className = "addNewDealRimMatched" onClick={ function(){
          this.createDeal(tire)
          }.bind(this)
        }>
        <h1>{tire.brand}</h1>
          <div className="col-md-3">
            <p>Diameter: {tire.diameter}</p>
            <p>Width: {tire.width}</p>
            <p>Ratio: {tire.ratio}</p>
            <p>Count: {tire.count}</p>
            <p>Price: ${tire.price}</p>
            <p>Condition: {tire.condition}</p>
            <p>Description: {tire.description}</p>
          </div>
          <div className="col-md-3">
            <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
            </li>)}
            </ul>
          </div>
        </div>}
      </div>
    ));
    } 
    return (
 
    <div className="addNewTire-body" >
      <h1>CREATING A NEW DEAL!</h1>
      <button onClick={() => this.show_state()}>Show state</button>
      <div className="addNewDealProductsSeparator">
        <div className="addNewDealProductsContainer">
          {listOfRims}
        </div>
        <div className="addNewDealProductsMiddleContainer">
        
          {this.state.rim && this.state.tire && <div>
              <h5>{this.state.rim.brand} + {this.state.tire.brand}</h5>
              <h5>{this.state.rim.diameter} with a tire of {this.state.tire.width} {this.state.tire.ratio} {this.state.tire.diameter}</h5>
              <h5>{this.state.price}</h5>
              <div>
                <button onClick={() => this.confirmCreatingDeal()}>Confirm a new deal</button>
                <button onClick={() => this.cancel()}>Cancel</button>
              </div>
            </div>}
            {!this.state.selected_product2 && <h3>CHOOSE YOUR DESTINY</h3>}
        </div>
        <div className="addNewDealProductsContainer">
          {listOfTires}
        </div>
      </div>
      
      </div>
      
            );
        }
      }
export default connect(null)(AddNewDeal);