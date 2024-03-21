import { MDXProvider } from '@mdx-js/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import NProgress from 'nprogress'
import ProgressBar from 'react-scroll-progress-bar'

import Analytics from '@components/Analytics'
import mdxComponents from '@components/MDX'
import PageLayout from '@components/PageLayout'
import '@styles/tailwind.css'
import '@styles/extra.css'
import 'focus-visible'
import { useMobileNavigationStore } from '@hooks/navigation'

// NProgress.configure({ showSpinner: false });

Router.events.on('routeChangeStart', () => {
	NProgress.start()
})

Router.events.on('routeChangeComplete', () => {
	NProgress.done()
})

Router.events.on('routeChangeError', () => {
	NProgress.done()
})

const onRouteChange = () => {
	;(useMobileNavigationStore as any).getState().close()
}

Router.events.on('hashChangeStart', onRouteChange)
Router.events.on('routeChangeComplete', onRouteChange)
Router.events.on('routeChangeError', onRouteChange)

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const router = useRouter()

	return (
		<>
			<ProgressBar bgcolor="#5b21b6" />
			<Head>
				{router.pathname === '/' ? (
					<title>Arism Wallet</title>
				) : (
					<title>{`${pageProps.title} - Arism Wallet`}</title>
				)}
				<meta name="description" content={pageProps.description} />
			</Head>
			<Analytics />
			<div className="bg-global">
				<MDXProvider components={mdxComponents}>
					<PageLayout {...pageProps}>
						<Component {...pageProps} />
					</PageLayout>
				</MDXProvider>
			</div>
		</>
	)
}

export default MyApp
