import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {addToFavorites, checkFavorite} from '../../../actions';
import Cookies from 'js-cookie';

const styles = theme => ({
  card: {
    width:340,
    maxWidth: 340,
    float:'left',
    marginLeft: '10px',
    marginBottom: '10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  content: {
    fontSize: '10px !important'
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: '10',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500]
  },
  iconHover: {
    '&:hover': {
      color: red[800],
    },
  },
});

class CatCard extends React.Component {
  state = { expanded: false, user: Cookies.get('user') };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleFavoriteClick = (e) => {

    const user = this.state.user;

    addToFavorites({user: user, url: this.props.imageUrl})
    .then((response)=> {
      console.log(response);
      ///this.setState({cats: response.payload.data})
    })

  }

  render() {
    const { classes } = this.props;

    console.log(this.props)

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              MT
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={this.props.imageId}
        />
        <CardMedia
          className={classes.media}
          image={decodeURIComponent(this.props.imageUrl)}
        />
        <CardContent >
          <Typography component="p" className={classes.content}>
           Such a cool kittie content..meow meow!! <br/><br/><br/>
           <strong>{this.props.imageUrl}</strong>
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.handleFavoriteClick} className={classes.iconHover}>
            <FavoriteIcon  color="action" />
          </IconButton>
        
        </CardActions>
      </Card>
    );
  }
}

CatCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CatCard);