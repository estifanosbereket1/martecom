import React from "react";
import NavigationItem from "./NavigationItem";

export const NAVIGATION_DEMO_2 = [
  {
    id: 1,
    href: "/",
    name: "Home",
  },
  {
    id: 2,
    href: "/contacts",
    name: "Contact us",
  },
];

function Navigation() {
  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION_DEMO_2.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
