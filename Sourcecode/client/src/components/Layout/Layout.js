import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

// pages
import Home from "../../pages/Home/Home";
import Manufacture from "../../pages/Manufacturer/Manufacture";

// context
import { useLayoutState } from "../../context/LayoutContext";
import configRoutes from "../../pages/routes/configRoutes";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path={configRoutes.home} component={Home} />
            <Route path={configRoutes.manufacture} component={Manufacture} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
