import * as React from "react";
import FiltersList from "../FiltersList";
import Products from "../Products";
import "@styles/Homepage.css";

const Admin = () => (
  <div className="homepage-container">
    <div className="filtersList-desktop">
      <FiltersList />
    </div>
    <Products />
  </div>
);

export default Admin;
