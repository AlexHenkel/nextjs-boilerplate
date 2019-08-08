/**
 * If you make any changes, you'll need to fully restart VS code for the config to be applied
 * https://github.com/apollographql/apollo-tooling/issues/669
 */
module.exports = {
  client: {
    service: {
      name: "xxxxxx",
      localSchemaFile: "./schema.graphql"
    },
    includes: [
      "components/**/*.gql",
      "components/**/*.ts",
      "components/**/*.tsx"
    ]
  }
};
