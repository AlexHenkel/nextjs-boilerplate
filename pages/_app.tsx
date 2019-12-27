import App from "next/app";
import React from "react";
import { toast } from "react-toastify";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import GlobalStyle from "components/GlobalStyles";
import withApolloClient, { IApolloProps } from "utils/withApolloClient";
import Provider from "components/Provider";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

class MyApp extends App<IApolloProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
          <GlobalStyle />
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </ApolloHooksProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
