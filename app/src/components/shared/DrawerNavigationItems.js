import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';


const DrawerNavigationItems =  (props) => {
    return (
        <List>               

            <Link to="/jp">
                <ListItem  button key='pets'>                  
                <ListItemIcon><Icon color="primary">pets</Icon></ListItemIcon>
                <ListItemText className={props.classes.navigation} primary='JPEG|PNG' />
                </ListItem>
            </Link>

            <Link to="/g">
                <ListItem  button key='satisfied'>                  
                <ListItemIcon><Icon color="primary">sentiment_satisfied</Icon></ListItemIcon>
                <ListItemText className={props.classes.navigation} primary='GIF' />
                </ListItem>
            </Link>

            <Link to="/favs">
                <ListItem  button key='favorite'>                  
                <ListItemIcon><Icon color="primary">favorite</Icon></ListItemIcon>
                <ListItemText className={props.classes.navigation} primary='FAVS' />
                </ListItem>
            </Link>

        </List>
        );
}

export default DrawerNavigationItems;
