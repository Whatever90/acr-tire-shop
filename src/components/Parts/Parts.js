import React, { Component } from 'react';
import axios from 'axios';
import aws from '../images/aws.png';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import './Parts.css';

export default class Parts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parts : [],
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
      copyParts: [],
      filterResult: true,
      filterShowself: true
    };
  }

  componentWillMount(){
    axios.get('/parts/all')
      .then(res => {
        console.log(res);
        this.setState({ parts: res.data, copyParts: res.data })
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
    var copyParts = this.state.copyParts;
    var resultParts = [];
    var searchOptions = this.state.inputSearch;
    copyParts.forEach(function(part){
      console.log(part._id);
      if(searchOptions.brand !== null){
        if(part.brand === searchOptions.brand){
          if(searchOptions.model !== null){
            if(part.model === searchOptions.model){
              if(part.year>=searchOptions.yearMin && part.year<=searchOptions.yearMax && part.price>=searchOptions.priceMin && part.price<=searchOptions.priceMax){
                resultParts.push(part)
              }
            }
          }else if(part.year>=searchOptions.yearMin && part.year<=searchOptions.yearMax && part.price>=searchOptions.priceMin && part.price<=searchOptions.priceMax){
            resultParts.push(part);
          }
        }
      }else{
        if(part.year>=searchOptions.yearMin && part.year<=searchOptions.yearMax && part.price>=searchOptions.priceMin && part.price<=searchOptions.priceMax){
          resultParts.push(part);
        }
      }
    })
    if(resultParts.length<1){
      this.setState({
        filterResult: false
      })
    }else{
      this.setState({
        filterResult: true
      })
    }
    this.setState({
      parts: resultParts
    })

  }
  searchCancel(){
    this.setState({
      parts: this.state.copyParts,
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
    var parts = [];
    var temp = this.state.inputSearch;
    temp.brand = brand;
    this.state.copyParts.forEach(function(part){
      if(part.brand===brand){
        parts.push(part)
      }
    })
    var tempModels = parts.filter(function (item, pos, self) {
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
    let listOfParts = null;
    if(this.state.parts.length>0){
      listOfParts = this.state.parts.map((part, index) => {
        return (
          <Link to={`/part/${ part._id }`} key={index}>
            <div>
              <div id="box" key={index}>
                <div className="container" id="part">
                  <div className="row">
                      <div className="col-md-12" id="top" >
                          <h1 id="title">{ part.title }</h1>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-md-4">
                        {part.photos.length === 0 && <img src={aws} alt="part" id="photo" className="photos" />}
                        {part.photos.length > 0 && <img src={part.photos[0]} alt="part" id="photo" className="photos" />}
                      </div>
                      <div className="col-md-4">
                          <p id="model">{ part.year } { part.brand } { part.model }</p>
                          <p id="condition">Condition: { part.condition} </p>
                      </div>
                      <div className="col-md-4">
                          <p id="price">${ part.price }</p>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )})
      } else {
        listOfParts = '';
      }
    var listOfBrands = [];
    this.state.copyParts.forEach(function (part) {
      listOfBrands.push(part.brand)
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
      <div className="parts-main-container" id="main">
        <h1 id="list_name">List of parts</h1>
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
        { listOfParts }
        </div>
        {this.state.parts.length < 1 && this.state.filterResult && <div className="row text-center margin-b-40 emptyParts">
               <div className="col-sm-6 col-sm-offset-3 emptyParts-box">
                  <h1>Sorry, we have nothing to sell at the moment</h1>
                  <h4>Please, come back later to check new offers!</h4>
                </div>
              </div>
                }
        {!this.state.filterResult && <div className="row text-center margin-b-40 emptyParts">
               <div className="col-sm-6 col-sm-offset-3 emptyParts-box">
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