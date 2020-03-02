import { NextPage, NextPageContext } from 'next'
import React from 'react'
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import createApolloClient from './apolloClient'

type TApolloClient = ApolloClient<NormalizedCacheObject>

type WithApolloPageContext = {
  apolloClient: TApolloClient
  apolloState?: any
} & NextPageContext

interface ApolloProps {
  apolloClient?: TApolloClient
  apolloState?: any
}

// On the client we store the apollo client in the following variable
// this prevents the client from reinitializing between page transitions.
let globalApolloClient: TApolloClient | null = null

/**
 * Installes the apollo client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerProps
 * @param {NextPageContext | NextAppContext} ctx
 */
const initOnContext = (ctx: WithApolloPageContext) => {
  // Initialize ApolloClient if not already done
  const apolloClient = initApolloClient(ctx.apolloState || {}, ctx)

  // To avoid calling initApollo() twice in the server we send the Apollo Client as a prop
  // to the component, otherwise the component would have to call initApollo() again but this
  // time without the context, once that happens the following code will make sure we send
  // the prop as `null` to the browser
  // @ts-ignore
  apolloClient.toJSON = () => null

  // Add apolloClient to NextPageContext & NextAppContext
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient

  return ctx
}

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export default function withApollo<P>(PageComponent: NextPage<P>): NextPage<P> {
  const WithApollo: NextPage<ApolloProps & P> = ({ apolloClient, apolloState, ...pageProps }) => {
    let client: TApolloClient
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined)
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...(pageProps as P)} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component'
    WithApollo.displayName = `withApollo(${displayName})`
  }

  if (PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: WithApolloPageContext): Promise<ApolloProps & P> => {
      const { apolloClient } = initOnContext(ctx)

      // Run wrapped getInitialProps methods
      let pageProps = {}
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx)
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        const { AppTree } = ctx
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps as P
        }

        // Only if dataFromTree is enabled
        if (AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import('@apollo/react-ssr')

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            const props = { pageProps: { ...pageProps, apolloClient } }

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<AppTree {...props} />)
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error)
          }
        }
      }

      return {
        ...(pageProps as P),
        // Extract query data from the Apollo store
        apolloState: apolloClient.cache.extract(),
        // Provide the client for ssr. As soon as this payload
        // gets JSON.stringified it will remove itself.
        apolloClient: ctx.apolloClient
      }
    }
  }

  return WithApollo
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (initialState: any, ctx?: NextPageContext) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, ctx)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState, ctx)
  }

  return globalApolloClient
}
