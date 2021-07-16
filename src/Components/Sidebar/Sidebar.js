import React, { useEffect, useState } from "react";
import { sidebar, trade_sidebar } from "../../utils/routes/index";
import { NavLink, Link } from "react-router-dom";
import { getAdminLogin } from "../../utils/storage/index";
import ClickAwayListener from "react-click-away-listener";
const Sidebar = (props) => {
  let from_admin = getAdminLogin();
  const [sidebars, setSidebar] = useState([]);
  const openEBCApp = () => {
    if (
      window.location.origin ==
        "https://ebc-approver-frontend-qa.sysopsnetwork.com" ||
      window.location.origin ==
        "http://ebc-frontend-approvers-qa.s3.amazonaws.com"
    ) {
      window.location.href = "https://ebc-qa.sysopsnetwork.com/trade";
    } else if (window.location.origin == "http://localhost:3001") {
      window.location.href = `http://localhost:3000/trade`;
    } else {
      window.location.href = "https://ebc-dev.sysopsnetwork.com/trade";
    }
  };

  useEffect(() => {
    setSidebar(sidebar);
  }, []);
  const handleOpenSidebar = (title, sub) => {
    console.log("title", title);
    console.log("sub", sub);
    let tempSidebar = [...sidebars];
    console.log(tempSidebar);
    const index = sidebars.findIndex((x) => x.title === title);

    tempSidebar[index].isOpen = true;
    if (sub == "sub") {
      tempSidebar[index].isOpen = false;
    } else {
      tempSidebar = tempSidebar.map((x, i) => {
        console.log("X", x);
        if (i === index) {
          return { ...x, status: true };
        }
        return { ...x, status: false };
      });
    }

    setSidebar(tempSidebar);
  };

  const handleClickAway = (item) => {};
  return (
    <div className="sidebar">
      <div className="sidenav">
        <ul>
          {sidebars.map((item, index) => {
            console.log("item", item);
            return item.sidebar ? (
              <>
                <li className="position-relative">
                  {item.children && item.children.length ? (
                    <Link
                      className={
                        item.path === window.location.pathname ||
                        item.children
                          .map((x) => x.path)
                          .includes(window.location.pathname)
                          ? "active"
                          : ""
                      }
                      onClick={() => handleOpenSidebar(item.title)}
                    >
                      <img src={item.image} />
                      <a>{item.title}</a>
                    </Link>
                  ) : (
                    <Link
                      to={item.path}
                      key={index}
                      className={
                        item.path === window.location.pathname ? "active" : ""
                      }
                      onClick={() => handleOpenSidebar(item.title)}
                    >
                      <img src={item.image} />
                      <a>{item.title}</a>
                    </Link>
                  )}
                </li>
                <ClickAwayListener
                  onClickAway={() => handleClickAway(item.isOpen)}
                >
                  <div
                    className="pointer sub-menu-custom"
                    style={{
                      display: item.isOpen ? "block" : "none",
                      transition: "1s ease-in-out",
                    }}
                  >
                    {item.children
                      ? item.children.map((child, childIndex) => {
                          console.log("item", item);

                          return (
                            <div className="sidebar-sub-menu">
                              <li className="mt-3">
                                <NavLink to={child.path} key={childIndex}>
                                  <a
                                    onClick={() =>
                                      handleOpenSidebar(item.title, "sub")
                                    }
                                  >
                                    {child.title}
                                  </a>
                                </NavLink>
                              </li>
                            </div>
                          );
                        })
                      : ""}
                  </div>
                </ClickAwayListener>
              </>
            ) : null;
          })}
          {from_admin === true
            ? trade_sidebar.map((item, index) => {
                return item.sidebar ? (
                  <li onClick={openEBCApp}>
                    <div key={index} className="EBC_link">
                      <img src={item.image} />
                      <a>{item.title}</a>
                    </div>
                  </li>
                ) : null;
              })
            : ""}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
