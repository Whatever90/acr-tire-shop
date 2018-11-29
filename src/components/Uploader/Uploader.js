import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import superagent  from 'superagent';
import './Uploader.css';
// import axios from 'axios';
import { connect } from 'react-redux';
import { getPhotos } from '../../redux/ducks/reducer';
import { savePhotos } from '../../redux/ducks/reducer';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      images: []
    }
  }

  onDrop = (photo) => {
    var tempArr = this.state.files;
    console.log(photo);
    tempArr.push(photo[0]);
    this.setState({
        files: tempArr
    })
    //this.setState({ files });
    // the upload http request can go here for an immediate upload after the drop. I'm just using submit button for now.
  }

    upload = () => {
        var tempArr = [];
        for(let i = 0; i<this.state.files.length; i++){
            superagent
                .post('/api/upload')
                .attach('item', this.state.files[i])
                .end((error, response) => {
                    tempArr.push(response.text)
                    console.log(tempArr);
                    if (error) console.log(error);
                    console.log('File Uploaded Succesfully');
                })
        }
        this.props.savePhotos(tempArr)
    }

  delete = (element) => {
    //   console.log(element.name);
    var tempArr = this.state.files;
    for(let i = 0; i<tempArr.length; i++){
        if(tempArr[i].name === element.name){
          for(let k = i; k<tempArr.length-1; k++){
              tempArr[k] = tempArr[k+1]
          }
          tempArr.pop()
          break;
        }
    }
    this.setState({
        files: tempArr
    })
  }

  render() {
    return(
      <div>
        <div>
          <div className="uploader">
              <Dropzone className="dropzone" onDrop={this.onDrop} multiple={false}>
                  <button className="btn btn-warning">+</button>
              </Dropzone>
              <h4>Chosen photos</h4>
              <ul>
                {this.state.files.length>0 && this.state.files.map((e, i) => <li key={i}>{e.name} - {e.size} bytes <img src={e.preview} className="prevImg" alt="pic"/>
                <button type="button" className="btn btn-danger btn-sm" onClick={() => this.delete(e)}>Remove</button>
                </li>) }
              </ul>
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => this.upload()}>Upload (click here first before Submit)</button>
        </div>
        { this.state.image && <img src={this.state.image.image_url} alt="pic"/> }
      </div>)
  }
}

const mapDispatchToProps = {
  savePhotos: savePhotos,
  getPhotos: getPhotos
}

export default connect(null, mapDispatchToProps)(Uploader);