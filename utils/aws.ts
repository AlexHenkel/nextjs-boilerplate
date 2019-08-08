import Amplify from "aws-amplify";
import Storage from "./storage";

// TODO: Update to bucket link
const bucketURL = `https://XXXXXXXXX.s3.amazonaws.com/`;

Amplify.configure({
  Auth: {
    identityPoolId: "XXXXXXX", // REQUIRED - Amazon Cognito Identity Pool ID
    region: "XXXXXX" // REQUIRED - Amazon Cognito Region
  },
  Storage: {
    bucket: "XXXXXX", // REQUIRED -  Amazon S3 bucket
    region: "XXXXXX" // OPTIONAL -  Amazon service region
  }
});

const customPrefix = {
  public: ""
};

export const uploadImage = (file: File) => {
  const { name, type } = file;
  return Storage.put(name, file, {
    contentType: type,
    customPrefix,
    acl: "public-read"
  });
};
