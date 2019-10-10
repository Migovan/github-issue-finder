import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = '5cf315dc000793223f4a4154dded5be74a1b3a1c';

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
