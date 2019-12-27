import React from "react";
import Link from "next/link";
import Head from "next/head";

const Main: React.SFC = () => (
  <div>
    <Head>
      <title>MyApp</title>
    </Head>
    Welcome to boilerplate
    <ul>
      <li>
        <Link href="/post/[pid]" as="/post/1">
          <a>Post 1</a>
        </Link>
      </li>
      <li>
        <Link href="/post/[pid]" as="/post/2">
          <a>Post 2</a>
        </Link>
      </li>
    </ul>
  </div>
);

export default Main;
