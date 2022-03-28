import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import User from "./User";
import { userContext } from "../userContext";

const Header = () => {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">MicroShop</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <userContext.Consumer>
              {(user) => <User user={user} />}
            </userContext.Consumer>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};

export default Header;
