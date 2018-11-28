import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./AddNewDeal.css";

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
      deal: null,
      description: '',
      show_form: false,
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
  async chooseTarget(id, category, diameter, product) {
    await this.setState({
      selected_id: id,
      matching_diameter: diameter,
      matching_category: category,
      selected_product1: product,
      price: product.price,
      rim: null,
      tire: null,
      selected_product2: null
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
      deal: null,
      description: ''
    })
  }
  confirmCreatingDeal(){
    console.log("confirming")
    var obj = {
      rim: this.state.deal.rim._id,
      tire: this.state.deal.tire._id,
      price: this.state.price,
      old_price: this.state.deal.tire.price + this.state.deal.rim.price,
      description: this.state.description
    }
    console.log(obj)
    axios.post("/deals/new", obj)
    .then(response => {
      console.log(response);
      //if(response.data)
      alert("A new deal was created!")
    })
    .catch(err => alert("Such deal already exists"));
    this.cancel();
  }
  show_state(){
    console.log(this.state)
  }
  show_form(){
    this.setState({
      show_form: !this.state.show_form
    })
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
        <div className="addNewDealItem">
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
          </div>
        </div>}
        {
          this.state.selected_id !== rim._id && this.state.matching_diameter !== rim.diameter && < div className = "addNewDealRim"  onClick={ function(){
          this.chooseTarget(rim._id, "tire", rim.diameter, rim)
          }.bind(this)
        }>
        <h1>{rim.brand}</h1>
        <div className="addNewDealItem">
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
          </div>
        </div>}
        {this.state.matching_diameter === rim.diameter && this.state.matching_category==="rim" && <div className = "addNewDealRimMatched"  onClick={ function(){
          this.createDeal(rim)
          }.bind(this)
        }>
          <h1>{rim.brand}</h1>
          <div className="addNewDealItem">
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
        <div className="addNewDealItem">
          <div>
            <div className="col-md-3">
              <p>Diameter: {tire.diameter}</p>
              <p>Width: {tire.width}</p>
              <p>Ratio: {tire.ratio}</p>
              <p>Count: {tire.count}</p>
              <p>Price: ${tire.price}</p>
              <p>Condition: {tire.condition}</p>
              <p>Description: {tire.description}</p>
            </div>
          </div>
            <div className="col-md-3">
              <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
              </li>)}
              </ul>
            </div>
          </div>
        </div>}
        {
          this.state.selected_id !== tire._id && this.state.matching_diameter !== tire.diameter && < div className = "addNewDealRim" onClick={ function(){
          this.chooseTarget(tire._id, "rim", tire.diameter, tire)
          }.bind(this)
        }>
        
        <h1>{tire.brand}</h1>
        <div className="addNewDealItem">
          <div>
            <div className="col-md-3">
              <p>Diameter: {tire.diameter}</p>
              <p>Width: {tire.width}</p>
              <p>Ratio: {tire.ratio}</p>
              <p>Count: {tire.count}</p>
              <p>Price: ${tire.price}</p>
              <p>Condition: {tire.condition}</p>
              <p>Description: {tire.description}</p>
            </div>
          </div>
            <div className="col-md-3">
              <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
              </li>)}
              </ul>
            </div>
          </div>
        </div>}
        {
          this.state.matching_diameter === tire.diameter && this.state.matching_category === "tire" && < div className = "addNewDealRimMatched" onClick={ function(){
          this.createDeal(tire)
          }.bind(this)
        }>
        <h1>{tire.brand}</h1>
        <div className="addNewDealItem">
          <div>
            <div className="col-md-3">
              <p>Diameter: {tire.diameter}</p>
              <p>Width: {tire.width}</p>
              <p>Ratio: {tire.ratio}</p>
              <p>Count: {tire.count}</p>
              <p>Price: ${tire.price}</p>
              <p>Condition: {tire.condition}</p>
              <p>Description: {tire.description}</p>
            </div>
          </div>
            <div className="col-md-3">
              <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
              </li>)}
              </ul>
            </div>
          </div>
        </div>}
      </div>
    ));
    }
    return (
    <div className="addNewTire-body">
    {/* <button onClick={() => this.show_state()}>Show state</button> */}
    <button onClick={() => this.show_form()}>Show Form</button>
      {this.state.show_form && <div>
        <h1 align="center">Here you can create a new deal</h1>
      <div className="addNewDealProductsSeparator">
        <div className="addNewDealProductsContainer">
        <h2 align="center">List of rims</h2>
          {listOfRims}
        </div>
        <div className="addNewDealProductsMiddleContainer">
          {this.state.rim && this.state.tire && <div>
              <h5>{this.state.rim.brand} + {this.state.tire.brand}</h5>
              <h5>{this.state.rim.diameter} with a tire of {this.state.tire.width} {this.state.tire.ratio} {this.state.tire.diameter}</h5>
              <label>Old Price: {this.state.tire.price + this.state.rim.price}</label>
              <br></br>
              <label>New Price : </label><input className='form-control' type="number" onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={this.state.price} />
              <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" />
              <div>
                <button onClick={() => this.confirmCreatingDeal()}>Confirm a new deal</button>
                <button onClick={() => this.cancel()}>Cancel</button>
              </div>
            </div>}
            {!this.state.selected_product2 && <h3 align="center">Create a deal</h3>}
        </div>
        <div className="addNewDealProductsContainer">
            <h2 align="center">List of tires</h2>
          {listOfTires}
        </div>
      </div>
        </div>}
      </div>
            );
        }
      }
export default connect(null)(AddNewDeal);