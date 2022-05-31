import React from "react";
import { Container } from "../../styles/GlobalStyled";
import { Wrapper } from "./Navbar.styled";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <NavLink to="/register">Register</NavLink>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
