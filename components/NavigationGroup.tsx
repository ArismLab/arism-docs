import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import { useRef } from 'react'

import NavLink from '@components/NavLink'
import VisibleSectionHighlight from '@components/VisibleSessionHighlight'
import { useIsInsideMobileNavigation, useSectionStore } from '@hooks/navigation'
import { remToPx } from '@libs/remToPx'

function ActivePageMarker({ group, pathname }) {
	const itemHeight = remToPx(2)
	const offset = remToPx(0.25)
	const activePageIndex = group.links.findIndex(
		(link) => link.href === pathname
	)
	const top = offset + activePageIndex * itemHeight

	return (
		<motion.div
			layout
			className="absolute left-2 h-6 w-px bg-emerald-500"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			style={{ top }}
		/>
	)
}

const useInitialValue = (value, condition = true) => {
	const initialValue = useRef(value).current
	return condition ? initialValue : value
}

const NavigationGroup = ({ group, className }) => {
	const isInsideMobileNavigation = useIsInsideMobileNavigation().Context
	const [router, sections] = useInitialValue(
		[useRouter(), useSectionStore((s: any) => s.sections)],
		isInsideMobileNavigation
	)

	const isActiveGroup =
		group.links.findIndex((link) => link.href === router.pathname) !== -1

	return (
		<li className={clsx('relative mt-6', className)}>
			<motion.h2
				layout="position"
				className="text-xs font-semibold text-zinc-900 dark:text-white"
			>
				{group.title}
			</motion.h2>
			<div className="relative mt-3 pl-2">
				<AnimatePresence initial={!isInsideMobileNavigation}>
					{isActiveGroup && (
						<VisibleSectionHighlight group={group} pathname={router.pathname} />
					)}
				</AnimatePresence>
				<motion.div
					layout
					className="absolute inset-y-0 left-2 w-px bg-zinc-900/10 dark:bg-white/5"
				/>
				<AnimatePresence initial={false}>
					{isActiveGroup && (
						<ActivePageMarker group={group} pathname={router.pathname} />
					)}
				</AnimatePresence>
				<ul role="list" className="border-l border-transparent">
					{group.links.map((link) => (
						<motion.li key={link.href} layout="position" className="relative">
							<NavLink href={link.href} active={link.href === router.pathname}>
								{link.title}
							</NavLink>
							<AnimatePresence mode="popLayout" initial={false}>
								{link.href === router.pathname && sections.length > 0 && (
									<motion.ul
										role="list"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { delay: 0.1 },
										}}
										exit={{
											opacity: 0,
											transition: { duration: 0.15 },
										}}
									>
										{sections.map((section) => (
											<li key={section.id}>
												<NavLink
													href={`${link.href}#${section.id}`}
													tag={section.tag}
													isAnchorLink
												>
													{section.title}
												</NavLink>
											</li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</motion.li>
					))}
				</ul>
			</div>
		</li>
	)
}

export default NavigationGroup
