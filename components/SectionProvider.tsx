import { useIsomorphicLayoutEffect, useVisibleSections } from '@hooks/navigation'
import { createSectionStore } from '@libs/store'
import {
	createContext,
	useState,
} from 'react'

const SectionStoreContext = createContext<boolean>(false)

const SectionProvider = ({ sections, children }) => {
	let [sectionStore] = useState(() => createSectionStore(sections))

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