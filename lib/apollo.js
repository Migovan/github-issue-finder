import { withData } from 'next-apollo';
import { HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = '47b6ef01b43b4bf787d640e3d06cea519b8c89c7';

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
