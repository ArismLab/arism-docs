import { useState } from 'react'

import {
	SectionStoreContext,
	useIsomorphicLayoutEffect,
	useVisibleSections,
} from '@hooks/navigation'
import { createSectionStore } from '@libs/store'

const SectionProvider = ({ sections, children }) => {
	const [sectionStore] = useState(() => createSectionStore(sections))

	useVisibleSections(sectionStore)

	useIsomorphicLayoutEffect(() => {
		sectionStore.setState({ sections })
	}, [sectionStore, sections])

	return (
		<SectionStoreContext.Provider value={sectionStore as any}>
			{children}
		</SectionStoreContext.Provider>
	)
}

export default SectionProvider
