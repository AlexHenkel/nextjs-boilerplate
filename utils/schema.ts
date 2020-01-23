import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "../schema.graphql";

const schema = makeExecutableSchema({
  typeDefs
});

export default schema;
