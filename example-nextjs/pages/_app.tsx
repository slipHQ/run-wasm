import '../styles/globals.css'
import { load, trackPageview } from 'fathom-client'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    load('PECJVOQV', {
      includedDomains: ['runwasm.com', 'www.runwasm.com'],
    })

    function onRouteChangeComplete() {
      trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
