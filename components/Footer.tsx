import { forwardRef, Fragment, useState } from 'react'
import Link from '@components/Link'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

import Button from '@components/Button'
import { mainNav } from '@data/siteMetadata.json'
import FeedbackButton from './icons/FeedbackButton'
import CheckIcon from './icons/CheckIcon'
import TwitterIcon from './icons/TwitterIcon'
import GitHubIcon from './icons/GitHubIcon'
import DiscordIcon from './icons/Discord'

const FeedbackForm = forwardRef(({ onSubmit }: any, ref: any) => {
	return (
		<form
			ref={ref}
			onSubmit={onSubmit}
			className="absolute inset-0 flex items-center justify-center gap-6 md:justify-start"
		>
			<p className="text-sm text-zinc-600 dark:text-zinc-400">
				Was this page helpful?
			</p>
			<div className="group grid h-8 grid-cols-[1fr,1px,1fr] overflow-hidden rounded-full border border-zinc-900/10 dark:border-white/10">
				<FeedbackButton data-response="yes">Yes</FeedbackButton>
				<div className="bg-zinc-900/10 dark:bg-white/10" />
				<FeedbackButton data-response="no">No</FeedbackButton>
			</div>
		</form>
	)
})

const FeedbackThanks = forwardRef((_props, ref: any) => {
	return (
		<div
			ref={ref}
			className="absolute inset-0 flex justify-center md:justify-start"
		>
			<div className="flex items-center gap-3 rounded-full bg-emerald-50/50 py-1 pl-1.5 pr-3 text-sm text-emerald-900 ring-1 ring-inset ring-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-500/30">
				<CheckIcon className="h-5 w-5 flex-none fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
				Thanks for your feedback!
			</div>
		</div>
	)
})

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
	let router = useRouter()
	let allPages = mainNav.flatMap((group) => group.links)
	let currentPageIndex = allPages.findIndex(
		(page) => page.href === router.pathname
	)

	if (currentPageIndex === -1) {
		return null
	}

	let previousPage = allPages[currentPageIndex - 1]
	let nextPage = allPages[currentPageIndex + 1]

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

const SocialLink = ({ href, icon: Icon, children }) => {
	return (
		<Link href={href} className="group">
			<span className="sr-only">{children}</span>
			<Icon className="h-5 w-5 fill-zinc-700 transition group-hover:fill-zinc-900 dark:group-hover:fill-zinc-500" />
		</Link>
	)
}

const Footer = () => {
	let router = useRouter()
	let [submitted, setSubmitted] = useState(false)

	const onSubmit = (event) => {
		event.preventDefault()

		setSubmitted(true)
	}

	return (
		<footer className="mx-auto max-w-2xl space-y-10 pb-16 lg:max-w-5xl">
			<div className="relative h-8">
				<Transition
					show={!submitted}
					as={Fragment}
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					leave="pointer-events-none duration-300"
				>
					<FeedbackForm onSubmit={onSubmit} />
				</Transition>
				<Transition
					show={submitted}
					as={Fragment}
					enterFrom="opacity-0"
					enterTo="opacity-100"
					enter="delay-150 duration-300"
				>
					<FeedbackThanks />
				</Transition>
			</div>
			<PageNavigation />
			<div className="flex flex-col items-center justify-between gap-5 border-t border-zinc-900/5 pt-8 sm:flex-row dark:border-white/5">
				<p className="text-xs text-zinc-600 dark:text-zinc-400">
					&copy; Copyright {new Date().getFullYear()}. All rights reserved.
				</p>
				<div className="flex gap-4">
					<SocialLink href="#" icon={TwitterIcon}>
						Follow us on Twitter
					</SocialLink>
					<SocialLink href="#" icon={GitHubIcon}>
						Follow us on GitHub
					</SocialLink>
					<SocialLink href="#" icon={DiscordIcon}>
						Join our Discord server
					</SocialLink>
				</div>
			</div>
		</footer>
	)
}

export default Footer
