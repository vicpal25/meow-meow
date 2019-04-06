import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';

export default class ListItemLink extends React.Component {

    renderLink = itemProps => <Link to={this.props.to} {...itemProps} />;
  
    render() {
      const { icon, text, to } = this.props;

      return (
          <ListItem component={this.renderLink}>
            <Link to={to}>
                <Icon>{icon}</Icon>x
                <ListItemText className={this.props.classes.navigation} primary={text} />
            </Link>
          </ListItem>
      );
    }
  }