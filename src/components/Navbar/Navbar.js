import React from 'react';
import { Container, FlexWrapper } from '../../styles/GlobalStyled';
import { Wrapper } from './Navbar.styled';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

const Navbar = () => {
  const userStatusValue = useSelector((state) => state.user.userLogged);
  const user = useSelector((state) => state.user.currentUser);

  const usersName =
    user.userName.length > 0 ? user.userName.split('@')[0] : null;

  return (
    <Wrapper>
      <Container>
        <FlexWrapper gap="2rem">
          {userStatusValue ? (
            <>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/dashboard"
              >
                Dashboard
              </NavLink>
              <div style={{ flex: 1 }}>
                <NavLink to="/accounts/new-account">Add new Account</NavLink>
              </div>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/profile"
              >
                {usersName}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/register"
              >
                Register
              </NavLink>
              <NavLink
                className={(navData) => (navData.isActive ? 'active' : '')}
                to="/signup"
              >
                Signup
              </NavLink>
            </>
          )}
        </FlexWrapper>
      </Container>
    </Wrapper>
  );
};

export default Navbar;
