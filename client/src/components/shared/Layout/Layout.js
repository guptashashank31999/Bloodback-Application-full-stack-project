import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <>
      <div className="header">
        <Header />
      </div>

      <div className="row g-0">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-9">{props.children}</div>
      </div>
    </>
  );
};

export default Layout;
