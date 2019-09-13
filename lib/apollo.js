import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const token = "f80e00120aa004b7db1f5ebaf7147dcb29897023";

const config = {
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`
    }
  })
};

export default withData(config);
