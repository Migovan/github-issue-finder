import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = "c27083cb0a37e49677e3f00b5cdcff985dec242a";

const config = {
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`
    }
  })
};

export default withData(config);
