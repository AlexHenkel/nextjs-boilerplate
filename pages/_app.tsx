import App from "next/app";
import React from "react";
import { toast } from "react-toastify";
import GlobalStyle from "components/GlobalStyles";
import Provider from "components/Provider";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <GlobalStyle />
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </>
    );
  }
}

export default MyApp;
