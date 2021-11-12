import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to='/about'>
            Quiénes somos
          </NavLink>
          <NavLink to='/crud_planes'>
            Adm. Plan Estudios
          </NavLink>
          <NavLink to='/crud_actas'>
            Adm. Actas
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/profile'>Perfil</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;
