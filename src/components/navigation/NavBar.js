import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect, isLoaded, isEmpty } from "react-redux-firebase";
import { Link } from "react-router-dom";
import * as Icons from "@material-ui/icons";
//import Translate from '../body/Translate'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@material-ui/core";

function NavBar() {
  const authState = useSelector((state) => state.firebase.auth);
  const userDataState = useSelector((state) => state.firebase.profile);
  const fireState = useSelector((state) => state.firestore);
  const [openSlider, setOpenSlider] = useState(false);

  useFirestoreConnect([
    {
      collection: "users",
      doc: userDataState.uid || localStorage.getItem("userId"),
    },
    { collection: "testimonials" },
  ]);

  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    const isSmall = window.matchMedia("screen and (max-width: 960px)");
    window.addEventListener("resize", () => {

      if (isSmall.matches) {
        setSmallScreen(true);
      } else {
        setSmallScreen(false);
      }
    })
  }, []);

  return (
    <>
      <div className="w-100 nav-header ">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center pt-3">
            <div className="logo ">
              <Link to="/">
                <h3 className="sub-heading  little-add ">
                  <span className="u-design">U</span>
                  ltimateCoins
                </h3>
              </Link>
            </div>

            <div
              className="col-lg-8 col text-center mr-lg-0 "
              style={{ marginRight: "4rem" }}
            >
              <div
                className="nav-control  d-lg-none d-sm-block "
                onClick={() => setOpenSlider(true)}
              >
                <div className="hamburger">
                  <span className="line"></span>
                  <span className="line"></span>
                  <span className="line"></span>
                </div>
              </div>
              <div className={`menu d-md-block   d-none`}>
                <div className="d-flex justify-content-around align-items-center ">
                  <li>
                    <Link to="/">Home</Link>
                  </li>

                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/pricing">Plans</Link>
                  </li>
                  <li>
                    <Link to="/teams">Team</Link>
                  </li>
                  <li>
                    <Link to="/contacts">Contact</Link>
                  </li>

                  {!userDataState.verified || !userDataState.uid ? (
                    <li className="signin d-inline-block">
                      <Link to="/login" className="btn history-info">
                        Sign in
                      </Link>
                    </li>
                  ) : (
                    <li className="signin d-inline-block">
                      <Link to="/" className="btn history-info">
                        Sign in
                      </Link>
                    </li>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer open={openSlider} onClose={() => setOpenSlider(false)}>
        <List className="card-bg-new text-light h-100">
          <ListItem button component={Link} to="/" className="side-bar-item">
            <ListItemIcon>
              <Icons.Home className="text-new" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/about"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.AttachMoney className="text-new" />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/pricing"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Money className="text-new" />
            </ListItemIcon>
            <ListItemText>Plans</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/contacts"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.Message className="text-new" />
            </ListItemIcon>
            <ListItemText>Contact</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>

          <ListItem
            button
            component={Link}
            to="/teams"
            className="side-bar-item "
          >
            <ListItemIcon>
              <Icons.PeopleAlt className="text-new" />
            </ListItemIcon>
            <ListItemText>Teams</ListItemText>
            <ListItemIcon className="ml-4">
              <Icons.ArrowRight />
            </ListItemIcon>
          </ListItem>

          <Divider />
          {isLoaded(authState) &&
          !isEmpty(authState) &&
          userDataState?.verified ? (
            <div className="text-center mt-2">
              <ListItem button component={Link} to="/user/dashboard">
                <ListItemText className=" btn btn-primary">
                  DASHBOARD
                </ListItemText>
              </ListItem>
            </div>
          ) : (
            <div className="text-center mt-2">
              <ListItem button component={Link} to="/login" className="btn">
                <ListItemText className=" btn btn-primary ">LOGIN</ListItemText>
              </ListItem>
              <ListItem button component={Link} to="/signup" className="btn">
                <ListItemText className=" btn second-btn text-light">
                  SIGN-UP
                </ListItemText>
              </ListItem>
            </div>
          )}
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
