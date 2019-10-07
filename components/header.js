import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Header = () => (
  <Logo>
    <Link href="/">
      <a href="/">Github issues finder</a>
    </Link>
  </Logo>
);

const Logo = styled.h1`
  text-align: center;
  margin: 40px 0 30px;
  font-family: 'Londrina Solid', cursive;
  cursor: pointer;
  font-size: 45px;
  color: #793976;

  @media (max-width: 400px) {
    margin: 30px 0 20px;
    font-size: 35px;
  }
`;

export default Header;
