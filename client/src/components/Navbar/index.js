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
          <NavLink to='/about' activeStyle>
            Quiénes somos
          </NavLink>
          <NavLink to='/crud_users' activeStyle>
            Adm. Usuarios
          </NavLink>
          <NavLink to='/crud_materias' activeStyle>
            Adm. Materias
          </NavLink>
          <NavLink to='/crud_estudios' activeStyle>
            Adm. Plan Estudios
          </NavLink>
          <NavLink to='/logout' activeStyle>
            Cerrar sesión
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
