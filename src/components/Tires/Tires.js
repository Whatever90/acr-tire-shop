import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import './Tires.css';
import { Link } from 'react-router-dom';
export default class Tires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tires: [],
      search: false,
      inputSearch: {
        width: null,
        ratio: null,
        brand: null,
        diameter: null,
        priceMin: null,
        priceMax: null,
        count: null,
        condition: null,
        type: null,
      },
      copyTires: [],
      filterResult: true,
      filterShowself: true
    };
  }

  componentWillMount() {
    axios.get('/tires/all')
      .then(res => {
        console.log(res);
        this.setState({ tires: res.data, copyTires: res.data })
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
    var copyTires = this.state.copyTires;
    var tempSearchOptions = [];
    let tempTires = [];
    for (let i = 0; i < this.state.copyTires.length; i++) {
      let bool = true;
      for (let k in this.state.inputSearch) {
        if (!bool) {
          console.log("pizda");
          break;
        }
        if (this.state.inputSearch[k]) {
          if (k === "priceMin") {
            if (this.state.copyTires[i].price < this.state.inputSearch[k]) {
              console.log("too cheap!");
              bool = false;
            }
            continue;
          } else if (k === "priceMax") {
            if (this.state.copyTires[i].price > this.state.inputSearch[k]) {
              console.log("too expensive!");
              bool = false
            }
            continue;
          }
          if (this.state.inputSearch[k] === "" || this.state.inputSearch[k] === "All") {
            continue;
          }
          if (this.state.copyTires[i][k] !== this.state.inputSearch[k]) {
            console.log("nea suka", this.state.copyTires[i][k])
            console.log(typeof (this.state.copyTires[i][k]), typeof (this.state.inputSearch[k]))
            bool = false;
          }
        }
      }
      if (bool) {
        console.log("found!")
        tempTires.push(this.state.copyTires[i]);
      } else {
        bool = true;
      }
    }
    this.setState({
      tires: tempTires
    })

  }
  searchCancel() {
    this.setState({
      tires: this.state.copyTires,
      filterResult: true,
      filterShowself: false
    }, function () {
      this.setState({
        filterShowself: true
      })
    })
    let temp = {
      width: null,
      ratio: null,
      brand: null,
      diameter: null,
      priceMin: null,
      priceMax: null,
      count: null,
      condition: null,
      type: null,
    };
    this.setState({
      inputSearch: temp
    })
  }
  searchFilterByBrand(brand) {
    // if (brand === "All") {
    //   var tempSearch = this.state.inputSearch;
    //   tempSearch.brand = null;
    //   tempSearch.tires = [];
    //   tempSearch.listOfModels = [];
    //   this.setState({
    //     inputChange: tempSearch //ATTENTION! MIGHT BE A MISTAKE!
    //   })
    //   return;
    // }
    // var tires = [];
    // var temp = this.state.inputSearch;
    // temp.brand = brand;
    // this.state.copytires.forEach(function (tire) {
    //   if (tire.brand === brand) {
    //     tires.push(tire)
    //   }
    // })
    // var tempModels = tires.filter(function (item, pos, self) {
    //   return self.indexOf(item) === pos;
    // }).sort().map((c, index) => {
    //   return (
    //     <option key={index}>{c.model}</option>
    //   )
    // })
    // temp.listOfModels = tempModels;
    // this.setState({
    //   inputSearch: temp
    // })
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
    // console.log(this.state);
    // console.log(this.state.inputSearch.yearMax-this.state.inputSearch.yearMin)
  }

  render() {
    var listOftires
    if (this.state.tires.length > 0) {
      listOftires = this.state.tires.map((tire, index) => {
        return (
          <Link to={`/tire/${tire._id}`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="tire">
                  <div className="row">
                    <div className="col-md-12" id="top" >
                      <h1 id="title">{tire.brand} {tire.ratio} {tire.width} {tire.diameter}</h1>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      {tire.photos.length === 0 && <img src={aws} alt="rim" className="photos" />}
                      {tire.photos.length > 0 && <img src={tire.photos[0]} alt="rim" className="photos" />}
                    </div>
                    <div className="col-md-4">
                      <p id="model">Count {tire.count}, Type: {tire.type} , Condition: {tire.condition}</p>
                      <p>{tire.description}</p>
                    </div>
                    <div className="col-md-4">
                      <p id="price">${tire.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })
    } else {
      listOftires = ``
    }
    var listOfBrands = [];
    this.state.copyTires.forEach(function (tire) {
      listOfBrands.push(tire.brand)
    })
    listOfBrands = listOfBrands.filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    }).sort().map((b, index) => {
      return (
        <option key={index}>{b}</option>
      )
    })

    return (
      <div id="body_list_tires">
        <div className="rims-main-container">
          <h1 id="page_title">List of tires</h1>

          <div className="container" id="searchInput">
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
                  <input type='number' className='form-control' name="ratio" placeholder="Ratio" onChange={event => this.inputChange(event)} />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="input-group">
                  <input type='number' className='form-control' name="width" placeholder="Width" onChange={event => this.inputChange(event)} />
                </div>
              </div>
              <div className="col-sm-3">
                <div className="input-group">
                  <div className="input-group-addon"><span>Diameter:</span></div>
                  <select className="form-control" type="number" name="diameter" onChange={event => this.inputChange(event)}>
                    <option selected value="all">All</option>
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
                    <option selected value="all">All</option>
                    <option value="used">Used</option>
                    <option value="new">New</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="input-group">
                  <div className="input-group-addon"><span>Type:</span></div>
                  <select className="form-control" name="type" onChange={event => this.inputChange(event)}>
                    <option selected value="all">All</option>
                    <option value="all season">All season</option>
                    <option value="racing">Racing</option>
                    <option value="winter">Winter</option>
                    <option value="regular">Regular</option>
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

          <div id="main2">
            {listOftires}
          </div>
          {this.state.tires.length < 1 && this.state.filterResult && <div className="row text-center margin-b-40 emptytires">
            <div className="col-sm-6 col-sm-offset-3 emptytires-box">
              <h1>Sorry, we have nothing to sell at the moment</h1>
              <h4>Please, come back later to check new offers!</h4>
            </div>
          </div>
          }
          {!this.state.filterResult && <div className="row text-center margin-b-40 emptytires">
            <div className="col-sm-6 col-sm-offset-3 emptytires-box">
              <h1>Sorry, we have nothing according filter settings</h1>
              <h4>Please, come back later to check new offers!</h4>
            </div>
          </div>
          }
        </div>
      </div>
    );
  }
}