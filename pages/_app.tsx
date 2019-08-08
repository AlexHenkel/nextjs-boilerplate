import App, { Container } from "next/app";
import React from "react";
import { toast } from "react-toastify";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import GlobalStyle from "components/GlobalStyles";
import withApolloClient, { IApolloProps } from "utils/withApolloClient";
import Provider from "components/Provider";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-toastify/dist/ReactToastify.min.css";

toast.configure();

class MyApp extends App<IApolloProps> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ApolloHooksProvider client={apolloClient}>
            <GlobalStyle />
            <Provider>
              <Component {...pageProps} />
            </Provider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
