import React, { useState, useEffect } from "react";
import clsx from "clsx";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
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
import Button from "@material-ui/core/Button";
import ApiComms from "../Utils/ApiComms";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import PersonIcon from "@material-ui/icons/Person";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";
import EditIcon from "@material-ui/icons/Edit";
import EventIcon from "@material-ui/icons/Event";
import BlockIcon from "@material-ui/icons/Block";
import MemoryIcon from "@material-ui/icons/Memory";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LinkIcon from "@material-ui/icons/Link";

import {
  Switch,
  Route,
  useRouteMatch,
  Link,
  useLocation,
} from "react-router-dom";

import UserList from "./UserList";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import ActivateUser from "./ActivateUser";
import ChangePassword from "./ChangePassword";
import StoreList from "./StoreList";
import EditStore from "./EditStore";
import SetExpiryDate from "./SetExpiryDate";
import AllocateMemory from "./AllocateMemory";
import ResultPage from "./ResultPage";
import { useHistory } from "react-router-dom";
import LinkStoreToUser from "./LinkStoreToUser";
import LooseLink from "./LooseLink";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "lightblue",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const listItemList = [
  { key: "home", value: "Home" },
  { key: "userlist", value: "User List" },
  { key: "adduser", value: "Add User" },
  { key: "edituser", value: "Edit User" },
  { key: "changepassword", value: "Change Password" },
  { key: "activateuser", value: "Activate User" },
  { key: "storelist", value: "Store List" },
  { key: "editstore", value: "Edit Store" },
  { key: "setexpirydate", value: "Set Expiry Date" },
  { key: "allocatememory", value: "Allocate Memory" },
  { key: "linkstoretouser", value: "Link Store to User" },
  { key: "looselink", value: "Loose Link" },
];

export default function Home(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(props.message);
  let { path, url } = useRouteMatch();
  let history = useHistory();

  // let location = React.useLocation();
  let location = useLocation();
  const handleDrawerOpen = () => {
    setOpen(true);
    console.log(path);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function LayTileText() {
    let retVal = "";
    try {
      retVal = listItemList.find(
        (element) => element.key === location.pathname.split("/").reverse()[0]
      ).value;
    } catch (e) {
      retVal = "";
    }
    return retVal;
  }

  async function btnLogout_Click() {
    //   console.log(props.user);
    let res = await ApiComms.LogoutUser(props.user ? props.user.id : 0);
    //   console.log(res);
    if (res !== null && res.resultcode === 0) {
      console.log("logout success!");
      props.RaiseUserLoginEvent();
      history.push("/");
    }
  }

  useEffect(() => {
    if (typeof location.message !== "undefined") {
      setMessage(location.message);
      console.log(location.message);
    } else {
      //     setMessage("");
    }
  });

  useEffect(() => {
    setTitle(LayTileText());
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            align="left"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>
          <Typography
            variant="h8"
            align="right"
            noWrap
            className={classes.title}
          >
            (Hi {props.user ? props.user.fname : ""})
          </Typography>

          <Button color="inherit" onClick={btnLogout_Click}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Typography variant="h6" color="secondary">
            EC Touch Admin
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        {/* <Typography align="left">sfgsdfgs</Typography> */}

        <Divider />
        <List>
          <ListItem
            button
            key={listItemList[1].key}
            component={Link}
            to={`${url}/userlist`}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[1].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[2].key}
            component={Link}
            to={`${url}/adduser`}
          >
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[2].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[3].key}
            component={Link}
            to={`${url}/edituser`}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[3].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[4].key}
            component={Link}
            to={`${url}/changepassword`}
          >
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[4].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[5].key}
            component={Link}
            to={`${url}/activateuser`}
          >
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[5].value} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key={listItemList[6].key}
            component={Link}
            to={`${url}/storelist`}
          >
            <ListItemIcon>
              <StoreIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[6].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[7].key}
            component={Link}
            to={`${url}/editstore`}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[7].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[8].key}
            component={Link}
            to={`${url}/setexpirydate`}
          >
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[8].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[9].key}
            component={Link}
            to={`${url}/allocatememory`}
          >
            <ListItemIcon>
              <MemoryIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[9].value} />
          </ListItem>

          <Divider />

          <ListItem
            button
            key={listItemList[10].key}
            component={Link}
            to={`${url}/linkstoretouser`}
          >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[10].value} />
          </ListItem>

          <ListItem
            button
            key={listItemList[11].key}
            component={Link}
            to={`${url}/looselink`}
          >
            <ListItemIcon>
              <LinkIcon />
            </ListItemIcon>
            <ListItemText primary={listItemList[11].value} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path={path}>
            <ResultPage message={message} />
          </Route>
          <Route path={`${path}/userlist`}>
            <UserList />
          </Route>
          <Route path={`${path}/adduser`}>
            <AddUser />
          </Route>
          <Route path={`${path}/edituser`}>
            <EditUser />
          </Route>
          <Route path={`${path}/changepassword`}>
            <ChangePassword />
          </Route>
          <Route path={`${path}/activateuser`}>
            <ActivateUser />
          </Route>

          <Route path={`${path}/storelist`}>
            <StoreList />
          </Route>
          <Route path={`${path}/editstore`}>
            <EditStore />
          </Route>
          <Route path={`${path}/setexpirydate`}>
            <SetExpiryDate />
          </Route>
          <Route path={`${path}/allocatememory`}>
            <AllocateMemory />
          </Route>
          <Route path={`${path}/linkstoretouser`}>
            <LinkStoreToUser />
          </Route>
          <Route path={`${path}/looselink`}>
            <LooseLink />
          </Route>
        </Switch>
      </main>
    </div>
  );
}
