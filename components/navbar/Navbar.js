import React from "react";
import menulist from "./menulist";

function Navbar() {
  return (
    <div>
      <ul>
        {menulist.map((item, index) => {
          return <li key={index}>{item.name}</li>;
        })}
      </ul>
    </div>
  );
}

export default Navbar;
