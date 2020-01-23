require("dotenv").config();

const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
  webpack(config) {
    config.resolve.alias["components"] = path.join(__dirname, "components");
    config.resolve.alias["mocks"] = path.join(__dirname, "mocks");
    config.resolve.alias["utils"] = path.join(__dirname, "utils");
    config.resolve.alias["generated"] = path.join(__dirname, "generated");

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, ".env"),
        systemvars: true
      })
    ];

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader"
    });

    return config;
  }
};
