import { useVisibleSections } from '@hooks/navigation'
import { createSectionStore } from '@libs/store'
import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useState,
} from 'react'

const SectionStoreContext = createContext()

const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? useEffect : useLayoutEffect

export function SectionProvider({ sections, children }) {
	let [sectionStore] = useState(() => createSectionStore(sections))

	useVisibleSections(sectionStore)

	useIsomorphicLayoutEffect(() => {
		sectionStore.setState({ sections })
	}, [sectionStore, sections])

	return (
		<SectionStoreContext.Provider value={sectionStore}>
			{children}
		</SectionStoreContext.Provider>
	)
}
