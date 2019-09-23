import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = "0ff6cb220075ce0e8686784c55e4b182460bda4c";

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
