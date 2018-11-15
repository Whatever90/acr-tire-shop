import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Rims.css';
import aws from '../images/aws.png';

export default class Rims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rims: [],
      search: false,
      inputSearch: {
        title: "",
        brand: null,
        diameter: null,
        priceMin: null,
        priceMax: null,
        count: null,
        condition: null
      },
      copyRims: [],
      filterResult: true,
      filterShowself: true
    };
  }

  componentWillMount() {
    axios.get('/rims/all')
      .then(res => {
        console.log(res);
        this.setState({ rims: res.data, copyRims: res.data })
      })
      .catch(error => console.log(error));
  }

  searchClicked() {
    let status = this.state.search;
    this.setState({
      search: !status
    })
  }

  inputChange(event) { // Listens any value changes of state.inputSearch via form
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let temp = this.state.inputSearch;
    if (parseInt(value) % parseInt(value) === 0 || value === '0') {
      value = parseInt(value);
    }
    temp[name] = value;
    this.setState({
      inputSearch: temp
    });
  }

  searchSubmit() { // Listens any
    let tempRims = [];
    for (let i = 0; i < this.state.copyRims.length; i++) {
      let bool = true;
      for (let k in this.state.inputSearch) {
        if (!bool) {
          console.log("pizda");
          break;
        }
        if (this.state.inputSearch[k]) {
          if (k === "priceMin") {
            if (this.state.copyRims[i].price < this.state.inputSearch[k]) {
              console.log("too cheap!");
              bool = false;
            }
            continue;
          } else if (k === "priceMax") {
            if (this.state.copyRims[i].price > this.state.inputSearch[k]) {
              console.log("too expensive!");
              bool = false
            }
            continue;
          }
          if (this.state.inputSearch[k] === "" || this.state.inputSearch[k] === "All") {
            continue;
          }
          if (this.state.copyRims[i][k] !== this.state.inputSearch[k]) {
            console.log("nea suka", this.state.copyRims[i][k])
            console.log(typeof (this.state.copyRims[i][k]), typeof (this.state.inputSearch[k]))
            bool = false;
          }
        }
      }
      if (bool) {
        console.log("found!")
        tempRims.push(this.state.copyRims[i]);
      } else {
        bool = true;
      }
    }
    this.setState({
      rims: tempRims
    })

  }
  searchCancel() {
    this.setState({
      rims: this.state.copyRims,
      filterResult: true,
      filterShowself: false
    }, function () {
      this.setState({
        filterShowself: true
      })
    })
    let temp = {
      title: "",
      brand: null,
      diameter: null,
      priceMin: 0,
      priceMax: Number.MAX_VALUE,
      listOfDiametres: [],
      count: null,
      condition: null
    };
    this.setState({
      inputSearch: temp
    })
  }

  changeState(x, y, val) {
    var temp = this.state[x];
    if (y) {
      temp[y] = val;
    } else {
      temp = val;
    }
    this.setState({
      x: temp
    })
    console.log(this.state);
    console.log(this.state.inputSearch.yearMax - this.state.inputSearch.yearMin)
  }

  render() {
    let listOfRims = null;
    if (this.state.rims.length > 0) {
      listOfRims = this.state.rims.map((rim, index) => {
        return (
          <Link to={`/rim/${rim._id}`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="rim">
                  <div className="row">
                    <div className="col-md-12" id="top" >
                      <h1 id="title">{rim.brand} {rim.diameter} {rim.ratio} {rim.width}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      {rim.photos.length === 0 && <img src={aws} alt="rim" id="photo" className="photos" />}
                      {rim.photos.length > 0 && <img src={rim.photos[0]} alt="rim" id="photo" className="photos" />}
                    </div>
                    <div className="col-md-4">
                      <p id="diameter">Count: {rim.count},  {rim.description}</p>
                      <p id="condition">Condition: {rim.condition} </p>
                    </div>
                    <div className="col-md-4">
                      <p id="price">${rim.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })
    } else {
      listOfRims = '';
    }
    var listOfBrands = [];
    this.state.copyRims.forEach(function (rim) {
      listOfBrands.push(rim.brand)
    })
    listOfBrands = listOfBrands.filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    }).sort().map((b, index) => {
      return (
        <option key={index}>{b}</option>
      )
    })

    return (
      <div className="main-container">
        <h1 className="page_title">List of rims</h1>
        <div className="container searchInput">
          <div className="row">
            <div className="col-sm-3">
              <div className="input-group">
                <div className="input-group-addon"><span>Brand:</span></div>
                <select className="form-control" name="brand" onChange={event => this.inputChange(event)}>
                  <option>All</option>
                  {listOfBrands}
                </select>
              </div>
            </div>

            <div className="col-sm-3">
              <div className="input-group">
                <div className="input-group-addon"><span>Diameter:</span></div>
                <select className="form-control" type="number" name="diameter" onChange={event => this.inputChange(event)}>
                  <option defaultValue="all">All</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>

                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group">
                <div className="input-group-addon"><span>Condition:</span></div>
                <select className="form-control" name="condition" onChange={event => this.inputChange(event)}>
                  <option defaultValue="all">All</option>
                  <option value="used">Used</option>
                  <option value="new">New</option>
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group">
                <input type='number' className='form-control' name="count" placeholder="Count" onChange={event => this.inputChange(event)} />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group">
                <div className="input-group-addon"><span>Lowest Price:</span></div>
                <input type='number' className='form-control' name="priceMin" placeholder="Min $" onChange={event => this.inputChange(event)} />
              </div>
            </div>
            <div className="col-sm-3">
              <div className="input-group">
                <div className="input-group-addon"><span>Highest Price:</span></div>
                <input type='number' className='form-control' name="priceMax" placeholder="Max $" onChange={event => this.inputChange(event)} />
              </div>
            </div>
            <div className="col-sm-3" align='right'>
              <button className="btn btn-primary" onClick={() => this.searchSubmit()}>Apply</button>
            </div>
            < div className = "col-sm-3" >
              <button className="btn btn-danger" onClick={() => this.searchCancel()}>Reset</button>
            </div>
          </div>
        </div>

        <div>
          {listOfRims}
        </div>
        {this.state.rims.length < 1 && this.state.filterResult && <div className="row text-center margin-b-40 emptyRims">
          <div className="col-sm-6 col-sm-offset-3 emptyRims-box">
            <h1>Sorry, we have nothing to sell at the moment</h1>
            <h4>Please, come back later to check new offers!</h4>
          </div>
        </div>
        }
        {!this.state.filterResult && <div className="row text-center margin-b-40 emptyRims">
          <div className="col-sm-6 col-sm-offset-3 emptyRims-box">
            <h1>Sorry, we have nothing according filter settings</h1>
            <h4>Please, come back later to check new offers!</h4>
          </div>
        </div>
        }
      </div>
  );
  }
}