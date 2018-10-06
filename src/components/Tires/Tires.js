import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import './Tires.css';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
export default class Tires extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tires : [],
      search: false,
      inputSearch: {
        brand: null,
        model: null,
        yearMin: 0,
        yearMax: Number.MAX_VALUE,
        priceMin: 0,
        priceMax: Number.MAX_VALUE,
        listOfModels: []
      },
      copytires: [],
      filterResult: true,
      filterShowself: true
    };
  }
  
  componentWillMount(){
    axios.get('/tires/all')
      .then(res => {
        console.log(res);
        this.setState({ tires: res.data, copytires: res.data })
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
    var copytires = this.state.copytires;
    var resulttires = [];
    var searchOptions = this.state.inputSearch;
    copytires.forEach(function(tire){
      if(searchOptions.brand !== null){
        if(tire.brand === searchOptions.brand){
          if(searchOptions.model !== null){
            if(tire.model === searchOptions.model){
              if(tire.year>=searchOptions.yearMin && tire.year<=searchOptions.yearMax && tire.price>=searchOptions.priceMin && tire.price<=searchOptions.priceMax){
                resulttires.push(tire)
              }
            }
          }else if(tire.year>=searchOptions.yearMin && tire.year<=searchOptions.yearMax && tire.price>=searchOptions.priceMin && tire.price<=searchOptions.priceMax){
            resulttires.push(tire);
          }
        }
      }else{
        if(tire.year>=searchOptions.yearMin && tire.year<=searchOptions.yearMax && tire.price>=searchOptions.priceMin && tire.price<=searchOptions.priceMax){
          resulttires.push(tire);
        }
      }
    })
    var result_bool;
    if(resulttires.length<1){
      result_bool = false;
    }else{
      result_bool = true;
    }
    this.setState({
      tires: resulttires,
      filterResult: result_bool
    })

  }
  searchCancel(){
    this.setState({
      tires: this.state.copytires,
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
      tempSearch.tires = [];
      tempSearch.listOfModels = [];
      this.setState({
        inputChange: tempSearch //ATTENTION! MIGHT BE A MISTAKE!
      })
      return;
    }
    var tires = [];
    var temp = this.state.inputSearch;
    temp.brand = brand;
    this.state.copytires.forEach(function(tire){
      if(tire.brand===brand){
        tires.push(tire)
      }
    })
    var tempModels = tires.filter(function (item, pos, self) {
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
    // console.log(this.state);
    // console.log(this.state.inputSearch.yearMax-this.state.inputSearch.yearMin)
  }

  render() {
    var listOftires
    if(this.state.tires.length>0){
      listOftires = this.state.tires.map((tire, index) => {
        return (
          <Link to={`/tire/${ tire._id }`} key={index}>
             <div>
              <div id="box" key={index}>
                <div className="container" id="tire">
                  <div className="row">
                      <div className="col-md-12" id="top" >
                          <h1 id="title">{ tire.year } { tire.brand } { tire.model } </h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                      {/* 
                        not sure which css is right. have to check
                        {tire.photos.length === 0 && <img src={aws} alt="tire" id="tire-photo"/>} 
                        {tire.photos.length>0 && <img src={tire.photos[0]} alt="tire" id="tire-photo"/>}
                      */}
                        {tire.photos.length === 0 && <img src={aws} alt="part" className="photos"/>} 
                        {tire.photos.length>0 && <img src={tire.photos[0]} alt="part" className="photos"/>}
                      </div>
                      <div className="col-md-4">
                          <p id="model">{ tire.mileage } miles, Color: { tire.color }</p>
                      </div>
                      <div className="col-md-4">
                          <p id="price">${ tire.price }</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })
    }else{
      listOftires = ``
    }
    var listOfBrands = [];
    this.state.copytires.forEach(function(tire){
      listOfBrands.push(tire.brand)
    })
    listOfBrands = listOfBrands.filter(function(item, pos, self) {
        return self.indexOf(item) === pos;
      }).sort().map((b, index) => {
        return (
          <option key={index}>{b}</option>
        )
    })
    
    

    return (
      <div id="body_list_tires">
        < Navbar />
        <div className="parts-main-container">
          <h1 id="page_title">List of tires</h1>
          <div className="container">
            <div id="searchBox" className="col-sm-3">
              <label className="switch">
                <input type="checkbox" onClick={() => this.searchClicked()} />
                <span className="slider"></span>
              </label>
              <h3 className="switch">Filter</h3>
            </div>
            {this.state.search && <div className="col-sm-3 searchBoxButtons">
              <button className="btn btn-primary" onClick={() => this.searchSubmit()}>Search</button>
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