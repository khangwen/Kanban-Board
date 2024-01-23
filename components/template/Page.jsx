import React from 'react';
import {
  Outlet,
  useNavigation,
} from "react-router-dom";

import TopNav from '../topNav/TopNav';
import TopNav2 from '../topNav/TopNav2';

export default function Page() {
  const navigation = useNavigation();
  const pageLoading = navigation.state === "loading";

  return (
    <div>
      <TopNav2 />
      <div id="detail" className="container-fluid">
        <div className="row">
          <div className="col">
            {pageLoading ? (
              <center><p>LOADING ....</p></center>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}