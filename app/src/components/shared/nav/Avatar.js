import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';
import Grid from '@material-ui/core/Grid';

const styles = {
    avatar: {
      margin: 10,
    },
    orangeAvatar: {
      margin: 10,
      color: '#fff',
      backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
      marginLeft:'auto',
      color: '#fff',
      backgroundColor: deepPurple[500],
    },
  };

  
export default class AthleteAvatar extends Component {


  render() {

    const { classes } = this.props;

    return (
        <Avatar className={styles.purpleAvatar}>VP</Avatar>
      )
  }
}
  
