import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
    link: new HttpLink({
        // uri: 'http://localhost:8080/graphql',
        uri: 'http://10.0.102.231:8080/graphql',
        // uri: 'http://192.168.1.215:8080/graphql',
    }),
    cache: new InMemoryCache(),
});
export default client;