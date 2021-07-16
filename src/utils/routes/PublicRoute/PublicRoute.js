import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../../utils";
import { storeAuthToken, storeAccountData, storeAdminLogin } from "../../storage/index";

const PublicRoute = ({ location, component: Component, ...rest }) => {
  const approverRoute = () => {
    if (location && location.search) {
      var decyptStr = atob(location.search.replace("?data=", ""));
      storeAuthToken(JSON.parse(decyptStr).approver_token);
      let data = JSON.parse(decyptStr).approverAccountData;
      var accountObject = {
        approverEmail: data.approverEmail,
        accountID: data._id,
        approverLevel: "admin",
        isAdmin: data.isAdmin,
        approverName: data.approverName,
      };
      storeAccountData(accountObject);
      storeAdminLogin(true);
      return true;
    } else {
      console.log("No Data", "Go to login");
      localStorage.clear();
      return false;
     
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin() && approverRoute() ? (
          <Redirect to="/approver" />
        ) :
         isLogin() || approverRoute() ? (
          <Redirect to="/approver" />
        ) 
        : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
