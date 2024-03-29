import { motion, useIsPresent } from 'framer-motion'

import { useIsInsideMobileNavigation } from '@components/Navigator/MobileNavigation'
import { useInitialValue, useSectionStore } from '@hooks/navigation'
import { remToPx } from '@libs/remToPx'

const VisibleSectionHighlight = ({ group, pathname }) => {
	const [sections, visibleSections] = useInitialValue(
		[
			useSectionStore((s) => s.sections),
			useSectionStore((s) => s.visibleSections),
		],
		useIsInsideMobileNavigation()
	)

	const isPresent = useIsPresent()
	const firstVisibleSectionIndex = Math.max(
		0,
		[{ id: '_top' }, ...sections].findIndex(
			(section) => section.id === visibleSections[0]
		)
	)
	const itemHeight = remToPx(2)
	const height = isPresent
		? Math.max(1, visibleSections.length) * itemHeight
		: itemHeight
	const top =
		group.links.findIndex((link) => link.href === pathname) * itemHeight +
		firstVisibleSectionIndex * itemHeight

	return (
		<motion.div
			layout
			initial={{ opacity: 0 }}
			animate={{ opacity: 1, transition: { delay: 0.2 } }}
			exit={{ opacity: 0 }}
			className="absolute inset-x-0 top-0 bg-primary-400/20 will-change-transform dark:bg-primary-400/20"
			style={{ borderRadius: 8, height, top }}
		/>
	)
}

export default VisibleSectionHighlight
