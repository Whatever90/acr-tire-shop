import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Rims.css';

export default class Rims extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rims : [],
      search: false,
      inputSearch: {
        title: "",
        brand: null,
        model: null,
        yearMin: 0,
        yearMax: Number.MAX_VALUE,
        priceMin: 0,
        priceMax: Number.MAX_VALUE,
        listOfModels: []
      },
      copyRims: [],
      filterResult: true,
      filterShowself: true
    };
  }

  componentWillMount(){
    axios.get('/rims/all')
      .then(res => {
        console.log(res);
        this.setState({ rims: res.data, copyRims: res.data })
      })
      .catch(error => console.log(error));
  }

  searchClicked(){
    let status = this.state.search;
    this.setState({
      search: !status
    })
  }
  inputChange(target, event){
    event.preventDefault();
    console.log(event.target.value);
  }
  searchSubmit(){
    var copyRims = this.state.copyRims;
    var resultRims = [];
    var searchOptions = this.state.inputSearch;
    copyRims.forEach(function(rim){
      console.log(rim._id);
      if(searchOptions.brand !== null){
        if(rim.brand === searchOptions.brand){
          if(searchOptions.model !== null){
            if(rim.model === searchOptions.model){
              if(rim.year>=searchOptions.yearMin && rim.year<=searchOptions.yearMax && rim.price>=searchOptions.priceMin && rim.price<=searchOptions.priceMax){
                resultRims.push(rim)
              }
            }
          }else if(rim.year>=searchOptions.yearMin && rim.year<=searchOptions.yearMax && rim.price>=searchOptions.priceMin && rim.price<=searchOptions.priceMax){
            resultRims.push(rim);
          }
        }
      }else{
        if(rim.year>=searchOptions.yearMin && rim.year<=searchOptions.yearMax && rim.price>=searchOptions.priceMin && rim.price<=searchOptions.priceMax){
          resultRims.push(rim);
        }
      }
    })
    if(resultRims.length<1){
      this.setState({
        filterResult: false
      })
    }else{
      this.setState({
        filterResult: true
      })
    }
    this.setState({
      rims: resultRims
    })

  }
  searchCancel(){
    this.setState({
      rims: this.state.copyRims,
      filterResult: true,
      filterShowself: false
    }, function(){
      this.setState({
        filterShowself: true
      })
    })
  }
  searchFilterByBrand(brand){
    if(brand==="All"){
      var tempSearch = this.state.inputSearch;
      tempSearch.brand = null;
      tempSearch.title = "";
      tempSearch.listOfModels = [];
      this.setState({
        inputSearch: tempSearch   
      })
      return;
    }
    var rims = [];
    var temp = this.state.inputSearch;
    temp.brand = brand;
    this.state.copyRims.forEach(function(rim){
      if(rim.brand===brand){
        rims.push(rim)
      }
    })
    var tempModels = rims.filter(function (item, pos, self) {
      return self.indexOf(item) === pos;
    }).sort().map((c, index) => {
      return (
        <option key={index}>{c.model}</option>
      )
    })
    temp.listOfModels = tempModels;
    this.setState({
      inputSearch: temp
    })
  }

  changeState(x,y,val){
    var temp = this.state[x];
    if(y){
      temp[y] = val;
    }else{
      temp = val;
    }
    this.setState({
      x: temp
    })
    console.log(this.state);
    console.log(this.state.inputSearch.yearMax-this.state.inputSearch.yearMin)
  }



  render() {
    let listOfRims = null;
    if(this.state.rims.length>0){
      listOfRims = this.state.rims.map((rim, index) => {
        return (
          <Link to={`/rim/${ rim._id }`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="rim">
                  <div className="row">
                      <div className="col-md-12" id="top" >
                          <h1 id="title">{ rim.brand } { rim.diameter } { rim.ratio } { rim.width}</h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                        {rim.photos.length === 0 && <img src={aws} alt="rim" id="photo" className="photos" />}
                        {rim.photos.length > 0 && <img src={rim.photos[0]} alt="rim" id="photo" className="photos" />}
                      </div>
                      <div className="col-md-4">
                          <p id="model">Count: { rim.count },  { rim.description }</p>
                          <p id="condition">Condition: { rim.condition} </p>
                      </div>
                      <div className="col-md-4">
                          <p id="price">${ rim.price }</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )})
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
      <div>
      < Navbar />
      <div className="rims-main-container" id="main">
        <h1 id="list_name">List of rims</h1>
        <div className="container">
            <div id="searchBox" className="col-sm-3">
              <label className="switch">
                <input type="checkbox" onClick={() => this.searchClicked()} />
                <span className="slider"></span>
              </label>
              <h3 className="switch">Filter</h3>
            </div>
            {this.state.search && <div className="col-sm-3 searchBoxButtons">
              <button className="btn btn-primary" onClick={() => this.searchSubmit()}>Apply</button>
              <button className="btn btn-danger" onClick={() => this.searchCancel()}>Reset</button>
              </div>
              }
              </div>
              {this.state.search && this.state.filterShowself && <div className="container" id="searchInput">
              <div className="row">
                <div className="col-sm-6">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Brand:</span></div>
                    <select className="form-control" onChange={event => this.searchFilterByBrand(event.target.value)}>
                      <option>All</option>
                      {listOfBrands}
                    </select>
                  </div>
                </div>
              
                <div className="col-sm-6">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model:</span></div>
                    <select className="form-control" disabled={this.state.inputSearch.listOfModels.length===0}>
                      <option value="all">All</option>
                        {this.state.inputSearch.listOfModels}
                    </select>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Model Year:</span></div>
                    <input type='number' className='form-control' placeholder="Min year"
                      min={this.state.inputSearch.yearMin} max={this.state.inputSearch.yearMax}
                      onChange={event => this.changeState("inputSearch", 'yearMin', Number(event.target.value))} />
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <input type='number'  className='form-control' placeholder="Max year" onChange={event => this.changeState("inputSearch", 'yearMax', Number(event.target.value))}/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Lowest Price:</span></div>
                    <input type='number'  className='form-control' placeholder="Min $" onChange={event => this.changeState("inputSearch", 'priceMin', Number(event.target.value))}/>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="input-group">
                    <div className="input-group-addon"><span>Highest Price:</span></div>
                    <input type='number' className='form-control' placeholder="Max $" onChange={event => this.changeState("inputSearch", 'priceMax', Number(event.target.value))}/>
                  </div>
                </div>
              </div>
            </div>
        }
        <div id="main2">
        { listOfRims }
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
      </div>
    );
  }
}