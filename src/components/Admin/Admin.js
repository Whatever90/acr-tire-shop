import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewCar from './AddNewCar/AddNewCar';
import AddNewPart from './AddNewPart/AddNewPart';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';
import Navbar from "./../Navbar/Navbar"
import Uploader from "./../Uploader/Uploader";
import {savePhotos, getPhotos} from './../../redux/ducks/reducer';
import Dropzone from 'react-dropzone';
import superagent  from 'superagent';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      tires: [],
      parts: [],
      temp_id: '',
      title: "",
      brand: "",
      model: "",
      price: "",
      condition: "",
      year: "",
      description: "",
      mileage: "",
      photos: [],
      files: [],
      photos_to_delete: [],
      container: null
    };
  }
/// oh boy, here we go. 
  componentDidMount() {
    axios.get('/user/data')
    .then(response => {
      if (response.data.user) {
        this.props.login(response.data.user); // adding admin to session
      }
    })
    .catch(error => console.log(error))
  }

  componentWillMount() {
    console.log(window.location);
    axios.all([
      axios.get(`/requests/all`),
      axios.get(`/tires/all`),
      axios.get(`/parts/all`)
    ]).then(axios.spread((requests, tires, parts) => {
      this.setState({
        requests: requests.data,
        tires: tires.data,
        parts: parts.data
      })
    })).catch(err => console.log(err));

  }


  // REQUESTS -------------------------------------
  handleRequestDelete(i) {
    axios.post('/requests/delete', { i })
      .then(res => {
        if (res.data) {
          axios.get('/requests/all')
            .then(res => {
              this.setState({ requests: res.data })
            })
            .catch(error => console.log(error));
        }
      })
      .catch(error => console.log(error));
  }
  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value });
  }

  // END OF REQUESTS -------------------------------------


  // Cars functions --------------------------------------------
  edit_car(tire) {
    if (this.state.temp_id === tire._id) {
      this.clearState();
    } else {
      this.setState({
        temp_id: tire._id,
        brand: tire.brand,
        model: tire.model,
        year: tire.year,
        price: tire.price,
        description: tire.description,
        mileage: tire.mileage,
        photos: tire.photos,
        files: [],
        photos_to_delete: []
      })
    }
  }

  edit_car_submit(event, index) {
    event.preventDefault();
    
    let {
      temp_id, brand, model, price,  year, description, mileage, photos
    } = this.state;
    
    axios
      .post("/tires/edit", {
        temp_id, brand, model, price, year, description, mileage, photos
      })
      .then(response => {
        if (response.data) {
          this.upload(this.state.temp_id, "tires");
          this.photos_deletion_submitted("tires", temp_id);
          this.edit_cancel();
          alert("the tire was updated");
          // console.log("the tire was updated"); /// ++++++++++++++++++ ADD A MESSAGE!
        } else {
          alert("can't update this tire");
          // console.log("can't update this tire") /// ++++++++++++++++++ ADD A MESSAGE!
        }
      })
      .catch(error => console.log("BLYAAAD'", error)); /// ++++++++++++++++++ ADD A MESSAGE!
    
  }

  refreshCarById(id) {
    var id = {
      _id: id
    }
    var tempArr = this.state.tires;
    axios.post('/tires/find/', id)
      .then(res => {
        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i]._id === id._id) {
            tempArr[i] = res.data;
            this.setState({
              tires: tempArr
            })
            break;
          }
        }
      })
  }

  cars_list_remove(id) {
    var carArray = this.state.tires;
    for(let i = 0; i< carArray.length; i++){
      if(carArray[i]._id === id){
        for(let k = i; k<carArray.length; k++){
          carArray[k] = carArray[k+1];
        }
        carArray.pop();
        break;
      }
    }
    this.setState({
      tires: carArray
    })
  }

  // end of tires functions ----------------------


  // Parts functions  ------------------------
  edit_part(part) {
    if (this.state.temp_id === part._id) {
      this.cancelDeletion();
      this.clearState();
    } else {
      this.setState({
        container: part,
        temp_id: part._id,
        brand: part.brand,
        title: part.title,
        model: part.model,
        year: part.year,
        condition: part.condition,
        price: part.price,
        description: part.description,
        photos: part.photos,
        files: [],
        photos_to_delete: []
      })
    }
  }
  edit_part_submit(event, index) {
    event.preventDefault();
    let {
      temp_id, brand, model, price, year, description, condition, title, photos
    } = this.state;
    
    axios
      .post("/parts/edit", {
        temp_id, brand, model, price, year, description, condition, title, photos
      })
      .then(response => {
        if (response.data) {
          this.upload(this.state.temp_id, "parts");
          this.photos_deletion_submitted("parts", temp_id);
          this.edit_cancel();
          alert("the part was updated");
          // console.log("the part was updated");   /// ++++++++++++++++++ ADD A MESSAGE!
        } else {
          alert("can't update this part");
          // console.log("can't update this part") /// ++++++++++++++++++ ADD A MESSAGE!
        }
      })
      .catch(error => console.log("BLYAAAD'", error));  /// ++++++++++++++++++ ADD A MESSAGE!
  }
  refreshPartById(id) {
    var id = {
      _id: id
    }
    console.log("refreshing by id", id);
    var tempArr = this.state.parts;
    axios.post('/parts/find/', id)
      .then(res => {
        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i]._id === id._id) {
            console.log("YES!", res.data);
            tempArr[i] = res.data;
            this.setState({
              tires: tempArr
            })
            break;
          }
        }
      })
  }

  parts_list_remove(id) {
    var carArray = this.state.parts;
    for(let i = 0; i< carArray.length; i++){
      if(carArray[i]._id === id){
        for(let k = i; k<carArray.length; k++){
          carArray[k] = carArray[k+1];
        }
        carArray.pop();
        break;
      }
    }
    this.setState({
      tires: carArray
    })
  }

// END OF PARTS FUNCTIONS -------------




  // LOCAL UPLOADER FOR CARS AND PARTS ++++++++++++++++
  onDrop(photo) {
    console.log("PHOTO!", photo);
    var tempArr = this.state.files;
    tempArr.push(photo[0]);
    this.setState({
      files: tempArr  // here we store pics in this.state
    })

  }

  upload(id, x) { // x - is either "tire" or "part", and by using id we add photos to a specific tire of part
    var filesToUpload = this.state.files;
    var counter = 0;
    console.log(id, x);
    if (filesToUpload.length === 0) {
      if (x === "tires") {
        console.log("1 lol", x, id);
        this.refreshCarById(id)
      } else if (x === "parts") {
        console.log("1 lol", x, id);
        this.refreshPartById(id)
      }
      return;
    }
    for (let i = 0; i < filesToUpload.length; i++) {
      superagent
        .post(`/api/upload/${x}/${id}`)
        .attach('item', filesToUpload[i])
        .end((error, response) => {
          if (error) console.log(error);
          counter++;
          if (counter === filesToUpload.length) {
            if(x === "tires"){
              console.log("1 lol", x, id);
              this.refreshCarById(id)
            }else if(x === "parts"){
              console.log("1 lol", x, id);
              this.refreshPartById(id)
            }
          }
          console.log('File Uploaded Succesfully'); // Just taking all pics from this.state.files and send them on the back-end and then to s3
        })                                        // and getting back urls to those pics
    }
  }

  delete = (element) => { // deleting a photo from a local storage
    var tempArr = this.state.files;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i].name === element.name) {
        for (let k = i; k < tempArr.length - 1; k++) {
          tempArr[k] = tempArr[k + 1]
        }
        tempArr.pop()
        break;
      }
    }
    this.setState({
      files: tempArr
    })
  }

  // MISC FUNCTIONS ---------

  edit_cancel() {
    this.clearState();  // canceling editor and clearing this.state
  }

  handleDelete(i, x) { // Deleting tire or part (is "x") by ID
    var id = {
      id: i
    }
    axios.post(`/${x}/delete`, id)
      .then(res => {
        if (res.data) {
          this.clearState();
          if(x === "tires"){
            this.cars_list_remove(i)
          }else if(x === "parts"){
            this.parts_list_remove(i)
          }
        } else {
          console.log("can't delete this one of", x)
        }
      })
      .catch(error => console.log(error));
  }
  cancelDeletion(){
    console.log(this.state.container);
    var arrParts = this.state.parts;
    for(let i = 0; i< arrParts.length; i++){
      if(arrParts[i]._id == this.state.container._id){
        arrParts[i] = this.state.container;
        this.setState({
          parts: arrParts
        })
        break;
      }
    }
  }    

  deletePhoto(id, element){
    console.log(id, element);
    var tempArr = this.state.photos;
    var arrDeletion = this.state.photos_to_delete;
    for(let i = 0; i< tempArr.length; i++){
      if(tempArr[i] === element){
        for(let k = i; k < tempArr.length-1; k++){
          tempArr[k] = tempArr[k+1]
        }
        tempArr.pop();
        break;
      }
    }
    arrDeletion.push(element);
    this.setState({
      photos: tempArr,
      photos_to_delete: arrDeletion
    })
  }

  photos_deletion_submitted(x, id){
    if(this.state.photos_to_delete.length<1){
      return;
    }
    console.log("deleting photos for", x);
    var arrToDelete = this.state.photos_to_delete;
    console.log("Photos to delete:", arrToDelete);
    var counter = 0;
    for(var i = 0; i< arrToDelete.length; i++){
      const url = arrToDelete[i].split('/');
      const fileName = url[url.length - 1];
      counter++;
      axios.delete(`/api/delete/${fileName}`)
        .then(res => {
          console.log(arrToDelete[i], "is deleted");
        }).catch(err => console.log(err));
      if(counter === arrToDelete.length){
        if(x === "tires"){
          this.refreshCarById(id)
        } else if(x === "parts"){
          this.refreshPartById(id)
        }
      }
    }
  }
  
  logout() {
    console.log(this.state)
    axios.post('/user/logout')
      .then(response => {
        console.log('you are out');
        this.props.login(null)
        this.props.history.push('/login');
        console.log('you are logged out'); /// ++++++++++++++++++ ADD A MESSAGE!
      })
      .catch(error => {
        console.log(error)
      })
  }

  clearState() {
    this.setState({ 
      temp_id: "",
      brand: "",
      title: "",
      model: "",
      year: "",
      condition: "",
      price: "",
      description: "",
      mileage: "",
      photos: [],
      files: [],
      photos_to_delete: [],
      container: null
    })
  }

  checkState(){              // Dev function.
    console.log(this.state); // Just checking this.state. Should be removed before releasing the final version
  }



  render() {
    const { user } = this.props;
    const listOfRequests = this.state.requests.map(request => (
      <div className="admin-requests-container border-top-0" key={request._id}>
          <div>Name: {request.name}</div>
          <div>Phone: {request.phone}</div>
          <div>Message: {request.message}</div>
          <button className="btn btn-danger" onClick={() => this.handleRequestDelete(request._id)}>Delete</button>
      </div>
    ));

    const listOfCars = this.state.tires.map((tire, index) => (
      <div id="part_box" key={tire._id}>
      <div className="row" >
          <div className="col-lg-5">
              <label className="switch">
                <input type="checkbox" id="part_edit_switcher" checked={this.state.temp_id === tire._id} onClick={() => this.edit_car(tire)} />
                <span className="slider"></span>
              </label>
              Edit
            <button className="btn btn-danger part-btn" onClick={() => this.handleDelete(tire._id, "tires")} disabled={this.state.temp_id !== tire._id}>Delete</button>
            <button className="btn btn-primary part-btn" onClick={(event) => this.edit_car_submit(event, tire._id)} disabled={this.state.temp_id !== tire._id}>Submit</button>
          </div>
          <div className="col-md-4">
          </div>
        </div>
      <div className="row" >
        <div className="col-md-3"> 
          <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={tire.brand} disabled={this.state.temp_id !== tire._id} />
          <label>Model : </label><input type='text' className='form-control' onChange={event => this.handleChange("model", event)} placeholder="Model" defaultValue={tire.model} disabled={this.state.temp_id !== tire._id} />
          <label>Price : </label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={tire.price} disabled={this.state.temp_id !== tire._id} />
          <label>Year :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={tire.year} disabled={this.state.temp_id !== tire._id} />
           </div>
        <div className="col-md-3">
          <label>Color : </label><input type='text' className='form-control' onChange={event => this.handleChange("color", event)} placeholder="Color" defaultValue={tire.color} disabled={this.state.temp_id !== tire._id} />
          <label>Mileage :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("mileage", event)} placeholder="Mileage" defaultValue={tire.mileage} disabled={this.state.temp_id !== tire._id} />
          <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={tire.description} rows="4" disabled={this.state.temp_id !==tire._id} />
        </div>
        <div className="col-md-3">
            <ul>  {tire.photos && tire.photos.length > 0 && tire.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
                <button type="button" className="btn btn-danger btn-xs" onClick={() => this.deletePhoto(tire._id, e)} disabled={this.state.temp_id !== tire._id}>x</button>
              </li>)}
            </ul>
        </div>
        <div className="col-md-3">
            <div className="uploader">
              <Dropzone className="dropzone" onClick={(event) => event.preventDefault()} onDrop={(photo) => this.onDrop(photo)} multiple={true} disabled={this.state.temp_id !== tire._id}>
                <button className="btn btn-warning btn-xs" disabled={this.state.temp_id !== tire._id} onClick={(event) => event.preventDefault()} >+</button>
              </Dropzone>
              {this.state.temp_id === tire._id && <p>Chosen photos</p>}
              {this.state.temp_id === tire._id && this.state.files.length > 0 && this.state.files.map((e, i) =>
                <small key={i}><p>{e.name} - <img src={e.preview} className="prevImg" alt="img" />
                  <button type="button" className="btn btn-danger btn-xs" onClick={() => this.delete(e)} disabled={this.state.temp_id !== tire._id}>x</button></p>
                </small>)}
            </div>
        </div>
      </div>
    </div>
    ));

    const listOfParts = this.state.parts.map((part, index) => (
      <div id="part_box" key={part._id}>
      <div className="row" >
          <div className="col-lg-5">
              <label className="switch">
                <input type="checkbox" id="part_edit_switcher" checked={this.state.temp_id === part._id} onClick={() => this.edit_part(part)} />
                <span className="slider"></span>
              </label>
              Edit
            <button className="btn btn-danger part-btn" onClick={() => this.handleDelete(part._id, "parts")} disabled={this.state.temp_id !== part._id}>Delete</button>
            <button className="btn btn-primary part-btn" onClick={(event) => this.edit_part_submit(event, part._id)} disabled={this.state.temp_id !== part._id}>Submit</button>
          </div>
          <div className="col-md-4">
          </div>
        </div>
      <div className="row" >
        <div className="col-md-3"> 
          <label>Title : </label><input type='text' className='form-control' onChange={event => this.handleChange("title", event)} placeholder="Title" defaultValue={part.title} disabled={this.state.temp_id !== part._id} />
          <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={part.brand} disabled={this.state.temp_id !== part._id} />
          <label>Model : </label><input type='text' className='form-control' onChange={event => this.handleChange("model", event)} placeholder="Model" defaultValue={part.model} disabled={this.state.temp_id !== part._id} />
          <label>Price : </label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={part.price} disabled={this.state.temp_id !== part._id} />
        </div>
        <div className="col-md-3">
          <label>Condition :</label><input type='text' className='form-control' onChange={event => this.handleChange("condition", event)} placeholder="Condition" defaultValue={part.condition} disabled={this.state.temp_id !== part._id} />
          <label>Year :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("year", event)} placeholder="Year" defaultValue={part.year} disabled={this.state.temp_id !== part._id} />
          <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={part.description} rows="4" disabled={this.state.temp_id !==part._id} />
        </div>
        <div className="col-md-3">
            <ul>  {part.photos && part.photos.length > 0 && part.photos.map((e, i) => <li key={i}><img src={e} alt="img" className="prevImg" />
                <button type="button" className="btn btn-danger btn-xs" onClick={() => this.deletePhoto(part._id, e)} disabled={this.state.temp_id !== part._id}>x</button>
              </li>)}
            </ul>
        </div>
        <div className="col-md-3">
            <div className="uploader">
              <Dropzone className="dropzone" onClick={(event) => event.preventDefault()} onDrop={(photo) => this.onDrop(photo)} multiple={true} disabled={this.state.temp_id !== part._id}>
                <button className="btn btn-warning btn-xs" disabled={this.state.temp_id !== part._id} onClick={(event) => event.preventDefault()} >+</button>
              </Dropzone>
              {this.state.temp_id === part._id && <p>Chosen photos</p>}
              {this.state.temp_id === part._id && this.state.files.length > 0 && this.state.files.map((e, i) =>
                <small key={i}><p>{e.name} - <img src={e.preview} className="prevImg" alt="img" />
                  <button type="button" className="btn btn-danger btn-xs" onClick={() => this.delete(e)} disabled={this.state.temp_id !== part._id}>x</button></p>
                </small>)}
            </div>
        </div>
      </div>
    </div>
    ));

    return (
      <div >
        < Navbar />
        <div className="admin-main-container">
          {user && <div className="mainDiv">
            <h1>Admin</h1>
            <button type="button" className="btn btn-outline-danger" onClick={ () => this.logout() }>Log out</button>
            <div className="list_of_requests">
              <h2>Requests</h2>
              {listOfRequests}
            </div>
            
            <AddNewCar />
            {this.state.tires.length && <div className="parts">
              <h2>Cars</h2>
              {listOfCars}
            </div>}
            
            <AddNewPart />
            
            <div className="parts">
              <h2>Parts</h2>
              {listOfParts}
            </div>
            
          </div>}
          {!user && <div className="you-must-log-in-div"><p>You must log in! <Link to="/login">Log in</Link></p></div>}

          </div>
        </div> 
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    getPhotos: getPhotos,
    savePhotos: savePhotos
  };
};

const mapDispatchToProps = {
  login: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
