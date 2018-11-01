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
      price: 0
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
  show_state(){
    console.log(this.state)
  }

  render() {
    var listOfRims;
    if(this.state.rims.length>0){
      listOfRims = this.state.rims.map((rim, index) => (
      <div id="rim_box" key={rim._id}>
        <div className="row" >
          <div className="col-lg-5">
            <label className="switch">
              <input type="checkbox" id="rim_edit_switcher" checked={this.state.temp_id === rim._id} onClick={() => this.edit_rim(rim)} />
              <span className="slider"></span>
            </label>
            Edit
            <button className="btn btn-danger rim-btn" onClick={() => this.handleDelete(rim._id, "rims")} disabled={this.state.temp_id !== rim._id}>Delete</button>
            <button className="btn btn-primary rim-btn" onClick={(event) => this.edit_rim_submit(event, rim._id)} disabled={this.state.temp_id !== rim._id}>Submit</button>
          </div>
          <div className="col-md-4">
          </div>
        </div>
        <div className="row" >
          <div className="col-md-3">
            <label>diameter : </label><input type='number' className='form-control' onChange={event => this.handleChange("diameter", event)} placeholder="diameter" defaultValue={rim.diameter} disabled={this.state.temp_id !== rim._id} />
            <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={rim.brand} disabled={this.state.temp_id !== rim._id} />
            <label>count : </label><input type='number' className='form-control' onChange={event => this.handleChange("count", event)} placeholder="count" defaultValue={rim.count} disabled={this.state.temp_id !== rim._id} />
            <label>Price : </label><input type='number' className='form-control' onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={rim.price} disabled={this.state.temp_id !== rim._id} />
          </div>
          <div className="col-md-3">
            <label>Condition :</label><input type='text' className='form-control' onChange={event => this.handleChange("condition", event)} placeholder="Condition" defaultValue={rim.condition} disabled={this.state.temp_id !== rim._id} />
            <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={rim.description} rows="4" disabled={this.state.temp_id !== rim._id} />
          </div>
          <div className="col-md-3">
            <ul>  {rim.photos && rim.photos.length > 0 && rim.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
              <button type="button" className="btn btn-danger btn-xs" onClick={() => this.deletePhoto(rim._id, e)} disabled={this.state.temp_id !== rim._id}>x</button>
            </li>)}
            </ul>
          </div>
          <div className="col-md-3">
            <div className="uploader">
              <Dropzone className="dropzone" onClick={(event) => event.preventDefault()} onDrop={(photo) => this.onDrop(photo)} multiple={true} disabled={this.state.temp_id !== rim._id}>
                <button className="btn btn-warning btn-xs" disabled={this.state.temp_id !== rim._id} onClick={(event) => event.preventDefault()} >+</button>
              </Dropzone>
              {this.state.temp_id === rim._id && <p>Chosen photos</p>}
              {this.state.temp_id === rim._id && this.state.files.length > 0 && this.state.files.map((e, i) =>
                <small key={i}><p>{e.name} - <img src={e.preview} className="prevImg" alt="img" />
                  <button type="button" className="btn btn-danger btn-xs" onClick={() => this.delete(e)} disabled={this.state.temp_id !== rim._id}>x</button></p>
                </small>)}
            </div>
          </div>
        </div>
      </div>
    ));
    }
     
    return (
 
    <div className="addNewTire-body" >
      <h1>CREATING A NEW DEAL!</h1>
      <button onClick={() => this.show_state()}>Show state</button>
      {listOfRims}
      </div>
      
            );
        }
      }
export default connect(null)(AddNewDeal);