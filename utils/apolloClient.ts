import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client'
import { setContext } from '@apollo/link-context'
import { onError } from '@apollo/link-error'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'
import { NextPageContext } from 'next'

export default function createApolloClient(initialState: any, ctx?: NextPageContext) {
  const httpLink = new HttpLink({
    uri: process.env.GRAPHQL_URL,
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
    fetch
  })

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = cookie.get('token')
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors && graphQLErrors.length) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      )
      if (typeof window !== 'undefined') {
        // Add toast notification
      }
    }

    if (networkError) console.log(`[Network error]: ${networkError}`)
  })

  return new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    cache: new InMemoryCache().restore(initialState)
  })
}
