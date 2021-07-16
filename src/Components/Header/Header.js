import React, { useEffect } from 'react';
import { getAccountData } from "../../utils/storage/index";
import constants from "../../utils/constants";
import { useHistory } from "react-router-dom";

const Header = () => {
    var accountData = getAccountData();
    const history = useHistory();

    useEffect(()=>{
        console.log("accountData in header.js", accountData);

    },[])
    const handleLogOut = () =>{
        localStorage.clear();
        history.push(constants.ROUTE.LOGIN.LOGIN);
    }
    return (
        <div className="main-header">
            <div className="main-logo">
                <img src="assets/images/LOGO-Energy-BC-Transpernt-White.png"
                    alt="logo" className="logo-img" />
            </div>
            <div className="profile">

            <div className="bg-transperant mr-3 environment-name">
          {window.location.origin == "https://ebc-approver-frontend-qa.sysopsnetwork.com" 
          ? (
            <span>QA Env</span>
          ) : window.location.origin == "https://ebc-approver-frontend-dev.sysopsnetwork.com"
          ? (
            <span>Dev Env</span>
          ) : (
            <span>Localhost Env</span>
          )}
        </div>

        <div className="profile-person d-flex">
                <span className="profile-logo">
                    <img src="assets/images/download.jpeg"
                        alt="logo" className="profile-image" />
                    <span className="profile-name">
                    {accountData ? accountData.approverName : ""}&nbsp;
                    </span>
                </span>
                <span className="bell-icon" onClick={handleLogOut}> 
                    <i className="fas fa-bell" />
                </span>
        </div>

            </div>
        </div>

    );
};


export default Header;