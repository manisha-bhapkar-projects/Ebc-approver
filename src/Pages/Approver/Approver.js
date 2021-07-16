import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserList from "./UserList";
import DevicesList from "./DevicesList";

const Approver = (props) => {
  const [isId, setId] = useState(1);

  const history = useHistory();

  const handleClick = (id) => {
    setId(id);
  };

  return (
    <>
      <ul className="nav-items">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Create</a>
        </li>
        <li>
          <a href="#">Edit</a>
        </li>
        <li>
          <a href="#">Delete</a>
        </li>
      </ul>

      <div className="main-pg-content">
        <div className="custome-button">
          <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn mr-2 ${
              isId === 1 ? "btn-primary" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            Users List
          </button>
          <button
            className={`btn btn-icon-text mb-2 mb-md-0 custom-btn ${
              isId === 2 ? "btn-primary" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            Devices List
          </button>
        </div>

        {isId === 1 ? <UserList /> : <DevicesList />}
      </div>
    </>
  );
};

export default Approver;
