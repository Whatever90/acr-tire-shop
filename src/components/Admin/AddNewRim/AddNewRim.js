import React, { Component } from "react";
import axios from "axios";
import "./AddNewRim.css";
import superagent  from 'superagent';
import Dropzone from 'react-dropzone';

export default class AddNewRim extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diameter: 15,
      brand: "",
      price: 0,
      condition: "new",
      count: "",
      description: "",
      files: [],
      formShowself: true
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value }); // directly changing state's values
  }

  handleSubmit(event) { //adding a new rim
    event.preventDefault();
    let {
      diameter,
      brand,
      price,
      condition,
      count,
      description
    } = this.state;
    diameter = Number(diameter);
    axios
      .post("/rims/new", {
        diameter,
        brand,
        price,
        condition,
        count,
        description
      })
      .then(response => {
        console.log(response);
        this.upload(response.data._id);
        alert("New rim was created!");
        this.setState({ //clearing state
          brand: "",
          price: 0,
          count: 0,
          diameter: 15,
          condition: "new",
          description: "",
          formShowself: false // Reloading form by disabling and enabling
        }, function () {
          this.setState({
            formShowself: false
          })
          this.setState({
            formShowself: true
          })
        })
      })
      .catch(error => console.log(error));
  }
  onDrop(photo) {
    var tempArr = this.state.files; // Hardcode mode ON
    tempArr.push(photo[0]);
    this.setState({
      files: tempArr  // here we store pics in this.state
    })
    console.log(this.state.files);
  }
  upload(id) {
    var counter = 0;
    console.log(id);
    console.log(this.state.files);
    for (let i = 0; i < this.state.files.length; i++) {
      if (this.state.files[i]) {
        superagent
          .post(`/api/upload/rims/${id}`)
          .attach('item', this.state.files[i])
          .end((error, response) => {
            if (error) console.log(error);
            counter++;
            if (counter === this.state.files.length) {
              console.log("DAAAAAAAAA");
              this.clearPhotos();
            }
            console.log('File Uploaded Succesfully'); // Just taking all pics from this.state.files and send them on the back-end and then to s3
          })
      }
      // and getting back urls to those pics
    }
  }
  clearPhotos() {
    this.setState({
      files: []
    })
  }
  delete(e, index) {
    var tempFiles = this.state.files;
    delete tempFiles[index];
    this.setState({
      files: tempFiles
    })
  }
  render() {
    return (
      <div className="addNewTire-body">
      
        {this.state.formShowself && < div >
        <h2 align="center">Add new rim</h2>
         <div className="row" id="addNewTire-box">
          <div className="col-md-3">
            <label>diameter : </label>
           <select className="form-control" type="number" name="diameter" onChange={event => this.handleChange("diameter", event)}>
                    <option selected value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                    <option value="21">21</option>
                    <option value="22">22</option>
                    <option value="23">23</option>
                  </select>
            <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand"  />
            <label>count : </label><input type='number' className='form-control' onChange={event => this.handleChange("count", event)} placeholder="count"  />
            <label>Price : </label><input type='number' className='form-control' onChange={event => this.handleChange("price", event)} placeholder="Price"  />
          </div>
          <div className="col-md-3">
            <label>Condition :</label>
           <select className="form-control" name="condition" onChange={event => this.handleChange("condition", event)}>
                    <option value="used">Used</option>
                    <option selected value="new">New</option>
                  </select>
            <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" />
          <button onClick={(event) => this.handleSubmit(event)} className="btn btn-primary input">Submit</button>
          </div>
          <div className="col-md-3">
           <div className="uploader">
                        <Dropzone className="dropzone" onClick={(event) => event.preventDefault()} onDrop={(photo)=> this.onDrop(photo) } multiple={true}> 
                            <button className="btn btn-warning" onClick={(event) => event.preventDefault()} >+</button>
                        </Dropzone>
                        <h4>Chosen photos</h4>
                        <ul>
                            {this.state.files.length>0 && this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes <img src={e.preview} className="prevImg" alt={e._id}/>
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => this.delete(e, i)} >Remove</button>
                            </li>) }
                        </ul>
                    </div>
          </div>
        </div>
        </div>}
      </div>
    );
  }
}
