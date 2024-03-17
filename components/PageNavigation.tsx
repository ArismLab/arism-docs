import { useRouter } from 'next/router'

import { internalLinks } from '@data/siteMetadata.json'

import Button from './Button'
import Link from './Link'

const PageLink = ({ label, page, previous = false }) => {
	return (
		<>
			<Button
				href={page.href}
				aria-label={`${label}: ${page.title}`}
				variant="secondary"
				arrow={previous ? 'left' : 'right'}
			>
				{label}
			</Button>
			<Link
				href={page.href}
				tabIndex={-1}
				aria-hidden="true"
				className="text-base font-semibold text-zinc-900 transition hover:text-zinc-600 dark:text-white dark:hover:text-zinc-300"
			>
				{page.title}
			</Link>
		</>
	)
}

const PageNavigation = () => {
	const router = useRouter()
	const allPages = internalLinks.flatMap((group) => group.links)
	const currentPageIndex = allPages.findIndex(
		(page) => page.href === router.pathname
	)

	if (currentPageIndex === -1) {
		return null
	}

	const previousPage = allPages[currentPageIndex - 1]
	const nextPage = allPages[currentPageIndex + 1]

	if (!previousPage && !nextPage) {
		return null
	}

	return (
		<div className="flex">
			{previousPage && (
				<div className="flex flex-col items-start gap-3">
					<PageLink label="Previous" page={previousPage} previous />
				</div>
			)}
			{nextPage && (
				<div className="ml-auto flex flex-col items-end gap-3">
					<PageLink label="Next" page={nextPage} />
				</div>
			)}
		</div>
	)
}

export default PageNavigation
