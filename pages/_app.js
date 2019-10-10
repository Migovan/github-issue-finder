import React from 'react';
import App from 'next/app';
import withData from '../lib/apollo';
import { IssuesDataProvider } from '../components/context/issues-data';
import { GlobalStyle } from '../components/styles/global';
import Meta from '../components/meta';
import Header from '../components/header';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <IssuesDataProvider>
        <Meta />
        <Header />
        <Component {...pageProps} />
        <GlobalStyle />
      </IssuesDataProvider>
    );
  }
}

export default withData(MyApp);
