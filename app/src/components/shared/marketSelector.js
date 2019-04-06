import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions';


class MarketSelector extends Component {

  constructor(props) {
    super(props);
    this.props.fetchMarkets();
    this.state = {
        bothOn: false
      }

    }

    renderActivites() {

      if(this.props.markets && Object.values(this.props.markets)) {

          console.log('markets brugh')

          return this.props.markets.map(mkt => {
              return  {mkt}
          });
  
          // return this.props.markets.map(market => {

          //   console.log(market);
          // })  
  
      }
    }
  
  render() {

    console.log(this.props)
    return (
      <div>
      {this.renderActivites()}
      </div>
    )
  }
}



function mapStateToProps(state) {
    return { markets: state.campaign[0] };
  }

  export default connect(mapStateToProps, actions)(MarketSelector)


  