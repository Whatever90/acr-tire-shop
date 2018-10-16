import React, {
  Component
} from "react";
import axios from "axios";
import {
  connect
} from "react-redux";
// import { urlsend } from "../../../redux/ducks/reducer";
import "./AddNewTire.css";
import Dropzone from 'react-dropzone';
import superagent from 'superagent';
import {
  getPhotos,
  savePhotos
} from "../../../redux/ducks/reducer"

class AddNewTire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "",
      width: 0,
      price: 0,
      ratio: 0,
      diameter: 15,
      condition: "new",
      description: "",
      files: [],
      count: 0,
      type: "all season",
      formShowself: true
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({
      [property]: event.target.value
    }); //directly changes state's values
  }

  handleSubmit(event) { //adding a new tire
    event.preventDefault();
    let {
      brand,
      width,
      price,
      count,
      type,
      ratio,
      diameter,
      condition,
      description
    } = this.state;
    diameter = Number(diameter);
    axios
      .post("/tires/new", {
        brand,
        width,
        price,
        count,
        type,
        ratio,
        diameter,
        condition,
        description
      })
      .then(response => {
        this.upload(response.data._id);
      })
      .catch(error => console.log(error));
    console.log(this.state)

    alert("New tire is created!")
    this.setState({ //clearing state
      brand: "",
      width: 0,
      price: 0,
      ratio: 0,
      count: 0,
      type: "all season",
      diameter: 17,
      condition: "new",
      description: "",
      formShowself: false // Reloading form by disabling and enabling
    }, function () {
      this.setState({
        formShowself: true
      })
    })
  }
  onDrop(photo) {
    var tempArr = this.state.files; // Hardcode mode ON
    tempArr.push(photo[0]);
    this.setState({
      files: tempArr // here we store pics in this.state
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
          .post(`/api/upload/tires/${id}`)
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
    return (<div className="addnewtire-container">
      <h2>Add a new tire</h2>
      {this.state.formShowself &&
        <div className="addnewtire-form">
          <table>
            <tbody>
              <tr>
                <th>Options</th>
                <th>Parametres</th>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Brand:</p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("brand", event)}
                    className="input"
                    defaultValue={this.state.brand}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Width: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("width", event)}
                    className="input"
                    type="Number"
                    defaultValue={this.state.width}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Price: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("price", event)}
                    className="input"
                    type="number"
                    defaultValue={this.state.price}
                  />
                </td>
              </tr>
              {/*  */}
            <tr>
              <td>
                <p className="inputparagraph">Count: </p>
              </td>
              <td>
                <input
                  onChange={event => this.handleChange("count", event)}
                  className="input"
                  type="number"
                  defaultValue={this.state.count}
                />
              </td>
            </tr>
            {/*  */}
              <tr>
                <td>
                  <p className="inputparagraph">Ratio: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("ratio", event)}
                    className="input"
                    type="number"
                    defaultValue={this.state.ratio}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Diameter: </p>
                </td>
                <td>
                  
                <select className="form-control" type="number" name="diameter" onChange={event => this.handleChange("diameter", event)}
                  className="input">
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
                </td>
              </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Condition: </p>
                </td>
                <td>
                <select className="form-control" name="condition" onChange={event => this.handleChange("condition", event)}>
                  <option value="used">Used</option>
                  <option selected value="new">New</option>
                </select>
                </td>
              </tr>
            <tr>
              <td>
                <p className="inputparagraph">Type: </p>
              </td>
              <td>
                <select className="form-control" name="type" onChange={event => this.handleChange("type", event)}>
                  <option selected value="all season">All season</option>
                  <option value="racing">Racing</option>
                  <option value="winter">Winter</option>
                  <option value="regular">Regular</option>
                </select>
              </td>
            </tr>
              <tr>
                <td>
                  <p className="inputparagraph">Description: </p>
                </td>
                <td>
                  <input
                    onChange={event => this.handleChange("description", event)}
                    className="input"
                    defaultValue={this.state.description}
                  />
                </td>
              </tr>
              <tr><td>
                <div className="uploader">
                  <Dropzone className="dropzone" onClick={(event) => event.preventDefault()} onDrop={(photo) => this.onDrop(photo)} multiple={true}>
                    <button className="btn btn-warning" onClick={(event) => event.preventDefault()} >+</button>
                  </Dropzone>
                  <h4>Chosen photos</h4>
                  <ul>
                    {this.state.files.length > 0 && this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes <img src={e.preview} className="prevImg" alt={e._id} />
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => this.delete(e, i)} >Remove</button>
                    </li>)}
                  </ul>
                </div>
              </td></tr>
              <tr><td><button onClick={(event) => this.handleSubmit(event)} className="btn btn-primary input">Submit</button></td></tr>
            </tbody>
          </table>
        </div>
      }
    </div>
            );
        }
      }

      const mapStateToProps = state => {
        return {
          url: state.url,
          getPhotos: getPhotos,
          savePhotos: savePhotos
        };
      };
      export default connect(mapStateToProps, null)(AddNewTire);