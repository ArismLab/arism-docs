import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'

import { Layout } from '@components/Layout'
import * as mdxComponents from '@components/mdx'
import { useMobileNavigationStore } from '@components/MobileNavigation'

import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import ProgressBar from 'react-scroll-progress-bar'

import Analytics from '@components/Analytics'
import '@styles/tailwind.css'
import '@styles/extra.css'
import 'focus-visible'

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

const MyApp = ({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps): JSX.Element => {
	let router = useRouter()

	return (
		<>
			<ProgressBar bgcolor="#5b21b6" />
			<Head>
				{router.pathname === '/' ? (
					<title>Wade&apos;s Docs</title>
				) : (
					<title>{`${pageProps.title} - Wade&apos;s Docs`}</title>
				)}
				<meta name="description" content={pageProps.description} />
				<Analytics />
			</Head>
			<MDXProvider components={mdxComponents}>
				<Layout {...pageProps}>
					<Component {...pageProps} />
				</Layout>
			</MDXProvider>
		</>
	)
}

export default MyApp