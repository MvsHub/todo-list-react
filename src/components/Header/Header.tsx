import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  background-color:rgb(5, 35, 53);
  color: white;
  justify-content: center;
  padding: 20px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 15px;
`;

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <Nav>
        <Link to="/">Home</Link>
        <Link to="/completed">Tarefas Concluídas</Link>
        <Link to="/pending">Tarefas Pendentes</Link>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
