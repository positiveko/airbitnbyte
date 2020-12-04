import React from 'react';
import Signup from './Signup';
import styled from 'styled-components';
import SignupEmail from './SignupEmail';

const Nav = ({ authService }) => (
  <NavBox>
    <Signup authService={authService} />
  </NavBox>
);

const NavBox = styled.div`
  position: relative;
`;

export default Nav;
