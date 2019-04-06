import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({

    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
      },
  });

class MainContent extends Component {
  render() {
    const { classes, theme } = this.props;

    return (
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Typography paragraph>
           {this.props.children}
          </Typography>

        </main>


        )
  }
}

export default withStyles(styles, { withTheme: true })(MainContent);
  