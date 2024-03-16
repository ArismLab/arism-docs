import { Head, Html, Main, NextScript } from 'next/document'

const modeScript = `
  let darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  updateMode()
  darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions)
  window.addEventListener('storage', updateModeWithoutTransitions)

  function updateMode() {
    let isSystemDarkMode = darkModeMediaQuery.matches
    let isDarkMode = window.localStorage.isDarkMode === 'true' || (!('isDarkMode' in window.localStorage) && isSystemDarkMode)

    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    if (isDarkMode === isSystemDarkMode) {
      delete window.localStorage.isDarkMode
    }
  }

  function disableTransitionsTemporarily() {
    document.documentElement.classList.add('[&_*]:!transition-none')
    window.setTimeout(() => {
      document.documentElement.classList.remove('[&_*]:!transition-none')
    }, 0)
  }

  function updateModeWithoutTransitions() {
    disableTransitionsTemporarily()
    updateMode()
  }
`

export default function Document() {
	return (
		<Html lang="en" className="scroll-smooth">
			<Head>
				<script dangerouslySetInnerHTML={{ __html: modeScript }} />
				<link
					rel="icon"
					type="image/png"
					href="/static/favicons/android-chrome-192x192.png"
					sizes="192x192"
				/>
				<link
					rel="icon"
					type="image/png"
					href="/static/favicons/android-chrome-384x384.png"
					sizes="384x384"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/static/favicons/apple-touch-icon.png"
				/>
				<meta
					name="msapplication-config"
					content="/static/favicons/browserconfig.xml"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/static/favicons/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/static/favicons/favicon-32x32.png"
				/>
				<link rel="icon" href="/static/favicons/favicon.ico" />
				<link
					rel="icon"
					type="image/png"
					href="/static/favicons/mstile-150x150.png"
					sizes="150x150"
				/>
				<link
					rel="mask-icon"
					href="/static/favicons/safari-pinned-tab.svg"
					color="#5bbad5"
				/>
				<link rel="manifest" href="/static/favicons/site.webmanifest" />

				<meta name="msapplication-TileColor" content="#603cba" />

				<meta
					name="theme-color"
					media="(prefers-color-scheme: light)"
					content="#fff"
				/>
				<meta
					name="theme-color"
					media="(prefers-color-scheme: dark)"
					content="#000"
				/>
				<link rel="icon" href="/static/logo.png" sizes="any" type="image/png" />
			</Head>
			<body className="bg-white antialiased dark:bg-zinc-900">
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
