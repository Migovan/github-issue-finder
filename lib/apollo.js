import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = "0c2533cfd9166fe9bb4ae2d26b52edb7736f8159";

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
