import { Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import CheckIcon from './icons/CheckIcon'
import DiscordIcon from './icons/Discord'
import FeedbackButton from './icons/FeedbackButton'
import GitHubIcon from './icons/GitHubIcon'
import TwitterIcon from './icons/TwitterIcon'
import PageNavigation from './PageNavigation'
import SocialLink from './SocialLink'

const Footer = () => {
	const [submitted, setSubmitted] = useState(false)

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
					<form
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
				</Transition>
				<Transition
					show={submitted}
					as={Fragment}
					enterFrom="opacity-0"
					enterTo="opacity-100"
					enter="delay-150 duration-300"
				>
					<div className="absolute inset-0 flex justify-center md:justify-start">
						<div className="flex items-center gap-3 rounded-full bg-primary-50/50 py-1 pl-1.5 pr-3 text-sm text-primary-900 ring-1 ring-inset ring-primary-500/20 dark:bg-primary-500/5 dark:text-primary-200 dark:ring-primary-500/30">
							<CheckIcon className="h-5 w-5 flex-none fill-primary-500 stroke-white dark:fill-primary-200/20 dark:stroke-primary-200" />
							Thanks for your feedback!
						</div>
					</div>
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
