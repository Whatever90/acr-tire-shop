import React, { Component } from 'react';
import axios from 'axios';
import './Admin.css';
import AddNewTire from './AddNewTire/AddNewTire';
import AddNewRim from './AddNewRim/AddNewRim';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/ducks/reducer';
import Navbar from "./../Navbar/Navbar"
import Uploader from "./../Uploader/Uploader";
import { savePhotos, getPhotos } from './../../redux/ducks/reducer';
import Dropzone from 'react-dropzone';
import superagent from 'superagent';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requests: [],
      tires: [],
      rims: [],
      //
      width: 0,
      ratio: 0,
      diameter: 0,
      count: 0,
      type: "",
      //
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
      axios.get(`/rims/all`)
    ]).then(axios.spread((requests, tires, rims) => {
      this.setState({
        requests: requests.data,
        tires: tires.data,
        rims: rims.data
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


  // Tires functions --------------------------------------------
  edit_tire(tire) {
    if (this.state.temp_id === tire._id) {
      this.clearState();
    } else {
      this.setState({
        temp_id: tire._id,
        brand: tire.brand,
        width: tire.width,
        ratio: tire.ratio,
        diameter: tire.diameter,
        price: tire.price,
        description: tire.description,
        condition: tire.condition,
        count: tire.count,
        type: tire.type,
        photos: tire.photos,
        files: [],
        photos_to_delete: []
      })
    }
  }

  edit_Tire_submit(event, index) {
    event.preventDefault();

    let {
      temp_id, brand, model, price, width, description, ratio, diameter, count, type, photos
    } = this.state;

    axios
      .post("/tires/edit", {
        temp_id, brand, model, price, width, description, ratio, diameter, count, type, photos
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

  refreshTireById(id) {
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

  tires_list_remove(id) {
    var tireArray = this.state.tires;
    for (let i = 0; i < tireArray.length; i++) {
      if (tireArray[i]._id === id) {
        for (let k = i; k < tireArray.length; k++) {
          tireArray[k] = tireArray[k + 1];
        }
        tireArray.pop();
        break;
      }
    }
    this.setState({
      tires: tireArray
    })
  }

  // end of tires functions ----------------------


  // Rims functions  ------------------------
  edit_rim(rim) {
    if (this.state.temp_id === rim._id) {
      this.cancelDeletion();
      this.clearState();
    } else {
      this.setState({
        container: rim,
        temp_id: rim._id,
        brand: rim.brand,
        diameter: rim.diameter,
        count: rim.count,
        condition: rim.condition,
        price: rim.price,
        description: rim.description,
        photos: rim.photos,
        files: [],
        photos_to_delete: []
      })
    }
  }
  edit_rim_submit(event, index) {
    event.preventDefault();
    let {
      temp_id, brand, count, price, description, condition, diameter, photos
    } = this.state;

    axios
      .post("/rims/edit", {
        temp_id, brand, count, price, description, condition, diameter, photos
      })
      .then(response => {
        if (response.data) {
          this.upload(this.state.temp_id, "rims");
          this.photos_deletion_submitted("rims", temp_id);
          this.edit_cancel();
          alert("the rim was updated");
          // console.log("the rim was updated");   /// ++++++++++++++++++ ADD A MESSAGE!
        } else {
          alert("can't update this rim");
          // console.log("can't update this rim") /// ++++++++++++++++++ ADD A MESSAGE!
        }
      })
      .catch(error => console.log("BLYAAAD'", error));  /// ++++++++++++++++++ ADD A MESSAGE!
  }
  refreshRimById(id) {
    var id = {
      _id: id
    }
    console.log("refreshing by id", id);
    var tempArr = this.state.rims;
    axios.post('/rims/find/', id)
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

  rims_list_remove(id) {
    var tireArray = this.state.rims;
    for (let i = 0; i < tireArray.length; i++) {
      if (tireArray[i]._id === id) {
        for (let k = i; k < tireArray.length; k++) {
          tireArray[k] = tireArray[k + 1];
        }
        tireArray.pop();
        break;
      }
    }
    this.setState({
      tires: tireArray
    })
  }

  // END OF RIMSS FUNCTIONS -------------




  // LOCAL UPLOADER FOR TIRES AND RIMS ++++++++++++++++
  onDrop(photo) {
    console.log("PHOTO!", photo);
    var tempArr = this.state.files;
    tempArr.push(photo[0]);
    this.setState({
      files: tempArr  // here we store pics in this.state
    })

  }

  upload(id, x) { // x - is either "tire" or "rim", and by using id we add photos to a specific tire of rim
    var filesToUpload = this.state.files;
    var counter = 0;
    console.log(id, x);
    if (filesToUpload.length === 0) {
      if (x === "tires") {
        console.log("1 lol", x, id);
        this.refreshTireById(id)
      } else if (x === "rims") {
        console.log("1 lol", x, id);
        this.refreshRimById(id)
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
            if (x === "tires") {
              console.log("1 lol", x, id);
              this.refreshTireById(id)
            } else if (x === "rims") {
              console.log("1 lol", x, id);
              this.refreshRimById(id)
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

  handleDelete(i, x) { // Deleting tire or rim (is "x") by ID
    var id = {
      id: i
    }
    axios.post(`/${x}/delete`, id)
      .then(res => {
        if (res.data) {
          this.clearState();
          if (x === "tires") {
            this.tires_list_remove(i)
          } else if (x === "rims") {
            this.rims_list_remove(i)
          }
        } else {
          console.log("can't delete this one of", x)
        }
      })
      .catch(error => console.log(error));
  }
  cancelDeletion() {
    console.log(this.state.container);
    var arrRims = this.state.rims;
    for (let i = 0; i < arrRims.length; i++) {
      if (arrRims[i]._id == this.state.container._id) {
        arrRims[i] = this.state.container;
        this.setState({
          rims: arrRims
        })
        break;
      }
    }
  }

  deletePhoto(id, element) {
    console.log(id, element);
    var tempArr = this.state.photos;
    var arrDeletion = this.state.photos_to_delete;
    for (let i = 0; i < tempArr.length; i++) {
      if (tempArr[i] === element) {
        for (let k = i; k < tempArr.length - 1; k++) {
          tempArr[k] = tempArr[k + 1]
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

  photos_deletion_submitted(x, id) {
    if (this.state.photos_to_delete.length < 1) {
      return;
    }
    console.log("deleting photos for", x);
    var arrToDelete = this.state.photos_to_delete;
    console.log("Photos to delete:", arrToDelete);
    var counter = 0;
    for (var i = 0; i < arrToDelete.length; i++) {
      const url = arrToDelete[i].split('/');
      const fileName = url[url.length - 1];
      counter++;
      axios.delete(`/api/delete/${fileName}`)
        .then(res => {
          console.log(arrToDelete[i], "is deleted");
        }).catch(err => console.log(err));
      if (counter === arrToDelete.length) {
        if (x === "tires") {
          this.refreshTireById(id)
        } else if (x === "rims") {
          this.refreshRimById(id)
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
      container: null,
      width: 0,
      ratio: 0,
      diameter: 0,
      count: 0,
      type: "",
    })
  }

  checkState() {              // Dev function.
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

    const listOfTires = this.state.tires.map((tire, index) => (
      <div id="rim_box" key={tire._id}>
        <div className="row" >
          <div className="col-lg-5">
            <label className="switch">
              <input type="checkbox" id="rim_edit_switcher" checked={this.state.temp_id === tire._id} onClick={() => this.edit_tire(tire)} />
              <span className="slider"></span>
            </label>
            Edit
            <button className="btn btn-danger rim-btn" onClick={() => this.handleDelete(tire._id, "tires")} disabled={this.state.temp_id !== tire._id}>Delete</button>
            <button className="btn btn-primary rim-btn" onClick={(event) => this.edit_tire_submit(event, tire._id)} disabled={this.state.temp_id !== tire._id}>Submit</button>
          </div>
          <div className="col-md-4">
          </div>
        </div>
        <div className="row" >
          <div className="col-md-3">
            <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={tire.brand} disabled={this.state.temp_id !== tire._id} />
            <label>width : </label><input type='number' className='form-control' onChange={event => this.handleChange("width", event)} placeholder="width" defaultValue={tire.width} disabled={this.state.temp_id !== tire._id} />
            <label>Price : </label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={tire.price} disabled={this.state.temp_id !== tire._id} />
            <label>ratio :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("ratio", event)} placeholder="ratio" defaultValue={tire.ratio} disabled={this.state.temp_id !== tire._id} />
          </div>
          <div className="col-md-3">
            <label>diameter : </label><input type='text' className='form-control' onChange={event => this.handleChange("diameter", event)} placeholder="diameter" defaultValue={tire.diameter} disabled={this.state.temp_id !== tire._id} />
            <label>condition :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("condition", event)} placeholder="condition" defaultValue={tire.condition} disabled={this.state.temp_id !== tire._id} />
            <label>count :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("count", event)} placeholder="count" defaultValue={tire.count} disabled={this.state.temp_id !== tire._id} />
            <label>type :</label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("type", event)} placeholder="type" defaultValue={tire.type} disabled={this.state.temp_id !== tire._id} />
            <label>Description :</label><textarea type='text' className='form-control' onChange={event => this.handleChange("description", event)} placeholder="Description" defaultValue={tire.description} rows="4" disabled={this.state.temp_id !== tire._id} />
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

    const listOfRims = this.state.rims.map((rim, index) => (
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
            <label>diameter : </label><input type='text' className='form-control' onChange={event => this.handleChange("diameter", event)} placeholder="diameter" defaultValue={rim.diameter} disabled={this.state.temp_id !== rim._id} />
            <label>Brand : </label><input type='text' className='form-control' onChange={event => this.handleChange("brand", event)} placeholder="Brand" defaultValue={rim.brand} disabled={this.state.temp_id !== rim._id} />
            <label>count : </label><input type='text' className='form-control' onChange={event => this.handleChange("count", event)} placeholder="count" defaultValue={rim.count} disabled={this.state.temp_id !== rim._id} />
            <label>Price : </label><input type='text' className='form-control' type="number" onChange={event => this.handleChange("price", event)} placeholder="Price" defaultValue={rim.price} disabled={this.state.temp_id !== rim._id} />
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

    return (
      <div >
        < Navbar />
        <div className="admin-main-container">
          {user && <div className="mainDiv">
            <h1>Admin</h1>
            <button type="button" className="btn btn-outline-danger" onClick={() => this.logout()}>Log out</button>
            <div className="list_of_requests">
              <h2>Requests</h2>
              {listOfRequests}
            </div>

            <AddNewTire />
            {this.state.tires.length && <div className="rims">
              <h2>Tires</h2>
              {listOfTires}
            </div>}

            <AddNewRim />

            <div className="rims">
              <h2>Rims</h2>
              {listOfRims}
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
