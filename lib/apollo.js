import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = 'b03b6d16e93f0ae01cc455b39210f439ee24a708';

const config = {
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
};

export default withData(config);
