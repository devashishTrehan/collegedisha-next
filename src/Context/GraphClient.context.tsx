import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import * as React from 'react';
import { Api_Url } from '@/Services/GraphQl.service';


const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    uri: Api_Url,
    cache: new InMemoryCache(),
});


export const GraphClientContext = React.createContext<any>({});

function GraphClientProvider(props: any) {

    return (
        <ApolloProvider client={client}>
            {
                props.children
            }
        </ApolloProvider>
    );

}

export default GraphClientProvider;