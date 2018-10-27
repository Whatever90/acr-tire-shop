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
    return (
 
    <div className="addNewTire-body" >
      <h1>CREATING A NEW DEAL!</h1>
      <button onClick={() => this.show_state()}>Show state</button>
      </div>
            );
        }
      }
export default connect(null)(AddNewDeal);