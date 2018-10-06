import React, { Component } from "react";
import axios from "axios";
import "./AddNewPart.css";
import superagent  from 'superagent';
import Dropzone from 'react-dropzone';

export default class AddNewPart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      brand: "",
      model: "",
      price: "",
      condition: "",
      year: "",
      description: "",
      files: [],
      formShowself: true
    };
  }

  handleChange(property, event) {
    event.preventDefault();
    this.setState({ [property]: event.target.value }); // directly changing state's values
  }

  handleSubmit(event) { //adding a new part
    event.preventDefault();
    let {
      title,
      brand,
      model,
      price,
      condition,
      year,
      description
    } = this.state;
    axios
      .post("/parts/new", {
        title,
        brand,
        model,
        price,
        condition,
        year,
        description
      })
      .then(response => {
        console.log(response);
        this.upload(response.data._id);
        alert("New part was created!");
        this.setState({
          formShowself: false //Refreshing the form
        }, function () {
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
          .post(`/api/upload/parts/${id}`)
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
      <div className="addnewpart-container">
        <h2>Add a new part</h2>
        {this.state.formShowself &&
          <form
            className="addnewpart-form"
            onSubmit={event => this.handleSubmit(event)}
          >
            <table>
              <tbody>
                <tr>
                  <th>Options</th>
                  <th>Parametres</th>
                </tr>
                <tr>
                  <td>
                    <p>Title:</p>
                  </td>
                  <td>
                    <input
                      onChange={event => this.handleChange("title", event)}
                      className="input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="inputparagraph">Brand:</p>
                  </td>
                  <td>
                    <input
                      onChange={event => this.handleChange("brand", event)}
                      className="input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="inputparagraph">Model: </p>
                  </td>
                  <td>
                    <input
                      onChange={event => this.handleChange("model", event)}
                      className="input"
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
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="inputparagraph">Condition: </p>
                  </td>
                  <td>
                    <input
                      onChange={event => this.handleChange("condition", event)}
                      className="input"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="inputparagraph">Year: </p>
                  </td>
                  <td>
                    <input
                      onChange={event => this.handleChange("year", event)}
                      className="input"
                      type="number"
                    />
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
                    />
                  </td>
                </tr>
                <tr><td>
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
              </td></tr>
                <tr>
                  <td>
                    <input type="submit" className="btn btn-primary" />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        }
      </div>
    );
  }
}
