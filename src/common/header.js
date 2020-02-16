import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  addNew: {
    textDecoration: 'none',
    color: 'white'
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const {addNew, label} = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          <Typography variant="h6" className={classes.title}>
              {label}
          </Typography>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
          </Typography>
          {
            addNew && <Button color="inherit">{addNew}</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
