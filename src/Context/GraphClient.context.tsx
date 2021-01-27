import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject, gql, createHttpLink } from '@apollo/client';
import * as React from 'react';
import { Api_Url } from '@/Services/GraphQl.service';
import { setContext } from '@apollo/client/link/context';
import { Storages } from '@/Services/App.service';


const httpLink = createHttpLink({
    uri: Api_Url,
});

const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // let token = '';
    // if (window) {
    //     token = localStorage?.getItem(Storages.Token);
    // }
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            // authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const AppClient = new ApolloClient({
    link: authLink.concat(httpLink),
    ssrMode: true,
    cache: new InMemoryCache()
});



export const GraphClientContext = React.createContext<any>({});

function GraphClientProvider(props: any) {

    return (
        <ApolloProvider client={AppClient}>
            {
                props.children
            }
        </ApolloProvider>
    );

}

export default GraphClientProvider;