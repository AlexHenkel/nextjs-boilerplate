import React from "react";
import ReactLoading from "react-loading";
import { createGlobalStyle } from "styled-components";

import colors from "utils/style/colors";
import styled from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 3;
  display: flex;
  justify-content: center;
  padding-top: 30vh;
  background-color: rgba(255, 255, 255, 0.75);
  overflow: hidden;
`;

const FullLoader = () => (
  <Container>
    <GlobalStyle />
    <ReactLoading
      type="bubbles"
      color={colors.accent}
      height={"20%"}
      width={"20%"}
    />
  </Container>
);

export default FullLoader;
