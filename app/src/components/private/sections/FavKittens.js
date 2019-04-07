import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import requireAuth from '../../shared/RequireAuth';
import PropTypes from 'prop-types';
import CatComponent from '../Kittens/Cats';
import CatCard from '../Kittens/CatCard';
import {fetchFavorites} from '../../../actions'
import Cookies from 'js-cookie';

class GifKittens extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cats: []
    }

  }

  componentDidMount() {
    const user = Cookies.get('user');
    fetchFavorites({user : user})
        .then((response)=> {

          this.setState({cats: response.payload.data})


        })
   }

  renderActivites() {

      return this.state.cats.map(cat => {
        return  <CatCard imageUrl={cat.image_url}  />
     })  

    
  }

  change = event => {
    this.setState({ value:  event.target.value })
  }

  render() {
    return (
      <div>
      <h1>Fav Kittens</h1>

      {this.renderActivites()}      
      </div>
    );
  }
 
}

function mapStateToProps(state) {
  return { cats: state.cats[0] };
}

export default connect(mapStateToProps, actions)(requireAuth(GifKittens))