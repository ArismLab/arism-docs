import Head from 'next/head'
import { useRouter } from 'next/router'

import siteMetadata from '@data/siteMetadata.json'

const CommonSEO = ({
	title,
	description,
	ogType,
	ogImage,
}: PageSEOProps & {
	ogType: string
	ogImage: string
}): JSX.Element => {
	const router = useRouter()
	return (
		<Head>
			<title>{title}</title>
			<meta name="robots" content="follow, index" />
			<meta name="description" content={description} />
			<meta
				property="og:url"
				content={`${siteMetadata.siteUrl}${router.asPath}`}
			/>
			<meta property="og:type" content={ogType} />
			<meta property="og:site_name" content={siteMetadata.title} />
			<meta property="og:description" content={description} />
			<meta property="og:title" content={title} />
			<meta property="og:image" content={ogImage} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<link rel="canonical" href={`${siteMetadata.siteUrl}${router.asPath}`} />
		</Head>
	)
}

export const PageSEO = ({ title, description }: PageSEOProps): JSX.Element => {
	if (!title) {
		return <HomeSEO />
	}
	return (
		<CommonSEO
			title={`${title} - ${siteMetadata.title}`}
			description={description}
			ogType="website"
			ogImage={siteMetadata.siteUrl + siteMetadata.siteBanner}
		/>
	)
}

export const HomeSEO = (): JSX.Element => {
	return (
		<CommonSEO
			title={siteMetadata.title}
			description={siteMetadata.description}
			ogType="website"
			ogImage={siteMetadata.siteUrl + siteMetadata.siteBanner}
		/>
	)
}
