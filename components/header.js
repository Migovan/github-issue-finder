import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Header = () => {
  const [randomColor, setRandomColor] = useState('#793976');

  const changeColor = () => {
    const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setRandomColor(color);
  };

  return (
    <Logo className="random" randomColor={randomColor}>
      <Link href="/">
        <a href="/" onMouseOver={changeColor}>
          Github issues finder
        </a>
      </Link>
    </Logo>
  );
};

const Logo = styled.h1`
  text-align: center;
  margin: 40px 0 30px;
  font-family: 'Londrina Solid', cursive;
  cursor: pointer;
  font-size: 45px;
  color: ${({ randomColor }) => randomColor};

  a {
    padding: 30px;
  }

  @media (max-width: 400px) {
    margin: 30px 0 20px;
    font-size: 35px;
  }
`;

export default React.memo(Header);
