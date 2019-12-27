import React from "react";
import { useRouter } from "next/router";

const Post: React.SFC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default Post;
