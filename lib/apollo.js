import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = '2fd1f6ba618951735f2f0d43faadacc61e827ec6';

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
