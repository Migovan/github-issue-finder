import { withData } from "next-apollo";
import { HttpLink } from "apollo-boost";

const token = "5c581ecab528d214887b361df658735b9fd7d69c";

const config = {
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      authorization: `Bearer ${token}`
    }
  })
};

export default withData(config);
