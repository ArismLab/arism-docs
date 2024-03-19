import clsx from 'clsx'
import { motion, useScroll, useTransform } from 'framer-motion'
import { forwardRef } from 'react'

import Link from '@components/Link'
import Logo from '@components/Logo'
import MobileNavigation, {
	useIsInsideMobileNavigation,
} from '@components/MobileNavigation'
import ModeToggle from '@components/ModeToggle'
import MobileSearch from '@components/Search/MobileSearch'
import Search from '@components/Search/Search'
import { externalLinks } from '@data/siteMetadata.json'
import { useMobileNavigationStore } from '@hooks/navigation'

import Button from './Button'

const Header = forwardRef(({ className }: any, ref: any) => {
	const { isOpen: mobileNavIsOpen }: any = useMobileNavigationStore()
	const isInsideMobileNavigation = useIsInsideMobileNavigation()

	const { scrollY } = useScroll()
	const bgOpacityLight = useTransform(scrollY, [0, 72], [0.5, 0.9])
	const bgOpacityDark = useTransform(scrollY, [0, 72], [0.2, 0.8])

	return (
		<motion.div
			ref={ref}
			className={clsx(
				className,
				'fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-12 px-4 transition sm:px-6 lg:left-72 lg:z-30 lg:px-8 xl:left-80 2xl:left-96',
				!isInsideMobileNavigation &&
					'backdrop-blur-sm dark:backdrop-blur lg:left-72 xl:left-80',
				isInsideMobileNavigation
					? 'bg-white dark:bg-zinc-900'
					: 'bg-white/[var(--bg-opacity-light)] dark:bg-zinc-900/[var(--bg-opacity-dark)]'
			)}
			style={
				{
					'--bg-opacity-light': bgOpacityLight,
					'--bg-opacity-dark': bgOpacityDark,
				} as any
			}
		>
			<div
				className={clsx(
					'absolute inset-x-0 top-full h-px transition',
					(isInsideMobileNavigation || !mobileNavIsOpen) &&
						'bg-zinc-900/7.5 dark:bg-white/7.5'
				)}
			/>
			<Search />
			<div className="flex items-center gap-5 lg:hidden">
				<MobileNavigation />
				<Link href="/" aria-label="Home">
					<Logo className="h-6" />
				</Link>
			</div>
			<div className="flex items-center gap-5">
				<nav className="hidden md:block">
					<ul role="list" className="flex items-center gap-8 text-sm">
						{externalLinks.map((link, index) => (
							<Button arrow="right" variant="secondary" key={index} href={link.url}>
								{link.name}
							</Button>
						))}
					</ul>
				</nav>
				<div className="hidden md:block md:h-5 md:w-px md:bg-zinc-900/10 md:dark:bg-white/15" />
				<div className="flex gap-4">
					<MobileSearch />
					<ModeToggle />
				</div>
			</div>
		</motion.div>
	)
})

export default Header
