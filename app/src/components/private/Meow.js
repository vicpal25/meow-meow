import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../actions';
import requireAuth from '../shared/RequireAuth';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import PropTypes from 'prop-types';
import CatComponent from './Kittens/Cats';

import CatCard from './Kittens/CatCard';
import {imageBundle} from '../../actions';


class Meow extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cats: [],
      PNG: false,
      JPG: false,
      GIF: false
    }

  }

  componentDidMount() {
    imageBundle()
      .then((response)=> {
        this.setState({cats: response.payload.data })
      })
 }


  checkparams(key) {

    switch (key) {
      case 'jp':
          return {PNG : true, JPG: true, GIF: false }
        break;
      case 'g':
        return {PNG : false, JPG: false, GIF: true }
      break;
      default:
        return {PNG : true, JPG: true, GIF: true }
        break;
    }

  }
 
  renderActivites() {
      return this.state.cats.map(cat => {
        return  <CatCard imageUrl={cat[0].url} imageId={cat[0].id} imageUrl={cat[0].url} />
     })  
  }

  change = event => {
    this.setState({ value:  event.target.value })
  }

  handleImageFilterSelection = event => {

    event.persist();

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({  [name]: value }, () => {
      this.props.fetchImages({PNG : this.state.PNG, JPG: this.state.JPG, GIF: this.state.GIF })
    }

  );

  }

   renderFilterSelector() {

    return(

      <div className="filters">
      <select id="lang" onChange={this.change} value={this.state.value}>
        <option value="select">Select</option>
        <option value="Java">Java</option>
        <option value="C++">C++</option>
      </select>

      <input
        name="PNG"
        type="checkbox"
        checked={this.state.PNG}
        onChange={this.handleImageFilterSelection} />

      <input
        name="JPG"
        type="checkbox"
        checked={this.state.JPG}
        onChange={this.handleImageFilterSelection} />

      <input
        name="GIF"
        type="checkbox"
        checked={this.state.GIF}
        onChange={this.handleImageFilterSelection} />

      </div>

    )

   }
    
  render() {
    return (
      <div>
      <h1>1 Cat from each Mime Type! Meow.</h1>
      {this.renderActivites()}      
      </div>
    );
  }
 
}

function mapStateToProps(state) {
  return { cats: state.cats[0] };
}

export default connect(mapStateToProps, actions)(requireAuth(Meow))