import React from 'react';
import App from 'next/app';
import { createGlobalStyle } from 'styled-components';
import withData from '../lib/apollo';
import { IssuesDataProvider } from '../components/context/issues-data';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <IssuesDataProvider>
        <Component {...pageProps} />
        <GlobalStyle />
      </IssuesDataProvider>
    );
  }
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
    background: #5c9f96;
  }
`;

export default withData(MyApp);
