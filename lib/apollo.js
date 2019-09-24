import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = "187a0b5ff8322b9dcbcc508d92cb3ca6bc833316";

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
