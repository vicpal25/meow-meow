import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import requireAuth from '../../shared/RequireAuth';
import PropTypes from 'prop-types';
import CatComponent from '../Kittens/Cats';
import CatCard from '../Kittens/CatCard';
import {fetchImages} from '../../../actions'

class GifKittens extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cats: [],
      PNG: false,
      JPG: false,
      GIF: true
    }

  }

  componentDidMount() {
      fetchImages({PNG : false, JPG: false, GIF: true })
        .then((response)=> {
          this.setState({cats: response.payload.data })
        })
   }

  renderActivites() {

      return this.state.cats.map(cat => {
        return  <CatCard imageUrl={cat.url}  />
     })  
    
  }

  change = event => {
    this.setState({ value:  event.target.value })
  }

  render() {
    return (
      <div>
      <h1>Becaused animated cat GIFs are simply the best!</h1>
      {this.renderActivites()}      
      </div>
    );
  }
 
}

function mapStateToProps(state) {
  return { cats: state.cats[0] };
}

export default connect(mapStateToProps, actions)(requireAuth(GifKittens))