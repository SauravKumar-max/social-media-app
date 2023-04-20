import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getTokenFromLocalStroage } from './index';

const httpLink = createHttpLink({
  uri: "https://social-media-backend-gsl4.onrender.com/graphql",
});


const authLink = setContext((_, { headers }) => {
  const token = getTokenFromLocalStroage()?.token;
  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    }
  }
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
