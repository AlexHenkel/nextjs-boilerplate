import React from "react";
import Head from "next/head";
import Chrome from "components/Chrome";
import MainComponent from "components/pages/Index";

const Main: React.SFC = () => (
  <Chrome>
    <Head>
      <title>JullsColors</title>
    </Head>
    <MainComponent />
  </Chrome>
);

export default Main;
