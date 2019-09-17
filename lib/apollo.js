import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const token = "e8f337db32d89ae3f579c009d8bd5f2b5016cc94";

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
