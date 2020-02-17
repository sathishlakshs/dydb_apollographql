import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./home";
import Empform from "./empform";
import Empdetails from "./empdetails";
import { useQuery } from "react-apollo";
import { GET_EMPLOYEES } from "../graphql/queries";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FaceIcon from "@material-ui/icons/Face";
import SearchField from "../common/searchField";
import NotFound from './pageNotFound';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function Layout(props) {
  const classes = useStyles();
  const theme = useTheme();
  let sideMenus = [];
  const { data, loading, error } = useQuery(GET_EMPLOYEES);
  if (data) {
    sideMenus = data.listEmployees.items;
  }
  const [state, setState] = React.useState({
    isDrawer: false,
    searchValue: "",
    isSearchReq: false
  });

  const handleDrawerOpen = () => {
    setState({ ...state, isDrawer: true });
  };

  const handleDrawerClose = () => {
    setState({ ...state, isDrawer: false });
  };

  const searchHandler = value => {
    setState({ ...state, searchValue: value });
  };

  const searchReq = bool => {
    setState({ ...state, isSearchReq: bool });
  };

  return (
    <Router>
      <Switch>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: state.isDrawer
            })}
          >
            <div className="relative">
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(
                    classes.menuButton,
                    state.isDrawer && classes.hide
                  )}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                  Employee
                </Typography>
              </Toolbar>
              { state.isSearchReq &&
                <div className="searchField">
                  <SearchField searchHandler={searchHandler} searchValue= {state.searchValue}/>
                </div>
              }
            </div>
          </AppBar>
          <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={state.isDrawer}
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.drawerHeader}>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <ChevronLeftIcon />
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </div>
            <List>
              {sideMenus.map((emp, index) => (
                <Link to={`/employee/${emp.id}`}>
                  <ListItem button key={emp.firstName + emp.lastName}>
                    <ListItemIcon>
                      {index % 2 === 0 ? <AccountCircleIcon /> : <FaceIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={emp.firstName + " " + emp.lastName}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Drawer>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: state.isDrawer
            })}
          >
            <div className={classes.drawerHeader} />
            <Route
              path="/form/:empId"
              render={props => <Empform {...props} searchReq={searchReq} />}
            ></Route>
            <Route
              path="/employee/:empId"
              render={props => <Empdetails {...props} searchReq={searchReq} />}
            ></Route>
            <Route exact  path="/">
              <Home client={props.client} searchReq={searchReq} searchValue={state.searchValue}/>
            </Route>
          </main>
        </div>
      </Switch>
    </Router>
  );
}
