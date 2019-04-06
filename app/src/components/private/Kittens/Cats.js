import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: '100%',
    marginBottom: '30px',
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding:'20px 0'
  },
  inline: {
    display: 'inline',
  },
  card: {
      marginBottom: '30px'
  }
});

class CatsComponent extends Component {
  render() {
    const { classes } = this.props;

    return (
        <Card className={classes.card}>
        <CardHeader
          title="JPGs + PNGS"
        />
        <CardContent>

          <List className={classes.root}>
          <Divider/>
            <ListItem alignItems="flex-start" className={classes.item}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" />
              </ListItemAvatar>
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography component="span" className={classes.inline} color="textPrimary">
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider/>
         
          </List>
            </CardContent>
          </Card>
    )
  }
}


export default withStyles(styles)(CatsComponent);
