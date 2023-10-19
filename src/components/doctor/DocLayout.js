import React from "react";

import { SideNavBarDoctor } from "./SideNavBarDoctor";

const DocLayout = ({ children }) => {
  return (
    <div className="flex m-12">
      <SideNavBarDoctor />
      <div>{children}</div>
    </div>
  );
};

export default DocLayout;
