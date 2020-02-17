import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 300,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchField(props) {
  const classes = useStyles();
  const {searchHandler} = props;
  const handleChange = (e) => {
    searchHandler(e.target.value);
  }

  const startSearch = (e) => {
      if (e.keyCode === 13) {
          console.log(e.keyCode);
      }
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search firstname, lastname, skills"
        inputProps={{ 'aria-label': 'search google maps' }}
        onChange = { (e) => handleChange(e)}
        onKeyDown = {(e) => startSearch(e)}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      </Paper>
  );
}
