import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = 'a51b0e5dfd76b1880f13798ceefb4352904fb32e';

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
