import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import PublicRoute from "./utils/routes/PublicRoute/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute/PrivateRoute";
import constants from "./utils/constants";
import Login from "./Pages/Login/Login";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import Registration from "./Pages/Login/Registration";
import Layout from "./Components/Layout/Layout";
import { sidebar, trade_sidebar } from "./utils/routes";
import UserList from "./Pages/Approver/UserList";
import DevicesList from "./Pages/Approver/DevicesList";
import { useEffect } from "react";

import {
  getAccountData,
  storeAuthToken,
  storeAccountData,
  getAdminLogin,
} from "./utils/storage/index";

function App(props) {
  let from_admin = getAdminLogin();
  //  useEffect(()=>{
  //    console.log("props.location in app.js",props.location && props.location.search);
  //  },[])

  return (
    <div className="main-wrapper">
      <NotificationContainer />
      <Router>
        <Switch>
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.LOGIN}
            component={Login}
          />
          <PublicRoute
            exact
            path={constants.ROUTE.LOGIN.REGISTRATION}
            component={Registration}
          />
          <Switch>
            <Layout>
              <Switch>
                {sidebar.map((item, index) => {
                  console.log("sidebar item", item);
                  let arr = [];
                  item.path &&
                    arr.push(
                      <PrivateRoute
                        key={index}
                        path={item.path}
                        exact
                        component={item.component}
                      />
                    );

                  if (item.children) {
                    arr.push(
                      item.children.map((itemchid, index) => {
                        console.log("itemchid", itemchid);
                        return (
                          <PrivateRoute
                            key={`child-${index}`}
                            path={itemchid.path}
                            exact
                            component={itemchid.component}
                          />
                        );
                      })
                    );
                  }

                  return arr;
                })}

                <PrivateRoute
                  exact
                  path={constants.ROUTE.APPROVER.USERS_LIST}
                  component={UserList}
                />
                <PrivateRoute
                  exact
                  path={constants.ROUTE.APPROVER.DEVICE_LIST}
                  component={DevicesList}
                />
                {from_admin === true
                  ? trade_sidebar.map((item, index) => {
                      return <PrivateRoute key={index} />;
                    })
                  : ""}

                {/* 
                {trade_sidebar.map((item, index) => {
                  return <PrivateRoute key={index} />;
                })} */}
                <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
              </Switch>
            </Layout>
            <Redirect to={constants.ROUTE.LOGIN.LOGIN} />
          </Switch>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
