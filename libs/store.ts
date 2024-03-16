import { createStore } from 'zustand'

export const createSectionStore = (sections) => {
    return createStore((set) => ({
        sections,
        visibleSections: [],
        setVisibleSections: (visibleSections) =>
            set((state) =>
                state.visibleSections.join() === visibleSections.join()
                    ? {}
                    : { visibleSections }
            ),
        registerHeading: ({ id, ref, offsetRem }) =>
            set((state) => {
                return {
                    sections: state.sections.map((section) => {
                        if (section.id === id) {
                            return {
                                ...section,
                                headingRef: ref,
                                offsetRem,
                            }
                        }
                        return section
                    }),
                }
            }),
    }))
}
